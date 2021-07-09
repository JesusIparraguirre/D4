import { Observable } from "rxjs";
import { Pregunta, Respuesta } from "../../@data/model/Preguntas";

export abstract class MantPreguntaRepository {
    abstract getPreguntasFrecuentes(): Observable<Pregunta[]>;

    abstract savePreguntaFrecuente(request: Pregunta): Observable<any>;

    abstract editPreguntaFrecuente(idPregunta: number, request: Pregunta): Observable<any>;

    abstract saveRespuestaFrecuente(request: Respuesta): Observable<any>;

    abstract editRespuestaFrecuente(idRespuesta: number, request: Respuesta): Observable<any>;

    abstract editBulkQuestions(idsqs: number[], idEstado: number): Observable<any>;

    abstract editBulkAnswers(idsans: number[], idEstado: number): Observable<any>;
}