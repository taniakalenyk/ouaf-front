import {Component, inject, OnInit} from '@angular/core';
import {ButtonComponent} from '../../shared/button/button.component';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent implements OnInit {
  authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    // Wait for 7 seconds then redirect to login
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 7000); // 7 seconds
  }
}
