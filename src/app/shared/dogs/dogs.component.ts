import {Component} from '@angular/core';
import {PolaroidComponent} from '../polaroid/polaroid.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-dogs',
  imports: [
    PolaroidComponent,
    RouterLink
  ],
  templateUrl: './dogs.component.html',
  styleUrl: './dogs.component.scss'
})
export class DogsComponent {


}
