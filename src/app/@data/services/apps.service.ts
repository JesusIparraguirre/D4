import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Aplicaciones, App, ResponseListApps } from "../model/app";
import { Const } from "./const";
import { map } from "rxjs/operators";
import { AppsRepository } from "../../@domain/repository/apps.repository";
import { Observable } from "rxjs";
import { Mesaservicio } from '../model/Datos';


@Injectable({ providedIn: 'root' })
export class AppsService extends AppsRepository {

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Aplicaciones> {
    let header = new HttpHeaders({
      'X-AppKey': Const.appConfig.X_APPKEY_D4,
      'X-AppCode': Const.appConfig.X_APPCODE_D4
    });
    return this.http.get<ResponseListApps>(Const.appConfig.HOST_D4_WORKSPACE + Const.API_APPS ,{
      headers: header
    })
      .pipe(map(response => {
        return this.subpartsListApps(response.aplicaciones);
      }));
  }

  setPref(idApp: number, value: number): Observable<any> {
    return this.http.put<any>(Const.appConfig.HOST_D4_WORKSPACE + Const.API_APPS_BASE + idApp + Const.API_APPS_DESTACADO + value, {});
  }

  addVisit(idApp: number): Observable<any> {
    return this.http.put<any>(Const.appConfig.HOST_D4_WORKSPACE + Const.API_APPS_BASE + idApp + Const.API_APPS_CONTADORES, {});
  }

  parserList(apps: App[]) {
    let result: App[][] = [];
    let values: App[] = [];
    apps.forEach(function (app, index) {
      values.push(app);
      if ((index + 1) % 6 === 0 || index + 1 === apps.length) {
        result.push(values);
        values = [];
      }
    });
    return result;
  }

  private subpartsListApps(aplicaciones: Aplicaciones) {
    aplicaciones.lanzamientosList = this.parserList(aplicaciones.lanzamientos);
    aplicaciones.destacadosList = this.parserList(aplicaciones.destacados);
    aplicaciones.recurrentesList = this.parserList(aplicaciones.recurrentes);
    aplicaciones.todosList = this.parserList(aplicaciones.todos);
    return aplicaciones;
  }

  getUrlApp(): Observable<Mesaservicio[]> {
    const headers = new HttpHeaders({
      'X-AppKey': Const.appConfig.X_APPKEY_D4,
      'X-AppCode': Const.appConfig.X_APPCODE_D4,
    });
    let _result = this.http.get<Mesaservicio[]>(Const.appConfig.HOST_D4_WORKSPACE + Const.API_APPS_MESA_SERVICIO, { headers: headers })
    .pipe(map(response =>
      response.map(item => this.mapSidebarItem(item))
    ));
    return _result;
  }

  private mapSidebarItem(item: Mesaservicio) {
    const _mesaServicio = new Mesaservicio();
    _mesaServicio.idAplicacion = item.idAplicacion;
    _mesaServicio.nombreAplicacion = item.nombreAplicacion;
    _mesaServicio.idEmpresa = item.idEmpresa;
    _mesaServicio.nombreEmpresa = item.nombreEmpresa;
    _mesaServicio.url = item.url;
    //console.log(_mesaServicio);
    return _mesaServicio;
  }
}
