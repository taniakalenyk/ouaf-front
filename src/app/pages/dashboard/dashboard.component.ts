import {Component, OnInit} from '@angular/core';
import {ClassCardComponent} from '../../shared/class-card/class-card.component';
import {ToggleComponent} from '../../shared/toggle/toggle.component';
import {CheckboxComponent} from '../../shared/checkbox/checkbox.component';
import {DatepickerComponent} from '../../shared/datepicker/datepicker.component';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/user.model';
import {UserService} from '../../services/users/user.service';

interface Quote {
  quoteText: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    ClassCardComponent,
    ToggleComponent,
    CheckboxComponent,
    DatepickerComponent
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

  constructor(private http: HttpClient, private userService: UserService) {
    const now = new Date();
    this.day = now.getDate();
    this.month = now.getMonth() + 1;

    this.formattedDay = String(this.day).padStart(2, '0');
    this.formattedMonth = this.getMonthName(this.month);
    this.user$ = this.userService.getCurrentUser();
  }

  ngOnInit(): void {
    this.http.get<Quote>('http://localhost:8080/api/quotes/daily').subscribe({
      next: data => this.quote = data,
      error: err => console.error('Échec de la récupération de la citation :', err)
    });
  }

  private getMonthName(month: number): string {
    const monthNames = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return monthNames[month - 1];
  }
}
