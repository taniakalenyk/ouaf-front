import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Dog} from '../models/dog.model';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  private http = inject(HttpClient);

  getDog(id: number): Observable<Dog> {
    return this.http.get<Dog>(`http://localhost:8080/api/dogs/${id}`);
  }

  updateDog(dog: Dog): Observable<Dog> {
    return this.http.put<Dog>(`/api/dogs/${dog.dogId}`, dog);
  }

  deleteDog(id: number): Observable<void> {
    return this.http.delete<void>(`/api/dogs/${id}`);
  }
}
