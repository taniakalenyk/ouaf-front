import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private connectedSubject = new BehaviorSubject<boolean>(false);
  connected$ = this.connectedSubject.asObservable();
  private roleSubject = new BehaviorSubject<string | null>(null);
  role$ = this.roleSubject.asObservable();
  private idSubject = new BehaviorSubject<number | null>(null);
  id$ = this.idSubject.asObservable();


  constructor(private router: Router) {
    const jwt = localStorage.getItem("jwt")
    if (jwt != null) {
      this.decodeJwt(jwt)
    }
  }

  // Getter properties for backward compatibility
  get connected(): boolean {
    return this.connectedSubject.value;
  }

  get role(): string | null {
    return this.roleSubject.value;
  }

  get id(): number | null {
    return this.idSubject.value;
  }

  decodeJwt(jwt: string) {
    localStorage.setItem("jwt", jwt)

    // we split the jwt into 3 parts separated by a dot
    const splitJwt = jwt.split(".");

    // we retrieve the "body" part of the jwt
    const jwtBody = splitJwt[1]

    // we decode the base64
    const jsonBody = atob(jwtBody)

    // we convert the json into a js object
    const body = JSON.parse(jsonBody)

    this.roleSubject.next(body.role);
    this.idSubject.next(body.id);
    this.connectedSubject.next(true);
  }

  logout() {
    localStorage.removeItem("jwt");
    this.connectedSubject.next(false);
    this.roleSubject.next(null);
    this.idSubject.next(null);
    this.router.navigate(['/logout']);
  }

}
