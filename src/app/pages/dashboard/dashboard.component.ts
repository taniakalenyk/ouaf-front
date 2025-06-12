import {Component, OnInit} from '@angular/core';
import {ClassCardComponent} from '../../shared/class-card/class-card.component';
import {ToggleComponent} from '../../shared/toggle/toggle.component';
import {CheckboxComponent} from '../../shared/checkbox/checkbox.component';
import {DatepickerComponent} from '../../shared/datepicker/datepicker.component';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, combineLatest, filter, map, Observable, of, OperatorFunction, switchMap} from 'rxjs';
import {User} from '../../models/user.model';
import {UserService} from '../../services/users/user.service';
import {Dog} from '../../models/dog.model';
import {Owner} from '../../models/owner.model';
import {AsyncPipe, CommonModule} from '@angular/common';
import {Enrollment} from '../../models/enrollment.model';
import {EnrollmentService} from '../../services/enrollment.service';
import {AuthService} from '../../services/auth.service';
import {LessonService} from '../../services/lesson.service';
import {Lesson} from '../../models/lesson.model';

interface Quote {
  quoteText: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ClassCardComponent,
    ToggleComponent,
    CheckboxComponent,
    DatepickerComponent,
    AsyncPipe,
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  quote: Quote | undefined;
  day: number;
  month: number;
  formattedDay: string;
  formattedMonth: string;
  user$: Observable<User>;
  dogs$: Observable<Dog[]>;
  enrollments$: Observable<Enrollment[]>;
  enrollmentsToday$: Observable<Enrollment[]>;
  lessons$: Observable<Lesson[]>;
  // Track hide full classes checkbox
  hideFullClasses = new BehaviorSubject<boolean>(false);
  // Track selected dogs for filtering enrollments (left side)
  private selectedDogIds = new BehaviorSubject<Set<number>>(new Set<number>());
  // Track selected dogs for filtering lessons (right side search)
  private searchSelectedDogIds = new BehaviorSubject<Set<number>>(new Set<number>());
  // Track all dogs to initialize selected dogs
  private allDogs: Dog[] = [];


  constructor(
    private http: HttpClient,
    private userService: UserService,
    private enrollmentService: EnrollmentService,
    private authService: AuthService,
    private lessonService: LessonService
  ) {
    const now = new Date();
    this.day = now.getDate();
    this.month = now.getMonth() + 1;

    this.formattedDay = String(this.day).padStart(2, '0');
    this.formattedMonth = this.getMonthName(this.month);

    // Listen for user changes by subscribing to auth service changes
    this.user$ = this.authService.id$.pipe(
      switchMap(id => {
        if (id) {
          return this.userService.getCurrentUser();
        }
        return of(null);
      }),
      filter(user => !!user) as OperatorFunction<User | null, User>
    );

    // Extract dogs from the user object if the user is an owner
    this.dogs$ = this.user$.pipe(
      map(user => {
        if ('dogs' in user) {
          const owner = user as Owner;
          return owner.dogs || [];
        }
        return [];
      })
    );

    // Subscribe to dogs$ to initialize selectedDogIds with all dog IDs
    this.dogs$.subscribe(dogs => {
      this.allDogs = dogs;
      const dogIds = new Set<number>(dogs.map(dog => dog.dogId));
      this.selectedDogIds.next(dogIds);
      // Also initialize searchSelectedDogIds with all dog IDs
      this.searchSelectedDogIds.next(new Set<number>(dogIds));
    });

    // Get future enrollments using the enrollment service and filter by selected dogs
    this.enrollments$ = combineLatest([
      this.enrollmentService.getFutureEnrollments(),
      this.selectedDogIds
    ]).pipe(
      map(([enrollments, selectedDogIds]) => {
        // If no dogs are selected, show no enrollments
        if (selectedDogIds.size === 0) {
          return [];
        }
        return enrollments.filter(enrollment =>
          selectedDogIds.has(enrollment.dog.dogId)
        );
      })
    );

    // Get available lessons and filter by:
    // 1. Selected dogs in the search section (age eligibility)
    // 2. Hide full classes checkbox
    this.lessons$ = combineLatest([
      this.lessonService.getFutureLessons(),
      this.searchSelectedDogIds,
      this.hideFullClasses,
      this.dogs$
    ]).pipe(
      switchMap(([lessons, selectedDogIds, hideFullClasses, dogs]) => {
        // If no dogs are selected, show no lessons
        if (selectedDogIds.size === 0) {
          return of([]);
        }

        // Filter lessons by dog eligibility
        const eligibleLessons = lessons.filter(lesson => {
          // Check if at least one selected dog is eligible for this lesson
          return Array.from(selectedDogIds).some(dogId => {
            const dog = dogs.find(d => d.dogId === dogId);
            if (!dog) return false;
            return this.lessonService.isDogEligibleForLesson(dog.birthDate, lesson);
          });
        });

        // If hideFullClasses is true, filter out full lessons
        if (hideFullClasses) {
          return this.filterOutFullLessons(eligibleLessons);
        }

        return of(eligibleLessons);
      })
    );

    // Get today's enrollments using the enrollment service and filter by user's dogs
    this.enrollmentsToday$ = combineLatest([
      this.enrollmentService.getEnrollmentsForToday(),
      this.dogs$
    ]).pipe(
      map(([enrollments, dogs]) => {
        // Create a set of the user's dog IDs for efficient lookup
        const userDogIds = new Set(dogs.map(dog => dog.dogId));
        // Filter enrollments to only include those for the user's dogs
        return enrollments.filter(enrollment =>
          userDogIds.has(enrollment.dog.dogId)
        );
      })
    );
  }


