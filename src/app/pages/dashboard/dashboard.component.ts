import {Component} from '@angular/core';
import {ClassCardComponent} from '../../shared/class-card/class-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    ClassCardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
