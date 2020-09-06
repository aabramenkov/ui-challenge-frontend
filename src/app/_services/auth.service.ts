import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User | null = null;

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseUrl + 'users/login', model).pipe(
      map((response: any) => {
        const resp = response;
        if (resp) {
          localStorage.setItem('token', resp.user.token);
          localStorage.setItem('user', JSON.stringify(resp.user));
          this.decodedToken = this.jwtHelper.decodeToken(resp.user.token);
          this.currentUser = resp.user;
        }
      })
    );
  }

  register(user: any) {
    return this.http.post(this.baseUrl + 'users', user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }
}
