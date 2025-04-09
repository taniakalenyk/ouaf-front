import {Component} from '@angular/core';
import {ButtonComponent} from '../../shared/button/button.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [
    ButtonComponent,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent {

  showPassword(field: 'password' | 'password-confirm'): void {
    const input = document.getElementById(field) as HTMLInputElement;
    const showIcon = document.getElementById(`show-${field}`) as HTMLElement;
    const hideIcon = document.getElementById(`hide-${field}`) as HTMLElement;

    if (input && showIcon && hideIcon) {
      input.type = 'text';
      showIcon.style.display = 'none';
      hideIcon.style.display = 'inline';
    }
  }

  hidePassword(field: 'password' | 'password-confirm'): void {
    const input = document.getElementById(field) as HTMLInputElement;
    const showIcon = document.getElementById(`show-${field}`) as HTMLElement;
    const hideIcon = document.getElementById(`hide-${field}`) as HTMLElement;

    if (input && showIcon && hideIcon) {
      input.type = 'password';
      showIcon.style.display = 'inline';
      hideIcon.style.display = 'none';
    }
  }
}
