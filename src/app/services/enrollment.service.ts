import {inject, Injectable} from '@angular/core';
import {Observable, map, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Enrollment} from '../models/enrollment.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/enrollments';

  // Get a single enrollment by ID
  getEnrollment(id: number): Observable<Enrollment> {
    return this.http.get<Enrollment>(`${this.apiUrl}/${id}`);
  }

  // Get all enrollments
  getEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.apiUrl);
  }

  // Get enrollments for a specific dog
  getEnrollmentsByDog(dogId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}/dog/${dogId}`);
  }

  // Get today's enrollments
  getEnrollmentsForToday(): Observable<Enrollment[]> {
    return this.getEnrollments().pipe(
      map(enrollments =>
        enrollments.filter(enrollment =>
          this.isToday(enrollment.lesson.startDateTime) &&
          !enrollment.enrollmentCancellationReason
        )
      )
    );
  }

  // Create a new enrollment
  createEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.post<Enrollment>(this.apiUrl, enrollment);
  }

  // Update an existing enrollment
  updateEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.put<Enrollment>(`${this.apiUrl}/${enrollment.enrollmentId}`, enrollment);
  }

  // Delete an enrollment
  deleteEnrollment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get count of active enrollments for a specific lesson
  getActiveEnrollmentCountForLesson(lessonId: number): Observable<number> {
    return this.getEnrollments().pipe(
      map(enrollments =>
        enrollments
          .filter(enrollment =>
            enrollment.lesson.lessonId === lessonId &&
            !enrollment.enrollmentCancellationReason
          )
          .length
      )
    );
  }

  // Get future enrollments
  getFutureEnrollments(): Observable<Enrollment[]> {
    return this.getEnrollments().pipe(
      map(enrollments =>
        enrollments.filter(enrollment =>
          this.isFutureDate(enrollment.lesson.startDateTime) &&
          !enrollment.enrollmentCancellationReason
        )
      )
    );
  }

  // Helper method to check if a date is in the future
  private isFutureDate(dateString: string): boolean {
    const date = new Date(dateString);
    const now = new Date();
    return date > now;
  }

  // Helper method to check if a date is today (ignoring year)
  private isToday(dateString: string): boolean {
    const date = new Date(dateString);
    const today = new Date();

    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth();
  }
}
