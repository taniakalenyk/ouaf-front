import {Component} from '@angular/core';
import {DogCardComponent} from '../../shared/dog-card/dog-card.component';

@Component({
  selector: 'app-dog-profile',
  imports: [
    DogCardComponent
  ],
  templateUrl: './dog-profile.component.html',
  styleUrl: './dog-profile.component.scss'
})
export class DogProfileComponent {

}
