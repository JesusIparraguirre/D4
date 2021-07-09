import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AppConfig } from '../model/app-config';

@Injectable({
  providedIn: 'root',
})

export class Const {
  public static appConfig: AppConfig = new AppConfig();
  public static XAPPKEY: string = 'ZGlzdHJpbHV6X3BsYXRhZm9ybWFfc2VndXJpZGFkX3dlYg==';
  public static XAPPCODE: string = 'AC98E15D-8665-4AD6-8614-E134E46563C6';

  public static LOCAL_IP: string = 'LOCAL_IP';
  public static HOST_NAME: string = 'HOST_NAME';
  public static BROWSER_NAME: string = 'BROWSER_NAME';
  public static BROWSER_VERSION: string = 'BROWSER_VERSION';


  // public static HOST_D4_WORKSPACE: string = 'https://bbe781f9-b06e-4e2f-9404-039e6af13047.mock.pstmn.io';

  public static API_LOGIN: string = '/autenticacion/';
  public static API_AUTHORIZATION_CODE: string = '/autenticacion/autorizacion';
  public static API_REFRESH_TOKEN: string = '/autenticacion/refresh/token';
  public static API_INVALID_TOKEN: string = '/autenticacion/invalidar/token/{id}';
  public static API_APPS: string = '/aplicacion/listado/';
  public static API_PERSON_DATA: string = '/persona/datos/';
  public static API_PREGUNTAS_FRECUENTES: string = '/preguntasfrecuentes/';
  public static API_APPS_BASE: string = '/aplicacion/';
  public static API_FOGOT_PASS_SEND_MAIL: string = '/clave/envia/correo/';
  public static API_VERIFICA: string = '/clave/usuario/{id}/verifica/{codigo}';
  public static API_REESTABLECE: string = '/clave/usuario/{id}/reestablece';
  public static API_CAMBIO: string = '/clave/cambio';
  public static API_SAVE_DATOS_PERSONALES: string = '/persona/{id}/datos/personales';
  public static API_SAVE_FOTO: string = '/persona/{id}/foto';
  public static API_APPS_DESTACADO: string = '/destacado/';
  public static API_APPS_CONTADORES: string = '/contadores/';

  public static API_ACCESO_GET_OPCION_MENU: string = '/acceso/usuarioopcionesmenu';

  public static API_MANT_PREGUNTA_FRECUENTE_SAVE: string = '/preguntasfrecuentes/nuevo';
  public static API_MANT_PREGUNTA_FRECUENTE_EDIT: string = '/preguntasfrecuentes/{idPregunta}';
  public static API_MANT_RESPUESTA_FRECUENTE_SAVE: string = '/preguntasfrecuentes/{idPregunta}/respuesta';
  public static API_MANT_RESPUESTA_FRECUENTE_EDIT: string = '/preguntasfrecuentes/{idPregunta}/respuesta/{idRespuesta}';
  public static API_MANT_PREGUNTA_RESPUESTA_BULK_EDIT: string = '/preguntasfrecuentes/actualizar-estado-masivo';

  public static API_ACCESO_AMBITOS: string = '/acceso/ambitos';

  public static API_APPS_MESA_SERVICIO: string = '/aplicacion/mesaservicio';

  public static API_PARAMETER_GET_BY_KEY: string = '/parametros/{key}';

  public static TIPO_OPCION_MENU = {
    MODULO: 4,
    CARPETA: 5,
    VISTA: 6,
  };

  public static PARAMETRO = {
    FOTO_TAMANIO_MAX_KB: "FotoTamanioMaximoKB",
    FOTO_TIPO_IMAGENES: "FotoTipoImagen",
  }

  public static TIPO_ACTUALIZACION_FAQ = {
    PREGUNTA: 1,
    RESPUESTA: 2
  };

  public static TIPO_APLICACION = {
    WEB: 1,
    MOVIL: 2,
    ESCRITORIO: 3
  };

  constructor(private httpClient: HttpClient) { }

  initialize() {
    return this.httpClient.get<AppConfig>(`./assets/config/config-${environment.name}.json`)
      .pipe(tap((response: AppConfig) => {
        Const.appConfig = response;
      })).toPromise<AppConfig>();
  }
  public static getApiVerifica(iduser: string, cod: string) {
    return Const.appConfig.HOST_AUTENTICACION + this.API_VERIFICA.replace('{id}', iduser).replace('{codigo}', cod);
  }
  public static getReestablece(iduser: string) {
    return Const.appConfig.HOST_AUTENTICACION + this.API_REESTABLECE.replace('{id}', iduser);
  }
  public static getChangePassword() {
    return Const.appConfig.HOST_AUTENTICACION + this.API_CAMBIO;
  }
  public static getApiSaveDatosPersonales(iduser: string) {
    return Const.appConfig.HOST_D4_WORKSPACE + this.API_SAVE_DATOS_PERSONALES.replace('{id}', iduser);
  }
  public static getApiSaveFoto(iduser: string) {
    return Const.appConfig.HOST_D4_WORKSPACE + this.API_SAVE_FOTO.replace('{id}', iduser);
  }
}
