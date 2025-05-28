import {Component, Input} from '@angular/core';
import {Owner} from '../../models/owner.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})

export class CardComponent {
  @Input() owner!: Owner;
// export class CardComponent implements OnInit {
  // owner!: Owner;
  //
  // constructor(private ownerService: OwnerService, private authService: AuthService) {
  // }
  //
  // ngOnInit(): void {
  //   if (this.authService.id) {
  //     console.log("Id we get from JWT : " + this.authService.id);
  //     // this.ownerService.getCurrentOwner(this.authService.id).subscribe({
  //     this.ownerService.getCurrentOwner(this.authService.id).subscribe({
  //       next: (data) => {
  //         this.owner = data;
  //         console.log(this.owner);
  //       },
  //       error: (err) => {
  //         console.error('Failed to load owner', err);
  //       }
  //     });
  //   } else {
  //     console.error('User ID not available');
  //   }
  // }
}
