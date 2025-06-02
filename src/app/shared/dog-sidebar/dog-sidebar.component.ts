import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Dog} from '../../models/dog.model';

@Component({
  selector: 'app-dog-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './dog-sidebar.component.html',
  styleUrl: './dog-sidebar.component.scss'
})
export class DogSidebarComponent {
  @Input() dogs: Dog[] = [];
  @Input() selectedDog: Dog | null = null;
  @Output() dogSelected = new EventEmitter<Dog>();

  selectDog(dog: Dog) {
    this.dogSelected.emit(dog);
  }

  // onDogClick(dog: Dog) {
  //   this.dogSelected.emit(dog);
  // }
}
