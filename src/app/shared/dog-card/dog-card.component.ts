import {Component, Input} from '@angular/core';
import {Dog} from '../../models/dog.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-dog-card',
  imports: [
    DatePipe
  ],
  templateUrl: './dog-card.component.html',
  styleUrl: './dog-card.component.scss'
})
export class DogCardComponent {
  @Input() dog!: Dog;

  get profilePicture(): string | null {
    return this.dog?.photoId ? `/images/gallery/${this.dog.photoId}` : null;
  }

  get age(): string {
    if (!this.dog.birthDate) return '';

    const birth = new Date(this.dog.birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    // Adjust months and years if necessary
    if (days < 0) {
      months -= 1;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    if (years > 0) {
      return `${years} an${years > 1 ? 's' : ''}${months > 0 ? ` et ${months} mois` : ''}`;
    } else if (months > 0) {
      return `${months} mois`;
    } else {
      return `${days} jour${days > 1 ? 's' : ''}`;
    }
  }

  get breed(): string {
    const primary = this.dog.primaryBreed?.breedName;
    const secondary = this.dog.secondaryBreed?.breedName;

    if (!primary) return '';
    if (secondary && secondary !== primary) {
      return `${primary}\n+ ${secondary}`;
    }
    return primary;
  }
}


// calculateAge(dateString: string): number {
//   const birthDate = new Date(dateString);
//   const today = new Date();
//
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const m = today.getMonth() - birthDate.getMonth();
//
//   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }
//
//   return age;
// }
