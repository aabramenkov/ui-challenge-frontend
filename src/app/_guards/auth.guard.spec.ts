import { TestBed, getTestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../_services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, ActivatedRouteSnapshot, Data } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

class MockActivatedRouteSnapshot {
  data: Data|undefined;
}

class MockRouter {
  navigate(path: string) {}
}

describe('AuthGuard', () => {
  let injector: TestBed;
  let authService: AuthService;
  let alertify: AlertifyService;
  let guard: AuthGuard;
  let router: Router;
  let activatedRouteSnapshot: ActivatedRouteSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useClass: MockRouter },
        {
          provide: ActivatedRouteSnapshot,
          useClass: MockActivatedRouteSnapshot,
        },
      ],
      imports: [HttpClientTestingModule],
    });
    injector = getTestBed();
    authService = injector.inject(AuthService);
    alertify = injector.inject(AlertifyService);
    router = injector.inject(Router);
    activatedRouteSnapshot = injector.inject(ActivatedRouteSnapshot);
    guard = injector.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if user logged in', () => {
    activatedRouteSnapshot.data = {};
    const loggedIn = spyOn(authService, 'loggedIn');
    loggedIn.and.returnValue(true);
    expect(guard.canActivate()).toEqual(true);
  });

  it('should redirect to home if user not logged in', () => {
    activatedRouteSnapshot.data = {};
    const loggedIn = spyOn(authService, 'loggedIn');
    loggedIn.and.returnValue(false);
    spyOn(alertify, 'error');
    spyOn(router, 'navigate');
    expect(guard.canActivate()).toEqual(false);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
});
