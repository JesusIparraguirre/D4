import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Const } from "./const";
import { map } from "rxjs/operators";
import { ResponseServiceDatos } from "../model/Datos";
import { UserRepository } from "../../@domain/repository/user.respository";
import { Observable } from "rxjs";
import { Pregunta } from '../model/Preguntas';


@Injectable({ providedIn: 'root' })
export class UserService implements UserRepository {
  constructor(private http: HttpClient) { }

  getPersonalInfo(): Observable<ResponseServiceDatos> {
    return this.http.get<ResponseServiceDatos>(Const.appConfig.HOST_D4_WORKSPACE + Const.API_PERSON_DATA);
  }

  editProfile(iduser: string, direccion: string, telefono: string, email: string, fechanacimiento: string): Observable<boolean> {
    let body = [
      {
        "llave": "Telefono",
        "valor": telefono,
      },
      {
        "llave": "Direccion",
        "valor": direccion,
      },
      {
        "llave": "Email",
        "valor": email,
      },
      {
        "llave": "FechaNacimiento",
        "valor": fechanacimiento,
      },
    ];
    return this.http.put<any>(Const.getApiSaveDatosPersonales(iduser), body, { observe: 'response' })
      .pipe(map(response => {
        return response.status === 204;
      }));
  }
  saveFoto(iduser: string, fotoBase64: string): Observable<boolean> {
    return this.http.put<any>(Const.getApiSaveFoto(iduser), { llave: "Foto", valor: fotoBase64 }, { observe: 'response' })
      .pipe(map(response => {
        return response.status === 204;
      }));
  }
}
