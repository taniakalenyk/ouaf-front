import {AsyncPipe, CommonModule} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/users/user.service';
import {OwnerService} from '../../services/users/owner.service';
import {User} from '../../models/user.model';
import {map, Observable, of, switchMap} from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, AsyncPipe],
  templateUrl: 'header.component.html',
  standalone: true,
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  userService = inject(UserService);
  ownerService = inject(OwnerService);
  user$: Observable<User | null> = of(null);
  hasDogs$: Observable<boolean> = of(false);

  ngOnInit() {
    // Create an Observable that emits the user when authentication state changes
    this.user$ = this.authService.connected$.pipe(
      switchMap(connected => {
        if (connected && this.authService.id) {
          return this.userService.getCurrentUser();
        }
        return of(null);
      })
    );

    // Create an Observable that checks if the owner has dogs
    this.hasDogs$ = this.authService.connected$.pipe(
      switchMap(connected => {
        if (connected && this.authService.id && this.authService.role === 'ROLE_OWNER') {
          return this.ownerService.getCurrentOwner(this.authService.id).pipe(
            map(owner => owner.dogs ? owner.dogs.length > 0 : false)
          );
        }
        return of(false);
      })
    );
  }

}
