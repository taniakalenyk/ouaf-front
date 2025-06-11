import {Routes} from '@angular/router';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {HomepageComponent} from './pages/homepage/homepage.component';
import {LogoutComponent} from './pages/logout/logout.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {AcademyGalleryComponent} from './pages/academy-gallery/academy-gallery.component';
import {DogProfileComponent} from './pages/dog-profile/dog-profile.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ContactComponent} from './pages/contact/contact.component';
// import {EmailConfirmComponent} from './shared/email-confirm/email-confirm.component';
import {authGuard} from './guards/auth.guard';
import {roleGuard} from './guards/role.guard';
import {dogOwnerGuard} from './guards/dog-owner.guard';

export const routes: Routes = [
  {
    path: 'home',
    component: HomepageComponent,
    data: {background: 'home-image'}
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {background: 'login-image'}
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'dog-profile',
    component: DogProfileComponent,
    canActivate: [authGuard, dogOwnerGuard]
  },
  {
    path: 'dog-profile/:id',
    component: DogProfileComponent,
    canActivate: [authGuard, dogOwnerGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard, roleGuard(['owner', 'coach', 'admin'])]
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {background: 'signup-image'}
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: {background: 'contact-image'}
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: {background: 'logout-image'}
  },

  {
    path: 'academy-gallery',
    component: AcademyGalleryComponent,
    canActivate: [authGuard]
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: {background: 'not-found-image'}
  },
  // {
  //   path: 'email-confirm/:token',
  //   component: EmailConfirmComponent,
  // },
  {
    path: '',
    pathMatch: 'full',
    component: HomepageComponent,
    data: {background: 'home-image'}
  },

  // should be the last one on the list!
  {
    path: '**',
    redirectTo: '/not-found',
  }
];
