// import {Component, inject, OnInit} from '@angular/core';
// import {ActivatedRoute, RouterLink} from '@angular/router';
// import {DogCardComponent} from '../../shared/dog-card/dog-card.component';
// import {DogRewardsComponent} from '../../shared/dog-rewards/dog-rewards.component';
// import {VaccinesComponent} from '../../shared/vaccines/vaccines.component';
// import {VeterinarianComponent} from '../../shared/veterinarian/veterinarian.component';
// import {DogSidebarComponent} from '../../shared/dog-sidebar/dog-sidebar.component';
// import {Dog} from '../../models/dog.model';
// import {DogService} from '../../services/dog.service';
// import {OwnerService} from '../../services/owner.service';
// import {CommonModule} from '@angular/common';
// import {AuthService} from '../../services/auth.service';
// import {Owner} from '../../models/owner.model';
//
// @Component({
//   selector: 'app-dog-profile',
//   standalone: true,
//   imports: [
//     CommonModule,
//     DogCardComponent,
//     DogRewardsComponent,
//     VaccinesComponent,
//     VeterinarianComponent,
//     DogSidebarComponent,
//     RouterLink
//   ],
//   templateUrl: './dog-profile.component.html',
//   styleUrl: './dog-profile.component.scss'
// })
// export class DogProfileComponent implements OnInit {
//   dogs: Dog[] = []; // All owner's dogs
//   selectedDog: Dog | null = null;
//
//   private authService = inject(AuthService)
//   private route = inject(ActivatedRoute);
//   private dogService = inject(DogService); // required to edit and delete dogs
//   private ownerService = inject(OwnerService); // required to get all dogs
//
//   ngOnInit(): void {
//     const ownerId = this.authService.id;
//     if (!ownerId) return;
//
//     this.ownerService.getCurrentOwner(ownerId).subscribe((owner: Owner) => {
//       this.dogs = owner.dogs ?? [];
//
//       const paramId = this.route.snapshot.paramMap.get('id');
//       const selectedId = paramId ? +paramId : null;
//
//       if (selectedId) {
//         this.selectedDog = this.dogs.find(d => d.dogId === selectedId) || null;
//       } else if (this.dogs.length > 0) {
//         this.selectedDog = this.dogs[0];
//       } else {
//         this.selectedDog = null;
//       }
//     });
//   }
//
//   onDogSelected(dog: Dog): void {
//     this.selectedDog = dog;
//   }
// }
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {DogCardComponent} from '../../shared/dog-card/dog-card.component';
import {DogRewardsComponent} from '../../shared/dog-rewards/dog-rewards.component';
import {VaccinesComponent} from '../../shared/vaccines/vaccines.component';
import {VeterinarianComponent} from '../../shared/veterinarian/veterinarian.component';
import {DogSidebarComponent} from '../../shared/dog-sidebar/dog-sidebar.component';
import {Dog} from '../../models/dog.model';
import {DogService} from '../../services/dog.service';
import {OwnerService} from '../../services/users/owner.service';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {Owner} from '../../models/owner.model';

@Component({
  selector: 'app-dog-profile',
  standalone: true,
  imports: [
    CommonModule,
    DogCardComponent,
    DogRewardsComponent,
    VaccinesComponent,
    VeterinarianComponent,
    DogSidebarComponent,
    RouterLink
  ],
  templateUrl: './dog-profile.component.html',
  styleUrl: './dog-profile.component.scss'
})
export class DogProfileComponent implements OnInit {
  dogs: Dog[] = []; // Owner's dogs (basic data for sidebar)
  selectedDog: Dog | null = null;

  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private dogService = inject(DogService);
  private ownerService = inject(OwnerService);

  ngOnInit(): void {
    const ownerId = this.authService.id;
    if (!ownerId) return;

    this.ownerService.getCurrentOwner(ownerId).subscribe((owner: Owner) => {
      this.dogs = owner.dogs ?? [];

      const paramId = this.route.snapshot.paramMap.get('id');
      const selectedId = paramId ? +paramId : (this.dogs[0]?.dogId ?? null);

      if (selectedId) {
        this.loadDogDetails(selectedId);
      }
    });
  }

  onDogSelected(dog: Dog): void {
    if (dog?.dogId) {
      this.loadDogDetails(dog.dogId);
    }
  }

  private loadDogDetails(dogId: number): void {
    this.dogService.getDog(dogId).subscribe({
      next: (fullDog: Dog) => {
        this.selectedDog = fullDog;
      },
      error: (err) => {
        console.error('Failed to load dog details', err);
      }
    });
  }
}
