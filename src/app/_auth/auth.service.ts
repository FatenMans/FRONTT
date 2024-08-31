import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getParticipantById(): null | undefined {
      throw new Error('Method not implemented.');
  }
  private jwtHelper = new JwtHelperService();

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isUserRole(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken && decodedToken.role === 'USER';
  }

  getUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;

    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken ? decodedToken.id : null;
  }
 
}
