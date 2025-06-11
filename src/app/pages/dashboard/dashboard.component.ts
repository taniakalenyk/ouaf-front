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
import {AsyncPipe} from '@angular/common';
import {Enrollment} from '../../models/enrollment.model';
import {EnrollmentService} from '../../services/enrollment.service';
import {AuthService} from '../../services/auth.service';

interface Quote {
  quoteText: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    ClassCardComponent,
    ToggleComponent,
    CheckboxComponent,
    DatepickerComponent,
    AsyncPipe,
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

  // Track selected dogs for filtering
  private selectedDogIds = new BehaviorSubject<Set<number>>(new Set<number>());
  // Track all dogs to initialize selected dogs
  private allDogs: Dog[] = [];


  constructor(
    private http: HttpClient,
    private userService: UserService,
    private enrollmentService: EnrollmentService,
    private authService: AuthService
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

  // Check if a dog is currently selected
  isDogSelected(dogId: number): boolean {
    return this.selectedDogIds.value.has(dogId);
  }

  private getMonthName(month: number): string {
    const monthNames = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return monthNames[month - 1];
  }
}
