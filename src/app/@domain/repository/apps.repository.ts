import {Observable} from 'rxjs';
import {Aplicaciones} from "../../@data/model/app";
import { Mesaservicio } from '../../@data/model/Datos';

export abstract class AppsRepository {
  abstract getAll(): Observable<Aplicaciones>;
  abstract setPref(idApp: number, value: number): Observable<any>;
  abstract addVisit(idApp: number): Observable<any>;
  abstract getUrlApp(): Observable<Mesaservicio[]>;
}
