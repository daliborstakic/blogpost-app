import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (authService.currentUserValue) return true;

  if (state.url !== '/login' && state.url !== '/register')
    router.navigate(['/login']);

  return false;
};
