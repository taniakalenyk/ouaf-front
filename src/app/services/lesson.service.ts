import {inject, Injectable} from '@angular/core';
import {Observable, map, switchMap, of, combineLatest} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Lesson} from '../models/lesson.model';
import {EnrollmentService} from './enrollment.service';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private http = inject(HttpClient);
  private enrollmentService = inject(EnrollmentService);
  private apiUrl = 'http://localhost:8080/api/lessons';

  // Get a single lesson by ID
  getLesson(id: number): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.apiUrl}/${id}`);
  }

  // Get all lessons
  getLessons(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(this.apiUrl);
  }

  // Get future lessons
  getFutureLessons(): Observable<Lesson[]> {
    return this.getLessons().pipe(
      map(lessons =>
        lessons.filter(lesson =>
          this.isFutureDate(lesson.startDateTime) &&
          !lesson.lessonCancellationReason
        )
      )
    );
  }

  // Get available lessons (not full)
  getAvailableLessons(): Observable<Lesson[]> {
    return this.getFutureLessons().pipe(
      switchMap(lessons => {
        if (lessons.length === 0) {
          return of([]);
        }

        // Create an array of observables for each lesson's enrollment count
        const enrollmentCountObservables = lessons.map(lesson =>
          this.enrollmentService.getActiveEnrollmentCountForLesson(lesson.lessonId).pipe(
            map(count => ({ lesson, count }))
          )
        );

        // Combine all observables and filter out lessons that are full
        return combineLatest(enrollmentCountObservables).pipe(
          map(lessonCounts =>
            lessonCounts
              .filter(({ lesson, count }) => count < lesson.template.capacity)
              .map(({ lesson }) => lesson)
          )
        );
      })
    );
  }

  // Helper method to check if a date is in the future
  private isFutureDate(dateString: string): boolean {
    const date = new Date(dateString);
    const now = new Date();
    return date > now;
  }

  // Helper method to calculate dog age in months at the time of the lesson
  calculateDogAgeAtLessonStart(dogBirthDate: string, lessonStartDate: string): number {
    const birthDate = new Date(dogBirthDate);
    const lessonDate = new Date(lessonStartDate);

    // Calculate difference in months
    const months = (lessonDate.getFullYear() - birthDate.getFullYear()) * 12 +
                   (lessonDate.getMonth() - birthDate.getMonth());

    return months;
  }

  // Check if a dog is eligible for a lesson based on age
  isDogEligibleForLesson(dogBirthDate: string, lesson: Lesson): boolean {
    // If no age restrictions, dog is eligible
    if (!lesson.template.minAge && !lesson.template.maxAge) {
      return true;
    }

    const dogAgeMonths = this.calculateDogAgeAtLessonStart(dogBirthDate, lesson.startDateTime);

    // Check minimum age if specified
    if (lesson.template.minAge && dogAgeMonths < lesson.template.minAge) {
      return false;
    }

    // Check maximum age if specified
    if (lesson.template.maxAge && dogAgeMonths > lesson.template.maxAge) {
      return false;
    }

    return true;
  }
}
