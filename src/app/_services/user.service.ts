import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'user');
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.baseUrl + 'user', user);
  }
  deleteUser(email: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'users/' + email);
  }
}
