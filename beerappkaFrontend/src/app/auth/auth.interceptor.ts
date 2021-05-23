import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = JSON.parse(localStorage.getItem('auth_token') as string);
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${authToken}`
        }
      });
    }
    return next.handle(request);
  }
}
