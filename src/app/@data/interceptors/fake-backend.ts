import {Injectable} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';

// const appsFuture: App[] = [
//     { id: 1, title: 'Recaudación', des: 'Descripción corta para esta aplicación.', views: 150, star: false, img: 'assets/apps/recaudacion.svg'},
//     { id: 2, title: 'Facturación', des: 'Descripción corta para esta aplicación.', views: 150, star: false, img: 'assets/apps/facturacion.svg'},
//   ];
// const appsStarts: App[] = [
//     { id: 1, title: 'Recaudación', des: 'Descripción corta para esta aplicación.', views: 150, star: true, img: 'assets/apps/recaudacion.svg'},
//   ];
// const appsMoreToUse: App[] = [
//     { id: 1, title: 'Recaudación', des: 'Descripción corta para esta aplicación.', views: 150, star: false, img: 'assets/apps/recaudacion.svg'},
//     { id: 2, title: 'Facturación', des: 'Descripción corta para esta aplicación.', views: 150, star: false, img: 'assets/apps/facturacion.svg'},
//     { id: 3, title: 'Interrupción', des: 'Descripción corta para esta aplicación.', views: 150, star: false, img: 'assets/apps/interrupcion.svg'},
//     { id: 4, title: 'Impresiones', des: 'Descripción corta para esta aplicación.', views: 150, star: false, img: 'assets/apps/impresiones.svg'},
//   ];
// const appsAll: App[] = [
//     { id: 1, title: 'Recaudación', des: 'Descripción corta para esta aplicación.', views: 150, star: false, img: 'assets/apps/recaudacion.svg'},
//     { id: 2, title: 'Facturación', des: 'Descripción corta para esta aplicación.', views: 150, star: false, img: 'assets/apps/facturacion.svg'},
//     { id: 3, title: 'Interrupción', des: 'Descripción corta para esta aplicación.', views: 150, star: false, img: 'assets/apps/interrupcion.svg'},
//     { id: 4, title: 'Impresiones', des: 'Descripción corta para esta aplicación.', views: 150, star: false, img: 'assets/apps/impresiones.svg'},
//     { id: 5, title: 'Recaudación', des: 'Descripción corta para esta aplicación.', views: 150, star: false, img: 'assets/apps/recaudacion.svg'},
//     { id: 6, title: 'Facturación', des: 'Descripción corta para esta aplicación.', views: 150, star: false, img: 'assets/apps/facturacion.svg'},
//     { id: 7, title: 'Recaudación', des: 'Descripción corta para esta aplicación.', views: 150, star: false, img: 'assets/apps/recaudacion.svg'},
//     { id: 8, title: 'Facturación', des: 'Descripción corta para esta aplicación.', views: 150, star: false, img: 'assets/apps/facturacion.svg'},
//     { id: 9, title: 'Interrupción', des: 'Descripción corta para esta aplicación.', views: 150, star: false, img: 'assets/apps/interrupcion.svg'},
//     { id: 10, title: 'Impresiones', des: 'Descripción corta para esta aplicación.', views: 150, star: false, img: 'assets/apps/impresiones.svg'},
//     { id: 11, title: 'Recaudación', des: 'Descripción corta para esta aplicación.', views: 150, star: false, img: 'assets/apps/recaudacion.svg'},
//     { id: 12, title: 'Facturación', des: 'Descripción corta para esta aplicación.', views: 150, star: false, img: 'assets/apps/facturacion.svg'},
//   ];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        // case url.endsWith('/apps/moretouse') && method === 'GET':
        //   return getAppsMoreToUse();
        // case url.endsWith('/apps/all') && method === 'GET':
        //   return getAppsAll();
        // case url.endsWith('/apps/future') && method === 'GET':
        //   return getAppsFuture();
        // case url.endsWith('/apps/pref') && method === 'GET':
        //   return getAppsStars();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    // function getAppsMoreToUse() {
    //   // if (!isLoggedIn()) return unauthorized();
    //   return ok(appsMoreToUse);
    // }
    //
    // function getAppsAll() {
    //   // if (!isLoggedIn()) return unauthorized();
    //   return ok(appsAll);
    // }
    //
    // function getAppsStars() {
    //   // if (!isLoggedIn()) return unauthorized();
    //   return ok(appsStarts);
    // }
    //
    // function getAppsFuture() {
    //   // if (!isLoggedIn()) return unauthorized();
    //   return ok(appsFuture);
    // }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === `Basic ${window.btoa('test:test')}`;
    }
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