  ngOnInit(): void {
    this.http.get<Quote>('http://localhost:8080/api/quotes/daily').subscribe({
      next: data => this.quote = data,
      error: err => console.error('Échec de la récupération de la citation :', err)
    });
  }

  // Handle toggle event for a dog
  onDogToggle(dogId: number, isChecked: boolean): void {
    const currentSelectedDogIds = new Set(this.selectedDogIds.value);

    if (isChecked) {
      currentSelectedDogIds.add(dogId);
    } else {
      currentSelectedDogIds.delete(dogId);
    }

    this.selectedDogIds.next(currentSelectedDogIds);
  }

  // Check if a dog is currently selected (for toggles)
  isDogSelected(dogId: number): boolean {
    return this.selectedDogIds.value.has(dogId);
  }

  // Check if a dog is selected in the search section (for checkboxes)
  isSearchDogSelected(dogId: number): boolean {
    return this.searchSelectedDogIds.value.has(dogId);
  }

  // Handle dog selection in the search section
  onSearchDogToggle(dogId: number, isChecked: boolean): void {
    const currentSelectedDogIds = new Set(this.searchSelectedDogIds.value);

    if (isChecked) {
      currentSelectedDogIds.add(dogId);
    } else {
      currentSelectedDogIds.delete(dogId);
    }

    this.searchSelectedDogIds.next(currentSelectedDogIds);
  }

  // Handle hide full classes checkbox
  onHideFullClassesToggle(isChecked: boolean): void {
    this.hideFullClasses.next(isChecked);
  }

  // Filter out full lessons
  private filterOutFullLessons(lessons: Lesson[]): Observable<Lesson[]> {
    if (lessons.length === 0) {
      return of([]);
    }

    // Create an array of observables for each lesson's enrollment count
    const enrollmentCountObservables = lessons.map(lesson =>
      this.enrollmentService.getActiveEnrollmentCountForLesson(lesson.lessonId).pipe(
        map(count => ({lesson, count}))
      )
    );

    // Combine all observables and filter out lessons that are full
    return combineLatest(enrollmentCountObservables).pipe(
      map(lessonCounts =>
        lessonCounts
          .filter(({lesson, count}) => count < lesson.template.capacity)
          .map(({lesson}) => lesson)
      )
    );
  }

  private getMonthName(month: number): string {
    const monthNames = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return monthNames[month - 1];
  }
}
