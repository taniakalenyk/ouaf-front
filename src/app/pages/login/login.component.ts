import {Component, inject} from '@angular/core';
import {ButtonComponent} from '../../shared/button/button.component';
import {Router, RouterLink} from '@angular/router';
import {CheckboxComponent} from '../../shared/checkbox/checkbox.component';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../services/notification.service';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ButtonComponent,
    RouterLink,
    CheckboxComponent,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  http = inject(HttpClient);
  formBuilder = inject(FormBuilder);
  notification = inject(NotificationService);
  router = inject(Router);
  auth = inject(AuthService)

  loginForm = this.formBuilder.group({
    email: ['owner@ouaf.academy', [Validators.required, Validators.email]],
    password: ['12345', [Validators.required]]
  })

  onSubmit() {
    if (this.loginForm.valid) {
      const login: any = this.loginForm.value;

      console.log('Login with : ', login);

      this.http.post(environment.serverUrl + 'login', this.loginForm.value,
        {responseType: "text"})
        .subscribe({
          next: jwt => {
            this.router.navigateByUrl("/profile");
            this.auth.decodeJwt(jwt)
          },
          error: e => {
            if (e.status === 401) {
              this.notification.show("Mauvais login / mot de passe", "error")
            }
          }
        })
    }
  }

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
