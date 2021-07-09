export class Vista {
    id: number;
    nombre: string;
    descripcion: string;
    comando: string;
    url: string;
    ensamblado: string;
    clase: string;
    idEstado: number;
}

export class OpcionesMenu {
    id: number;
    idVista: number;
    idAplicacion: number;
    descripcionTipoOpcion: string;
    tipoOpcion: number;
    url: string;
    imagen: string;
    idOpcionMenuPadre: number;
    descripcion: string;
    nombre: string;
    idEstado: number;
    orden: number;
    nivel: number;
    vista: Vista;
    opcionesMenuHijas: OpcionesMenu[];
}

export class OpcionesMenuListResponse {
    opcionesMenu: OpcionesMenu[];
}