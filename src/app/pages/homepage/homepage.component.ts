import {Component} from '@angular/core';
import {ButtonComponent} from '../../shared/button/button.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [
    ButtonComponent,
    RouterLink
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {

}
