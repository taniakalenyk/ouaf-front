import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  connecte = false
  role: string | null = null

  constructor() {
    const jwt = localStorage.getItem("jwt")
    if (jwt != null) {
      this.decodeJwt(jwt)
    }
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

    this.role = body.role;

    this.connecte = true;
  }

  logout() {
    localStorage.removeItem("jwt")
    this.connecte = false
    this.role = null
  }

}
