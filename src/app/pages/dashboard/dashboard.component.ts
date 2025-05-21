import {Component, OnInit} from '@angular/core';
import {ClassCardComponent} from '../../shared/class-card/class-card.component';
import {ToggleComponent} from '../../shared/toggle/toggle.component';
import {CheckboxComponent} from '../../shared/checkbox/checkbox.component';
import {DatepickerComponent} from '../../shared/datepicker/datepicker.component';
import {HttpClient} from '@angular/common/http';

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
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  quote: Quote | undefined;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<Quote>('http://localhost:8080/api/quotes/daily').subscribe({
      next: data => this.quote = data,
      error: err => console.error('Échec de la récupération de la citation :', err)
    });
  }
}
