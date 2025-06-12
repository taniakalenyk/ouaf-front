import {Component, Input} from '@angular/core';
import {Dog} from '../../models/dog.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-veterinarian',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './veterinarian.component.html',
  styleUrl: './veterinarian.component.scss'
})
export class VeterinarianComponent {
  @Input() dog!: Dog;

}
