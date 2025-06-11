import {Component, inject, OnInit} from '@angular/core';
import {ButtonComponent} from '../../shared/button/button.component';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-homepage',
  imports: [
    ButtonComponent,
    RouterLink
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.authService.connected$.subscribe(connected => {
      if (connected) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
