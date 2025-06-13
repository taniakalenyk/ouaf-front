import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Dog} from '../models/dog.model';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  private http = inject(HttpClient);

  getDog(id: number): Observable<Dog> {
    return this.http.get<Dog>(`http://localhost:8080/api/dogs/${id}`).pipe(
      map(dog => {
        this.getFormattedAge(dog);
        return dog;
      })
    );
  }

  updateDog(dog: Dog): Observable<Dog> {
    return this.http.put<Dog>(`/api/dogs/${dog.dogId}`, dog);
  }

  deleteDog(id: number): Observable<void> {
    return this.http.delete<void>(`/api/dogs/${id}`);
  }

  // Calculate and format dog's age based on birth date
  getFormattedAge(dog: Dog): string {
    if (!dog.birthDate) return '';

    const birth = new Date(dog.birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

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

  // Format dog's breed information
  getFormattedBreed(dog: Dog): string {
    const primary = dog.primaryBreed?.breedName;
    const secondary = dog.secondaryBreed?.breedName;

    if (!primary) return '';
    if (secondary && secondary !== primary) {
      return `${primary}\n+ ${secondary}`;
    }
    return primary;
  }
}
