import {Component, inject, OnInit} from '@angular/core';
import {ButtonComponent} from '../../shared/button/button.component';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import {NotificationService} from '../../services/notification.service';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})


export class SignupComponent implements OnInit {

  http = inject(HttpClient);
  formBuilder = inject(FormBuilder);
  notification = inject(NotificationService);
  router = inject(Router);
  auth = inject(AuthService)

  signUpForm = this.formBuilder.group({
    firstName: ['user', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    lastName: ['user', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    email: ['user@ouaf.academy', [Validators.required, Validators.email]],
    password: ['12345', [Validators.required]]
    // photoId: [''],
    // phoneNumber: ['', [Validators.maxLength(13)]],
    // address: ['', [Validators.minLength(2), Validators.maxLength(50)]],
    // about: ['', [Validators.minLength(2), Validators.maxLength(300)]],
    // birthdate: [''],
    // city: ['', [Validators.minLength(2), Validators.maxLength(30)]],
    // postcode: ['', [Validators.minLength(2), Validators.maxLength(10)]]
  });

  ngOnInit(): void {
    this.auth.connected$.subscribe(connected => {
      if (connected) {
        this.router.navigate(['/dashboard']);
      }
    });
  }


  // constructor(private fb: FormBuilder, private http: HttpClient) {
  //   this.ownerForm = this.fb.group({
  //     firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
  //     lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required]],
  //     photoId: [''],
  //     phoneNumber: ['', [Validators.maxLength(13)]],
  //     address: ['', [Validators.minLength(2), Validators.maxLength(50)]],
  //     about: ['', [Validators.minLength(2), Validators.maxLength(300)]],
  //     birthdate: [''],
  //     city: ['', [Validators.minLength(2), Validators.maxLength(30)]],
  //     postcode: ['', [Validators.minLength(2), Validators.maxLength(10)]]
  //   });
  // }

  onSubmit() {
    if (this.signUpForm.valid) {

      const owner: any = this.signUpForm.value;

      console.log('Owner to create:', owner);

      this.http.post<any>(environment.serverUrl + 'signup-owner', owner)
        .subscribe({
          next: create => {
            console.log('Owner created:', create);

            this.router.navigateByUrl("/login");
            this.notification.show("Un lien de confirmation vous a été envoyé", "warning");
          },
          error: error => {
            console.error('Error creating owner:', error);
          }
        });
    } else {
      console.log('Form is not valid');
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
