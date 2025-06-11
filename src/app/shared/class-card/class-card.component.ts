import {Component, Input, OnInit} from '@angular/core';
import {Enrollment} from '../../models/enrollment.model';
import {AsyncPipe, DatePipe} from '@angular/common';
import {EnrollmentService} from '../../services/enrollment.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-class-card',
  imports: [DatePipe, AsyncPipe],
  templateUrl: './class-card.component.html',
  styleUrl: './class-card.component.scss'
})
export class ClassCardComponent implements OnInit {
  @Input() enrollment?: Enrollment;
  activeEnrollmentCount$?: Observable<number>;

  constructor(private enrollmentService: EnrollmentService) {
  }

  ngOnInit(): void {
    if (this.enrollment) {
      this.activeEnrollmentCount$ = this.enrollmentService.getActiveEnrollmentCountForLesson(
        this.enrollment.lesson.lessonId
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
      date.getMonth() === today.getMonth();
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
