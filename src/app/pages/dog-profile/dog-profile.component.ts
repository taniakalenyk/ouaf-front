import {Component} from '@angular/core';
import {DogCardComponent} from '../../shared/dog-card/dog-card.component';
import {RouterLink} from '@angular/router';
import {DogRewardsComponent} from '../../shared/dog-rewards/dog-rewards.component';
import {VaccinesComponent} from '../../shared/vaccines/vaccines.component';
import {VeterinarianComponent} from '../../shared/veterinarian/veterinarian.component';
import {DogSidebarComponent} from '../../shared/dog-sidebar/dog-sidebar.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dog-profile',
  imports: [
    DogCardComponent,
    RouterLink,
    DogRewardsComponent,
    VaccinesComponent,
    VeterinarianComponent,
    DogSidebarComponent
  ],
  templateUrl: './dog-profile.component.html',
  styleUrl: './dog-profile.component.scss'
})
export class DogProfileComponent {
  dog: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    const dogId = 1;
    this.http.get(`http://localhost:8080/api/dogs/${dogId}`).subscribe({
      next: data => this.dog = data,
      error: err => console.error('Échec de la récupération des données du chien :', err)
    });
  }
}
