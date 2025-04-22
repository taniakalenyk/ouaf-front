import {Routes} from '@angular/router';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {HomepageComponent} from './pages/homepage/homepage.component';
import {LogoutComponent} from './pages/logout/logout.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {AcademyGalleryComponent} from './pages/academy-gallery/academy-gallery.component';
import {DogProfileComponent} from './pages/dog-profile/dog-profile.component';

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
    component: ProfileComponent
  },
  {
    path: 'dog-profile',
    component: DogProfileComponent
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {background: 'signup-image'}
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: {background: 'logout-image'}
  },

  {
    path: 'academy-gallery',
    component: AcademyGalleryComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: {background: 'not-found-image'}
  },
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
