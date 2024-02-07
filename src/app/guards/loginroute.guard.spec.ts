import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginrouteGuard } from './loginroute.guard';

describe('loginrouteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginrouteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
