import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Const } from './const';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private FOTO_TAMANIO_MAX_KB = 'D22B2C9B-044E-4E71-B232-BF86B6FC69D521223';
  private FOTO_TIPO_IMAGENES = 'D22B2C9B-044E-4E71-B232-BF86B6FC69D521323';

  constructor(private http: HttpClient) { }

  getParametroConfiguracion(key: string): Observable<any> {
    let header = new HttpHeaders({
      'X-AppKey': Const.XAPPKEY,
      'X-AppCode': Const.XAPPCODE,
    });
    const options = {
      headers: header,
      params: new HttpParams().set('cleancache', 'false'),
    };
    return this.http.get<any>(Const.appConfig.HOST_CONFIGURACION + Const.API_PARAMETER_GET_BY_KEY.replace('{key}', key.toString()), options);
  }

  setFotoTamanioMaximo(value: string) {
    localStorage.setItem(this.FOTO_TAMANIO_MAX_KB, value);
  }

  getFotoTamanioMaximo(): number {
    let FotoTamanioMaximo = localStorage.getItem(this.FOTO_TAMANIO_MAX_KB);

    return parseInt(FotoTamanioMaximo);
  }

  setFotoTipoImagenes(value: string) {
    localStorage.setItem(this.FOTO_TIPO_IMAGENES, value);
  }

  getFotoTipoImagenes(): string {
    let FotoTipoImagenes = localStorage.getItem(this.FOTO_TIPO_IMAGENES);

    return FotoTipoImagenes;
  }
}
