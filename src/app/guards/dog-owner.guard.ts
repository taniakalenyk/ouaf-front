import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {OwnerService} from '../services/users/owner.service';
import {map, switchMap, take} from 'rxjs/operators';
import {of} from 'rxjs';

export const dogOwnerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const ownerService = inject(OwnerService);
  const router = inject(Router);

  // First check if the user is connected
  if (!authService.connected) {
    router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

  return authService.role$.pipe(
    take(1),
    switchMap(role => {
      // If user is a coach or admin, allow access
      if (role && ['coach', 'admin'].includes(role.replace('ROLE_', '').toLowerCase())) {
        return of(true);
      }

      const userId = authService.id;
      if (!userId) {
        router.navigate(['/not-found']);
        return of(false);
      }

      // Get the owner's dogs
      return ownerService.getCurrentOwner(userId).pipe(
        map(owner => {
          // Check if the owner has any dogs
          if (!owner.dogs || owner.dogs.length === 0) {
            router.navigate(['/not-found']);
            return false;
          }

          // If no dog ID is provided, allow access since owner has dogs
          const dogId = route.paramMap.get('id');
          if (!dogId) {
            return true;
          }

          // Check if the requested dog belongs to the owner
          const dogExists = owner.dogs.some(dog => dog.dogId === +dogId);
          if (dogExists) {
            return true;
          } else {
            router.navigate(['/not-found']);
            return false;
          }
        })
      );
    })
  );
};
