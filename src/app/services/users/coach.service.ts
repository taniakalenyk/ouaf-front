import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Coach} from '../../models/coach.model';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  http = inject(HttpClient)

  getCurrentCoach(id: number): Observable<Coach> {
    return this.http.get<Coach>(`http://localhost:8080/api/coaches/${id}`);
  }
}
