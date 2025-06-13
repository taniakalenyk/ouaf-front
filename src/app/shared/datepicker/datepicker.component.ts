import {ChangeDetectionStrategy, Component, inject, model, OnInit} from '@angular/core';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCardModule} from "@angular/material/card";
import {DateAdapter, MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';


/** @title Datepicker inline calendar */
@Component({
  selector: 'app-datepicker',
  templateUrl: 'datepicker.component.html',
  styleUrl: 'datepicker.component.scss',
  providers: [
    provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'fr'}, // sets Angular Material locale to French
  ],
  imports: [MatCardModule, MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DatepickerComponent implements OnInit {
  selected = model<Date | null>(null);
  private dateAdapter = inject<DateAdapter<Date>>(DateAdapter);

  ngOnInit(): void {
    // Register French locale
    registerLocaleData(localeFr);

    // Set the locale for the adapter
    this.dateAdapter.setLocale('fr');

    // Set Monday as the first day of the week
    this.dateAdapter.getFirstDayOfWeek = () => 1;
  }
}
