import {Component, OnInit} from '@angular/core';
import {Owner} from '../../models/owner.model';
import {OwnerService} from '../../services/owner.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})

export class CardComponent implements OnInit {
  owner!: Owner;

  constructor(private ownerService: OwnerService, private authService: AuthService) {
  }

  ngOnInit(): void {
    if (this.authService.id) {
      console.log("Id we get from JWT : " + this.authService.id);
      // this.ownerService.getCurrentOwner(this.authService.id).subscribe({
      this.ownerService.getCurrentOwner(this.authService.id).subscribe({
        next: (data) => {
          this.owner = data;
          console.log(this.owner);
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
