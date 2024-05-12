import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  expectedURL: string[] = [
    'login'
  ]

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentURL = this.router.url.split('?')[0];

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(this.expectedURL.indexOf(currentURL.slice(1, currentURL.length)) === -1 && (error.status === 401 || error.status === 403)) {
          if(error.error.message === 'JWT expired') {
            this.authService.removeToken();
            this.authService.removeCurrentUsername();
          }
          this.router.navigate(['/login'], {
            queryParams: {message: error.status === 401 ? 'Unauthorized' : 'Please login.'}
          });
        }
        else if(error.status === 404) {
          this.router.navigate(['/404']);
        }

        return throwError(() => error);
      })
    );
  }
}
