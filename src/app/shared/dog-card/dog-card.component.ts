import {Component, inject, Input} from '@angular/core';
import {Dog} from '../../models/dog.model';
import {CommonModule, DatePipe} from '@angular/common';
import {DogService} from '../../services/dog.service';

@Component({
  selector: 'app-dog-card',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe
  ],
  templateUrl: './dog-card.component.html',
  styleUrl: './dog-card.component.scss'
})
export class DogCardComponent {
  @Input() dog!: Dog;

  dogService = inject(DogService);

  get age(): string {
    return this.dogService.getFormattedAge(this.dog);
  }

  get breed(): string {
    return this.dogService.getFormattedBreed(this.dog);
  }
}
