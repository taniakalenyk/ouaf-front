import {Component} from '@angular/core';
import {DogCardComponent} from '../../shared/dog-card/dog-card.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-dog-profile',
  imports: [
    DogCardComponent,
    RouterLink
  ],
  templateUrl: './dog-profile.component.html',
  styleUrl: './dog-profile.component.scss'
})
export class DogProfileComponent {

}
