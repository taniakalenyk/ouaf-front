import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Owner} from '../../models/owner.model';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  http = inject(HttpClient)

  getCurrentOwner(id: number): Observable<Owner> {
    return this.http.get<Owner>(`http://localhost:8080/api/owners/${id}`);
  }
}
