export class Pregunta {
  orden: number;
  idPregunta: number;
  descripcion: string;
  idEstado: number;
  respuestas: Respuesta[];
  checked: boolean;
}

export class Respuesta {
  orden: number;
  idRespuesta: number;
  idPregunta: number;
  descripcion: string;
  idEstado: number;
  checked: boolean;
}

export class ResponseServicePreguntas {
  preguntasFrecuentes: Pregunta[];
}