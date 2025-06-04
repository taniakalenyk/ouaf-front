import {Injectable} from '@angular/core';
import {AuthService} from '../auth.service';
import {OwnerService} from './owner.service';
import {Observable, throwError} from 'rxjs';
import {CoachService} from './coach.service';
import {AdminService} from './admin.service';
import {User} from '../../models/user.model';


@Injectable({providedIn: 'root'})
export class UserService {
  constructor(
    private authService: AuthService,
    private ownerService: OwnerService,
    private coachService: CoachService,
    private adminService: AdminService,
  ) {
  }

  getCurrentUser(): Observable<User> {
    const role = this.authService.role?.replace('ROLE_', '').toLowerCase();
    const id = this.authService.id;

    if (!role || !id) return throwError(() => new Error('No valid session'));

    switch (role) {
      case 'owner':
        return this.ownerService.getCurrentOwner(id);
      case 'coach':
        return this.coachService.getCurrentCoach(id);
      case 'admin':
        console.log("Admin is connected");
        return this.adminService.getCurrentAdmin(id);
      default:
        return throwError(() => new Error('Unknown role'));
    }
  }
}
