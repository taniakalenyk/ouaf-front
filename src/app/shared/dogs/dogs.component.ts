import {Component, inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PolaroidComponent} from '../polaroid/polaroid.component';
import {Router, RouterLink} from '@angular/router';
import {Dog} from '../../models/dog.model';

@Component({
  selector: 'app-dogs',
  standalone: true,
  imports: [
    CommonModule,
    PolaroidComponent,
    RouterLink
  ],
  templateUrl: './dogs.component.html',
  styleUrl: './dogs.component.scss'
})

export class DogsComponent {
  @Input() dogs: Dog[] = [];

  router = inject(Router);

  onClicked(dog: Dog) {
    if (dog.dogId) {
      this.router.navigateByUrl(`/dog-profile/${dog.dogId}`);
    }
  }

  ngOnInit() {
    // Sort dogs by dogId
    this.dogs.sort((a, b) => (a.dogId ?? 0) - (b.dogId ?? 0));
  }

// export class DogsComponent implements OnInit {
//
//   owner: Owner | null = null;
//   dogs: Dog[] = [];
//   authService = inject(AuthService);
//   ownerService = inject(OwnerService);
//
//   ngOnInit(): void {
//     if (this.authService.id) {
//       this.ownerService.getCurrentOwner(this.authService.id).subscribe({
//         next: (owner) => {
//           this.owner = owner;
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
