import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthenticationRepository } from "../../@domain/repository/authentication.repository";
import { SessionUserService } from '../services/session-user.service';
import { RespuestaError } from '../../@data/model/respuesta-error';
import Swal from 'sweetalert2';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authenticationService: AuthenticationRepository,
    private sessionusuer: SessionUserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(

      catchError(err => {
        if (err.status === 302) return throwError(err);
        if (err.status === 401) {
          let codigoErrorback = err.error.error ? err.error.error.codigo : '';
          if (codigoErrorback == "5016") {
            return this.handle401Error(request, next);
          } else {
            Swal.fire({
              title: "SESIÓN EXPIRADA",
              text: "La sesión ha expirado vuelva a iniciar sesión",
              icon: "warning",
              onAfterClose: () => {
                this.authenticationService.logout(0, false);
              },
            });
          }
        }

        if (err.statusText === "Unknown Error") {
          const error = {
            mensaje: "",
          };
          error.mensaje = "El servidor no se encuentra disponible";
          return throwError(error);
        } else {
          let error: RespuestaError;
          error = err.error.error ? err.error.error : { message: err.message || err.error.message || err.statusText };
          error.message = error.mensaje;
          if (err.status > 500) {
            error.message = 'Ocurrió un error en el Servidor';
          }
          if (err.status === 503) {
            error.message = 'El servicio solicitado no está disponible';
          }
          return throwError(error);
        }
      }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authenticationService.refreshToken(this.sessionusuer.getRefreshToken).pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.token);
          return next.handle(this.addToken(request, token.token));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }


}
