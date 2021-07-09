import { Inject, Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/User';
import { Const } from "./const";
import { WINDOW } from "./windows.providers";
import { AuthenticationRepository } from "../../@domain/repository/authentication.repository";
import { Router } from '@angular/router';
import { SessionUserService } from './session-user.service';
import { RequestGenerico } from '../model/request-generico';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends AuthenticationRepository {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private zone: NgZone,
    @Inject(WINDOW) private window: Window,
    private router: Router,
    private sessionuser: SessionUserService,
  ) {
    super();
    this.currentUserSubject = new BehaviorSubject<User>(this.sessionuser.getUsuarioActual);
    this.currentUser = this.currentUserSubject.asObservable();
    this.obtainBrowserDetail();
    this.obtainHostName();
  }

  public get getCurrentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(login: string, clave: string): Observable<any> {
    let browserdetailt: {} = this.obtainBrowserDetail();
    let header = new HttpHeaders({
      'X-AppKey': Const.appConfig.X_APPKEY_D4,
      'X-AppCode': Const.appConfig.X_APPCODE_D4,
      'User-Agent-Hostname': sessionStorage.getItem(Const.HOST_NAME),
      'User-Agent-Browser': browserdetailt['name'],
      'User-Agent-BrowserVersion': browserdetailt['version'],
    });
    return this.http.post<any>(Const.appConfig.HOST_AUTENTICACION + Const.API_LOGIN, { login, clave },
      {
        headers: header,
        observe: 'response',
      })
      .pipe(map(response => {
        let usuario = response.body.usuario as User;
        let refreshToken = response.body.refreshToken;
        usuario.token = response.headers.get('Authorization');

        this.sessionuser.setUsuarioActual(usuario);
        this.sessionuser.setTokenJWT(usuario.token);
        this.sessionuser.setRefreshToken(refreshToken);
        this.currentUserSubject.next(usuario);
        return usuario;
      }));
  }

  refreshToken(refreshToken: string): Observable<any> {
    let browserdetailt: {} = this.obtainBrowserDetail();
    let header = new HttpHeaders({
      'X-AppKey': Const.appConfig.X_APPKEY_D4,
      'X-AppCode': Const.appConfig.X_APPCODE_D4,
      'User-Agent-Hostname': sessionStorage.getItem(Const.HOST_NAME),
      'User-Agent-Browser': browserdetailt['name'],
      'User-Agent-BrowserVersion': browserdetailt['version'],
    });
    const user = this.getCurrentUserValue;
    return this.http.post<any>(Const.appConfig.HOST_AUTENTICACION + Const.API_REFRESH_TOKEN, { usuario: { id: user.id }, refreshtoken: refreshToken }, { headers: header, observe: 'response', })
      .pipe(map(response => {
        let usuario = this.getCurrentUserValue;
        const refreshToken = response.body.refreshToken;
        usuario.token = 'Bearer ' + response.body.accessToken;

        this.sessionuser.setUsuarioActual(usuario);
        this.sessionuser.setTokenJWT(usuario.token);
        this.sessionuser.setRefreshToken(refreshToken);
        this.currentUserSubject.next(usuario);
        return usuario;
      }));
  }

  logout(id: number = 0, invalida: boolean = true): void {
    if (invalida) {
      this.invalidarToken(id).subscribe(data => {
        //this.router.navigate(['/auth/'])
      });
      this.currentUserSubject.next(null);
      setTimeout(() => {
        this.sessionuser.clearLocalStorage();
        this.currentUserSubject.next(null);
        location.reload(true);
      });
    } else {
      this.sessionuser.clearLocalStorage();
      this.currentUserSubject.next(null);
      localStorage.clear();
      location.reload(true);
    }
  }

  invalidarToken(id: number) {
    let header = new HttpHeaders({
      'X-AppKey': Const.appConfig.X_APPKEY_D4,
    });

    return this.http.post<any>(Const.appConfig.HOST_AUTENTICACION + Const.API_INVALID_TOKEN.replace('{id}', id.toString()), {}, { headers: header, observe: 'response', });
  }

  forgotPassSendMail(valor: string): Observable<any> {
    let header = new HttpHeaders({
      'X-AppKey': Const.XAPPKEY,
      'X-AppCode': Const.XAPPCODE,
    });
    return this.http.put<any>(Const.appConfig.HOST_AUTENTICACION + Const.API_FOGOT_PASS_SEND_MAIL, { llave: "Email", valor: valor }, { headers: header });
  }


  verificaCodigo(iduser: string, cod: string) {
    let header = new HttpHeaders({
      'X-AppKey': Const.XAPPKEY,
      'X-AppCode': Const.XAPPCODE,
    });
    return this.http.put<any>(Const.getApiVerifica(iduser, cod), {}, { headers: header, observe: 'response' })
      .pipe(map(response => {
        return response.status === 200;
      }));
  }

    reestablecePAss(iduser: string, newPass: string) {
    let header = new HttpHeaders({
      'X-AppKey': Const.XAPPKEY,
      'X-AppCode': Const.XAPPCODE,
    });
    return this.http.put<any>(Const.getReestablece(iduser), { llave: "Clave", valor: newPass }, { headers: header, observe: 'response' })
      .pipe(map(response => {
        return response.status === 204;
      }));
  }

  ChangePAss(request: RequestGenerico[]) {
    let header = new HttpHeaders({
      'X-AppKey': Const.XAPPKEY,
      'X-AppCode': Const.XAPPCODE,
    });
    return this.http.put<any>(Const.getChangePassword(), request, { headers: header, observe: 'response' })
      .pipe(map(response => {
        return response.status === 204;
      }));
  }

  getAuthorizationCode(urlRedireccion: string, idEmpresa?: number): Observable<{ location: string }> {
    let browserdetailt: {} = this.obtainBrowserDetail();
    let headers = new HttpHeaders({
      'X-AppKey': Const.appConfig.X_APPKEY_D4,
      'X-AppCode': Const.appConfig.X_APPCODE_D4,
      'User-Agent-Hostname': sessionStorage.getItem(Const.HOST_NAME),
      'User-Agent-Browser': browserdetailt['name'],
      'User-Agent-BrowserVersion': browserdetailt['version'],
      'UrlRedireccion': urlRedireccion,
    });
    if (idEmpresa)
      headers.append('IdEmpresa', idEmpresa.toString())
    return this.http.post<{ location: string }>(Const.appConfig.HOST_AUTENTICACION + Const.API_AUTHORIZATION_CODE, null, { headers });
  }

  private obtainBrowserDetail(): {} {
    let ua = window.navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return { name: 'IE', version: (tem[1] || '') };
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\bOPR\/(\d+)/);
      if (tem != null) { return { name: 'Opera', version: tem[1] }; }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
    return { name: M[0], version: M[1] };
  }

  private obtainHostName() {
    sessionStorage.setItem(Const.HOST_NAME, 'Mi PC');
  }
}
