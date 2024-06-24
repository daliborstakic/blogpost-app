// logging.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

export const loggingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const started = Date.now();

  return next(req).pipe(
    finalize(() => {
      const elapsed = Date.now() - started;
      console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
      console.log('Request:', req);
    })
  );
};
