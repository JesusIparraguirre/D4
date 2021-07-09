import { Observable } from "rxjs";
import { ResponseServiceDatos } from "../../@data/model/Datos";
import { Pregunta } from "../../@data/model/Preguntas";

export abstract class UserRepository {

  abstract getPersonalInfo(): Observable<ResponseServiceDatos>;
  abstract editProfile(iduser: string, direccion: string, telefono: string, email: string, fechanacimiento: string): Observable<boolean>;
  abstract saveFoto(iduser: string, fotoBase64: string): Observable<boolean>;
}
