import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LocalStorageUtils } from '../utils/localstorage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.localStorageUtils.limparDadosLocaisUsuario();
            this.router.navigate(['/conta/login'], { queryParams: { returnUrl: this.router.url } });
          }

          if (error.status === 403) {
            this.router.navigate(['/acesso-negado']);
          }
        }

        return throwError(error);
      })
    );
  }

}
