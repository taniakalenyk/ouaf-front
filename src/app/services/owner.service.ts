import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Owner} from '../models/owner.model';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient) {
  }

  // getCurrentOwner(): number | null {
  //   const jwt = localStorage.getItem("jwt");
  //   if (jwt) {
  //     this.decodeJwt(jwt);
  //   }
  //   return this.id;
  // }

  getCurrentOwner(id: number): Observable<Owner> {
    return this.http.get<Owner>(`http://localhost:8080/api/owners/${id}`);
  }
}
