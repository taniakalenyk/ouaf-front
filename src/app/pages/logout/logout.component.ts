import {Component} from '@angular/core';
import {ButtonComponent} from "../../shared/button/button.component";
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [
    ButtonComponent,
    RouterLink
  ],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {

}
