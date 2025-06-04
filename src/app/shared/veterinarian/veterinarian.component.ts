import {Component, Input} from '@angular/core';
import {Dog} from '../../models/dog.model';

@Component({
  selector: 'app-veterinarian',
  imports: [],
  templateUrl: './veterinarian.component.html',
  styleUrl: './veterinarian.component.scss'
})
export class VeterinarianComponent {
  @Input() dog!: Dog;

}
