import {Component} from '@angular/core';
import {CardComponent} from '../../shared/card/card.component';
import {DogsComponent} from '../../shared/dogs/dogs.component';
import {GalleryComponent} from '../../shared/gallery/gallery.component';

@Component({
  selector: 'app-profile',
  imports: [
    CardComponent,
    DogsComponent,
    GalleryComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}
