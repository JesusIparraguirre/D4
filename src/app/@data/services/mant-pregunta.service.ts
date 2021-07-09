import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Const } from "./const";
import { map } from "rxjs/operators";
import { Pregunta, Respuesta, ResponseServicePreguntas } from "../model/Preguntas";
import { Observable } from "rxjs";
import { MantPreguntaRepository } from '../../@domain/repository/pregunta.repository';


@Injectable({ providedIn: 'root' })
export class MantPreguntaService implements MantPreguntaRepository {
    constructor(private http: HttpClient) { }

    editBulkQuestions(idsqs: number[], idEstado: number): Observable<any> {
        let params = new HttpParams();
        params = params.append('tipo', Const.TIPO_ACTUALIZACION_FAQ.PREGUNTA.toString());
        params = params.append('idEstado', idEstado.toString());
        return this.http.post<any>(Const.appConfig.HOST_D4_WORKSPACE + Const.API_MANT_PREGUNTA_RESPUESTA_BULK_EDIT, idsqs, {
            params,
            observe: "response",
        }).pipe(
            map((response) => {
                return response.status === 204;
            }),
        );
    }

    editBulkAnswers(idsans: number[], idEstado: number): Observable<any> {
        let params = new HttpParams();
        params = params.append('tipo', Const.TIPO_ACTUALIZACION_FAQ.RESPUESTA.toString());
        params = params.append('idEstado', idEstado.toString());
        return this.http.post<any>(Const.appConfig.HOST_D4_WORKSPACE + Const.API_MANT_PREGUNTA_RESPUESTA_BULK_EDIT, idsans, {
            params,
            observe: "response",
        }).pipe(
            map((response) => {
                return response.status === 204;
            }),
        );
    }

    savePreguntaFrecuente(request: Pregunta): Observable<any> {
        return this.http.post<any>(Const.appConfig.HOST_D4_WORKSPACE + Const.API_MANT_PREGUNTA_FRECUENTE_SAVE, request, {
            observe: "response",
        }).pipe(
            map((response) => {
                return response.status === 200;
            }),
        );
    }
    editPreguntaFrecuente(idPregunta: number, request: Pregunta): Observable<any> {
        return this.http.put<any>
            (Const.appConfig.HOST_D4_WORKSPACE + Const.API_MANT_PREGUNTA_FRECUENTE_EDIT.replace('{idPregunta}', idPregunta.toString()), request, {
                observe: "response",
            }).pipe(
                map((response) => {
                    return response.status === 204;
                }),
            );
    }
    saveRespuestaFrecuente(request: Respuesta): Observable<any> {
        return this.http.post<any>(Const.appConfig.HOST_D4_WORKSPACE
            + Const.API_MANT_RESPUESTA_FRECUENTE_SAVE.replace('{idPregunta}', request.idPregunta.toString())
            , request, {
            observe: "response",
        }).pipe(
            map((response) => {
                return response.status === 200;
            }),
        );
    }
    editRespuestaFrecuente(idRespuesta: number, request: Respuesta): Observable<any> {
        return this.http.put<any>
            (Const.appConfig.HOST_D4_WORKSPACE + Const.API_MANT_RESPUESTA_FRECUENTE_EDIT
                .replace('{idPregunta}', request.idPregunta.toString())
                .replace('{idRespuesta}', idRespuesta.toString()), request, {
                observe: "response",
            }).pipe(
                map((response) => {
                    return response.status === 204;
                }),
            );
    }

    getPreguntasFrecuentes(): Observable<Pregunta[]> {
        return this.http.get<ResponseServicePreguntas>(Const.appConfig.HOST_D4_WORKSPACE + Const.API_PREGUNTAS_FRECUENTES)
            .pipe(map(response => {
                return response.preguntasFrecuentes;
            }));
    }

}
