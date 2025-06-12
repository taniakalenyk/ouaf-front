import {Component, Input} from '@angular/core';
import {Dog} from '../../models/dog.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-dog-rewards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dog-rewards.component.html',
  styleUrl: './dog-rewards.component.scss'
})
export class DogRewardsComponent {
  @Input() dog!: Dog;

}
