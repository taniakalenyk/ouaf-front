import {Component, inject} from '@angular/core';
import {CardComponent} from '../../shared/card/card.component';
import {AsyncPipe, CommonModule} from '@angular/common';
import {DogsComponent} from '../../shared/dogs/dogs.component';
import {GalleryComponent} from '../../shared/gallery/gallery.component';
import {AuthService} from '../../services/auth.service';
import {OwnerService} from '../../services/owner.service';
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
//
// export class ProfileComponent implements OnInit {
//
//   // owner: Owner | null = null;
//   dogs: Dog[] = [];
//   authService = inject(AuthService);
//   ownerService = inject(OwnerService);
//   owner$ = this.ownerService.getCurrentOwner(this.authService.id!);
//
//   ngOnInit(): void {
//     if (this.authService.id) {
//       this.ownerService.getCurrentOwner(this.authService.id).subscribe({
//         next: (owner) => {
//           this.owner$ = owner;
//           this.dogs = owner.dogs || [];
//           // Sort dogs by dogId ascending
//           this.dogs.sort((a, b) => (a.dogId ?? 0) - (b.dogId ?? 0));
//
//           console.log('Dogs to show on page:', this.dogs);
//           console.log(this.dogs.map(d => d.dogId));
//           console.log('PhotoId of dog:', this.dogs[1]?.photoId);
//         },
//         error: (err) => {
//           console.error('Failed to load owner', err);
//         }
//       });
//     } else {
//       console.error('User ID not available');
//     }
//   }
}
