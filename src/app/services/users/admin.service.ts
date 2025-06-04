import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Admin} from '../../models/admin.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  http = inject(HttpClient)

  getCurrentAdmin(id: number): Observable<Admin> {
    return this.http.get<Admin>(`http://localhost:8080/api/admins/${id}`);
  }
}
