import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.role$.pipe(
      take(1),
      map(role => {
        // First check if the user is connected
        if (!authService.connected) {
          router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }

        // Then check if the user has the required role
        if (role && allowedRoles.includes(role.replace('ROLE_', '').toLowerCase())) {
          return true;
        } else {
          // If not, redirect to home or another appropriate page
          router.navigate(['/home']);
          return false;
        }
      })
    );
  };
};
