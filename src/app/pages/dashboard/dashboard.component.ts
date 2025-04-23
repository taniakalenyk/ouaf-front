import {Component} from '@angular/core';
import {ClassCardComponent} from '../../shared/class-card/class-card.component';
import {ToggleComponent} from '../../shared/toggle/toggle.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    ClassCardComponent,
    ToggleComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
