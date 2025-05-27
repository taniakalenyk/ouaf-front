import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PolaroidComponent} from '../polaroid/polaroid.component';
import {RouterLink} from '@angular/router';
import {OwnerService} from '../../services/owner.service';
import {AuthService} from '../../services/auth.service';
import {Owner} from '../../models/owner.model';
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
export class DogsComponent implements OnInit {

  owner: Owner | null = null;
  dogs: Dog[] = [];
  authService = inject(AuthService);
  ownerService = inject(OwnerService);

  ngOnInit(): void {
    if (this.authService.id) {
      this.ownerService.getCurrentOwner(this.authService.id).subscribe({
        next: (owner) => {
          this.owner = owner;
          this.dogs = owner.dogs ?? [];
        },
        error: (err) => {
          console.error('Failed to load owner', err);
        }
      });
    } else {
      console.error('User ID not available');
    }
  }
}
