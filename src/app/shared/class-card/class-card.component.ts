import {Component, inject, Input, OnInit} from '@angular/core';
import {Enrollment} from '../../models/enrollment.model';
import {AsyncPipe, CommonModule, DatePipe} from '@angular/common';
import {EnrollmentService} from '../../services/enrollment.service';
import {Observable} from 'rxjs';
import {Lesson} from '../../models/lesson.model';

@Component({
  selector: 'app-class-card',
  standalone: true,
  imports: [DatePipe, AsyncPipe, CommonModule],
  templateUrl: './class-card.component.html',
  styleUrl: './class-card.component.scss'
})
export class ClassCardComponent implements OnInit {
  @Input() enrollment?: Enrollment;
  @Input() lesson?: Lesson;
  activeEnrollmentCount$?: Observable<number>;


  private enrollmentService = inject(EnrollmentService);

  ngOnInit(): void {
    if (this.enrollment) {
      this.activeEnrollmentCount$ = this.enrollmentService.getActiveEnrollmentCountForLesson(
        this.enrollment.lesson.lessonId
      );
    } else if (this.lesson) {
      this.activeEnrollmentCount$ = this.enrollmentService.getActiveEnrollmentCountForLesson(
        this.lesson.lessonId
      );
    }
  }

  // Format date with French month name
  formatDateWithFrenchMonth(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = this.getMonthName(date.getMonth() + 1);
    return `${day} ${month}`.toUpperCase();
  }

  // Check if a date is today
  isToday(dateString: string): boolean {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();

    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }

  // Get French month name
  private getMonthName(month: number): string {
    const monthNames = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return monthNames[month - 1];
  }
}
