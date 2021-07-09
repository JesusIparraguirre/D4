export class Personales {
  login?: string = "";
  nombre: string = "";
  apellidoPaterno: string = "";
  apellidoMaterno: string = "";
  fechaNacimiento: string = "";
  direccion: string = "";
  email: string = "";
  telefono: string = "";
  foto?: string = "";
  tipoPersona: number = 0;
  descripcionTipoPersona: string = ""
}

export class Corporativos {
  empresas: Empresa[];
  esUsuarioAD: boolean;
  unidadesnegocio: UnidadNegocio[];
}

export class ResponseServiceDatos {
  id: number;
  personales: Personales;
  corporativos: Corporativos;
}

export class UnidadNegocio {
  id: number;
  idEmpresa: number;
  nombre: string;
}

export class Empresa {
  id: number;
  idOrganizacion: number;
  nombre: string;
}

export class Mesaservicio{
  idAplicacion: number;
  nombreAplicacion: string;
  idEmpresa: number;
  nombreEmpresa: string;
  url: string;
}

export const MESASERVICIO_ITEMS: Mesaservicio[] = []