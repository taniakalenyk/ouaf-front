import {Component, inject} from '@angular/core';
import {CardComponent} from '../../shared/card/card.component';
import {AsyncPipe, CommonModule} from '@angular/common';
import {DogsComponent} from '../../shared/dogs/dogs.component';
import {GalleryComponent} from '../../shared/gallery/gallery.component';
import {AuthService} from '../../services/auth.service';
import {OwnerService} from '../../services/users/owner.service';
import {Observable} from 'rxjs';
import {Owner} from '../../models/owner.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    DogsComponent,
    GalleryComponent,
    AsyncPipe,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})

export class ProfileComponent {
  authService = inject(AuthService);
  ownerService = inject(OwnerService);

  owner$: Observable<Owner> = this.ownerService.getCurrentOwner(this.authService.id!);

}
