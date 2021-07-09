import { User } from "../../@data/model/User";
import { Observable } from "rxjs";
import { RequestGenerico } from "../../@data/model/request-generico";


export abstract class AuthenticationRepository {

  abstract get getCurrentUserValue(): User;
  abstract login(login: string, clave: string): Observable<any>;
  abstract refreshToken(refreshToken: string): Observable<any>;
  abstract logout(id: number, invalida: boolean): void;
  abstract forgotPassSendMail(valor: string): Observable<any>;
  abstract verificaCodigo(iduser: string, cod: string): Observable<boolean>;
  abstract reestablecePAss(iduser: string, newPass: string): Observable<boolean>;
  abstract ChangePAss(request: RequestGenerico[]): Observable<boolean>;

}
