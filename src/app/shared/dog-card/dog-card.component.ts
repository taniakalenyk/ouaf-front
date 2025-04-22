import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-dog-card',
  imports: [],
  templateUrl: './dog-card.component.html',
  styleUrl: './dog-card.component.scss'
})
export class DogCardComponent {
  @Input() name: string = 'BAILY';
  @Input() description: string = 'Je n’ai pas de maladies ou allergies. J’aime jouer, courir, manger et embêter mon ami chat';
  @Input() profilePicture: string = '/images/baily.jpg';
  @Input() breed: string = 'Cocker Spaniel';
  @Input() gender: boolean = true; // Female if true
  @Input() birthdate: string = '01 / 01 / 2025';
  @Input() weight: string = '10 kg';
  @Input() sterilized: boolean = false;

  age = 0;

  ngOnInit(): void {
    this.age = this.calculateAge(this.birthdate);
  }

  calculateAge(dateString: string): number {
    const birthDate = new Date(dateString);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

}
