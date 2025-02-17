import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }
  public setRoles(roles: []) {
    localStorage.setItem("roles", JSON.stringify(roles));
  }
  public getRoles(): string[] | null {
    return JSON.parse(localStorage.getItem('roles') as string);
  }
  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }
  public setuser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }
}
