import {Component, Input} from '@angular/core';
import {Dog} from '../../models/dog.model';

@Component({
  selector: 'app-dog-rewards',
  imports: [],
  templateUrl: './dog-rewards.component.html',
  styleUrl: './dog-rewards.component.scss'
})
export class DogRewardsComponent {
  @Input() dog!: Dog;

}
