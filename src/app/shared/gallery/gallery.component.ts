import {Component} from '@angular/core';
import {PolaroidComponent} from '../polaroid/polaroid.component';

@Component({
  selector: 'app-gallery',
  imports: [
    PolaroidComponent
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {

}
