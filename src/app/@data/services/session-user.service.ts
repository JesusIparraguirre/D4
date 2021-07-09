import { Injectable } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { Subject } from 'rxjs';
import { AccesoAmbito } from '../model/acceso-ambito-usuario';
import { ResponseServiceDatos } from '../model/Datos';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class SessionUserService {

  private AMBITOS_USUARIO = 'A83EBCB2-2926-4C5B-8C98-9CE7BF7E5506';
  private USUARIO_ACTUAL = '5BC8082D-447C-40EF-BBB7-93292500682C';
  private DATOS_PERSONALES = '5BC8082D-447C-40EF-BBB7-93294562682C';
  private TOKEN = '636A265C-DA68-43DD-8D12-9640BE0DC107';
  private REFRESH_TOKEN = 'D22B2C9B-044E-4E71-B232-BF86B6FC69D5';
  private OPCIONES_MENU = '80C8A608-EC87-4765-80E9-8F79AF9C615E';
  private MENSAJE_ERROR_GENERICO = '479D438A-4825-4466-9A79-B49AEE8ED3F6';
  private RESTRICCION_CONFIGURACION = '8cd8b3ac-7717-4599-8b53-ea493f2e9b0b';

  public changeOpcionesMenuStatusSubjet = new Subject<NbMenuItem[]>();
  public changeOpcionMenu$ = this.changeOpcionesMenuStatusSubjet.asObservable();
  public changeAmbitosUsuarioStatusSubjet = new Subject<AccesoAmbito>();
  public changeAmbitosUsuario$ = this.changeAmbitosUsuarioStatusSubjet.asObservable();

  constructor() { }

  get getUsuarioActual(): User {
    let usuarioactual: User;
    const localusuario = localStorage.getItem(this.USUARIO_ACTUAL);
    if (localusuario) {
      usuarioactual = JSON.parse(this.b64DecodeUnicode(localusuario));
    }
    return usuarioactual;
  }

  get getDatosPersonales(): ResponseServiceDatos {
    let datosPersonales: ResponseServiceDatos;
    const localdataPersona = localStorage.getItem(this.DATOS_PERSONALES);
    if (localdataPersona) {
      datosPersonales = JSON.parse(this.b64DecodeUnicode(localdataPersona));
    }
    return datosPersonales;
  }

  get getTokenJWT(): string {
    let token: string;
    const localtoken = localStorage.getItem(this.TOKEN);
    if (localtoken) {
      token = atob(localtoken);
    }
    return token;
  }

  get getRefreshToken(): string {
    let refreshtoken: string;
    const localrefrestoken = localStorage.getItem(this.REFRESH_TOKEN);
    if (localrefrestoken) {
      refreshtoken = atob(localrefrestoken);
    }
    return refreshtoken;
  }

  get getOpcionesMenu(): NbMenuItem[] {
    let opcionesmenu: NbMenuItem[];
    const localopcionesmenu = localStorage.getItem(this.OPCIONES_MENU);
    if (localopcionesmenu) {
      opcionesmenu = JSON.parse(this.b64DecodeUnicode(localopcionesmenu));
    }
    return opcionesmenu;
  }

  get getItemMenu() {
    let opcionmenu;
    const localopcionmenu = localStorage.getItem("MENU_ITEM");
    if (localopcionmenu) {
      opcionmenu = JSON.parse(atob(localopcionmenu));
    }
    return opcionmenu;
  }

  get getMensajeErrorGenerico(): string {
    let mensajeerror: string;
    const localmensajeerror = localStorage.getItem(this.MENSAJE_ERROR_GENERICO);
    if (localmensajeerror) {
      mensajeerror = this.b64DecodeUnicode(localmensajeerror);
    }
    return mensajeerror;
  }

  setUsuarioActual(user: User) {
    const b64Encode = this.b64EncodeUnicode(JSON.stringify(user));
    localStorage.setItem(this.USUARIO_ACTUAL, b64Encode);
  }

  setDatosPersonales(data: ResponseServiceDatos) {
    const b64Encode = this.b64EncodeUnicode(JSON.stringify(data));
    localStorage.setItem(this.DATOS_PERSONALES, b64Encode);
  }

  setTokenJWT(token: string) {
    localStorage.setItem(this.TOKEN, btoa(JSON.stringify(token)));
  }

  setRefreshToken(refreshtoken: string) {
    localStorage.setItem(this.REFRESH_TOKEN, btoa(refreshtoken));
  }

  setMensajeErrorGenerico(message: string) {
    const b64Encode = this.b64EncodeUnicode(JSON.stringify(message));
    localStorage.setItem(this.MENSAJE_ERROR_GENERICO, b64Encode);
  }

  private b64EncodeUnicode = (str: string): string => {
    if (window
      && "btoa" in window
      && "encodeURIComponent" in window) {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode(("0x" + p1) as any);
      }));
    } else {
      console.warn("b64EncodeUnicode requirements: window.btoa and window.encodeURIComponent functions");
      return null;
    }

  }

  private b64DecodeUnicode = (str: string): string => {
    if (window
      && "atob" in window
      && "decodeURIComponent" in window) {
      return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(""));
    } else {
      console.warn("b64DecodeUnicode requirements: window.atob and window.decodeURIComponent functions");
      return null;
    }
  }
  setRestriccionesUI(restricciones) {
    localStorage.setItem(this.RESTRICCION_CONFIGURACION, btoa(JSON.stringify(restricciones)));
  }

  clearLocalStorage(){
    localStorage.removeItem(this.USUARIO_ACTUAL);
    localStorage.removeItem(this.DATOS_PERSONALES);
    localStorage.removeItem(this.TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.OPCIONES_MENU);
    localStorage.removeItem(this.MENSAJE_ERROR_GENERICO);
    localStorage.removeItem(this.RESTRICCION_CONFIGURACION);
  }
}
