import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginrouteGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);

  

  if (sessionStorage.getItem('isLogged')=='true') {
    return true;
  }
  else {
    router.navigate(['/login']);
    return false;
   }
};
