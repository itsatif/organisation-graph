import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getAuthToken();
  const interceptedReq = authToken
    ? req.clone({
        headers: req.headers.set('access_token', `${authToken}`),
      })
    : req;
  return next(interceptedReq);
};
