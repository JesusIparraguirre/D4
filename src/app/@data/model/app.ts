export class App {
  id: number;
  nombre: string;
  descripcion: string;
  esLanzador: number;
  esAppInterno: boolean;
  url: string;
  key: string;
  code: string;
  idTipoAplicacion: number;
  tipoAplicacion: string;
  idestado: number;
  estado: string;
  imagenUrl: string;
  destacadas: boolean;
  vistaUsuario: number;
  vistaGeneral: number;
  lanzamiento: number;
  despliegues: Despliegues[];
}
export class Despliegues {
  constructor(public nombreEmpresa: string,
    public urlEmpresa: string) { }
}
export class ResponseListApps {
  aplicaciones: Aplicaciones;
}

export class Aplicaciones {
  destacados?: App[] = [];
  destacadosList?: App[][] = [];
  recurrentes?: App[] = [];
  recurrentesList?: App[][] = [];
  todos?: App[] = [];
  todosList?: App[][] = [];
  lanzamientos?: App[] = [];
  lanzamientosList?: App[][] = [];

  constructor(destacados: App[] = [], recurrentes: App[] = [], todos: App[] = [], lanzamientos: App[] = []) {
    this.destacados = destacados;
    this.recurrentes = recurrentes;
    this.todos = todos;
    this.lanzamientos = lanzamientos;
  }
}
