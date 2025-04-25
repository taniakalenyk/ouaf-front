import {Component} from '@angular/core';
import {ClassCardComponent} from '../../shared/class-card/class-card.component';
import {ToggleComponent} from '../../shared/toggle/toggle.component';
import {CheckboxComponent} from '../../shared/checkbox/checkbox.component';
import {Datepicker} from '../../shared/datepicker/datepicker.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    ClassCardComponent,
    ToggleComponent,
    CheckboxComponent,
    Datepicker
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
