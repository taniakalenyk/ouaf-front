import {Component, inject, OnInit} from '@angular/core';
import {ButtonComponent} from "../../shared/button/button.component";
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [
    ButtonComponent,
    RouterLink
  ],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {

  router = inject(Router)

  ngOnInit(): void {
    // Redirect to login page after 7 seconds
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 7000);
  }
}
