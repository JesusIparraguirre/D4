export class User {
  id: number;
  idPersona: number;
  nombre: string;
  email: string;
  login: string;
  clave: string;
  idEstado: number;
  esAd: number;
  token?: string;
  fechaUltimaSesion: Date;
}
