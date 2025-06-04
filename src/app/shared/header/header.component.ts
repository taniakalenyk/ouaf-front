import {AsyncPipe, CommonModule} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/users/user.service';
import {User} from '../../models/user.model';
import {Observable, of, switchMap} from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, AsyncPipe],
  templateUrl: 'header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  userService = inject(UserService);
  user$: Observable<User | null> = of(null);

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
  }

}
