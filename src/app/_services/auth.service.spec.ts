/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule],
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => httpTestingController.verify());

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('test Login Method', () => {
    const userForLogin = {
      email: 'email',
      password: 'password',
    };
    authService
      .login(userForLogin)
      .subscribe((response) => expect(response).toBe());
    const req = httpTestingController.expectOne(
      environment.apiUrl + 'users/login'
    );
    expect(req.request.method).toBe('POST');
    req.flush(userForLogin);
  });

  it('test Register Method', () => {
    const userForRegister = {
      username: 'string',
      email: 'string',
      password: 'string'
    };
    authService
      .register(userForRegister)
      .subscribe((response) => expect(response).not.toBeNull);
    const req = httpTestingController.expectOne(
      environment.apiUrl + 'users'
    );
    expect(req.request.method).toBe('POST');
    req.flush(userForRegister);
  });

});
