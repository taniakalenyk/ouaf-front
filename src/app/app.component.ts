import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './shared/header/header.component';
import {HomepageComponent} from './pages/homepage/homepage.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {LogoutComponent} from './pages/logout/logout.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomepageComponent, NotFoundComponent, LogoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'OUAF-Front';
}
