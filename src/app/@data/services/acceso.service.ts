import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OpcionesMenu, OpcionesMenuListResponse } from '../model/opcion-menu-response';
import { Const } from './const';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  constructor(private http: HttpClient) { }

  getOptionsMenu(): Observable<NbMenuItem[]> {
    const headers = new HttpHeaders({
      'X-AppKey': Const.appConfig.X_APPKEY_D4,
      'X-AppCode': Const.appConfig.X_APPCODE_D4,
    });
    return this.http.get<OpcionesMenuListResponse>(Const.appConfig.HOST_ACCESOS + Const.API_ACCESO_GET_OPCION_MENU, { headers: headers })
      .pipe(map(response =>
        response.opcionesMenu.filter(x => x.tipoOpcion != Const.TIPO_OPCION_MENU.MODULO)
          .map(item => this.mapSidebarItem(item))
      ));
  }

  private mapSidebarItem(item: OpcionesMenu) {
    const nbMenuItem = new NbMenuItem();
    nbMenuItem.title = item.nombre;
    nbMenuItem.link = item.vista ? item.vista.url : null;
    nbMenuItem.icon = item.imagen;
    nbMenuItem.pathMatch = 'full';
    nbMenuItem.data = item;
    if (item.opcionesMenuHijas != null && item.opcionesMenuHijas.length > 0) nbMenuItem.children = item.opcionesMenuHijas.map(child => this.mapSidebarItem(child));
    return nbMenuItem;
  }
}
