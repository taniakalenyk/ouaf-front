import {Component, inject, OnInit} from '@angular/core';
import {ButtonComponent} from '../../shared/button/button.component';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/users/user.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  http = inject(HttpClient);
  formBuilder = inject(FormBuilder);
  notification = inject(NotificationService);
  router = inject(Router);
  authService = inject(AuthService);
  userService = inject(UserService);

  // Character count tracking
  maxMessageLength = 777;
  currentMessageLength = 0;

  contactForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(this.maxMessageLength)]]
  });

  ngOnInit(): void {
    // Track message length changes
    this.contactForm.get('message')?.valueChanges.subscribe(value => {
      this.currentMessageLength = value ? value.length : 0;
    });

    // Pre-fill form with user data if connected
    this.authService.connected$.subscribe(connected => {
      if (connected) {
        this.userService.getCurrentUser().subscribe({
          next: (user) => {
            this.contactForm.patchValue({
              name: `${user.firstName} ${user.lastName}`,
              email: user.email
            });
          },
          error: (error) => {
            console.error('Error getting user data:', error);
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const contactData: any = this.contactForm.value;

      console.log('Contact form data:', contactData);

      this.http.post(environment.serverUrl + 'contact', contactData)
        .subscribe({
          next: response => {
            this.notification.show("Votre message a été envoyé avec succès", "valid");
            this.contactForm.reset();
          },
          error: error => {
            console.error('Error sending contact form:', error);
            this.notification.show("Une erreur est survenue lors de l'envoi du message", "error");
          }
        });
    } else {
      console.log('Form is not valid');
      this.notification.show("Veuillez remplir tous les champs correctement", "error");
    }
  }
}
