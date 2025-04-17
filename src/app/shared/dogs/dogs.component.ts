import {Component} from '@angular/core';
import {PolaroidComponent} from '../polaroid/polaroid.component';

@Component({
  selector: 'app-dogs',
  imports: [
    PolaroidComponent
  ],
  templateUrl: './dogs.component.html',
  styleUrl: './dogs.component.scss'
})
export class DogsComponent {


}
