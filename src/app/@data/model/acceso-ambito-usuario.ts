export class ListOrganizacion {
    id: number;
    descripcion: string;
}

export class ListEmpresa {
    id: number;
    idOrganizacion: number;
    nombre: string;
}

export class ListUnidadNegocio {
    id: number;
    idEmpresa: number;
    nombre: string;
}

export class ListCentroServicio {
    id: number;
    idUUNN: number;
    nombre: string;
    abreviatura: string;
    codigoIdentificacion: string;
}

export class Estado {
    id: number;
    descripcion: string;
}

export class AccesoAmbito {
    listOrganizacion: ListOrganizacion[];
    listEmpresa: ListEmpresa[];
    listUnidadNegocio: ListUnidadNegocio[];
    listCentroServicio: ListCentroServicio[];
    estado: Estado;
}

export class AccesosAmbitoUsuario {
    accesoAmbito: AccesoAmbito;
}
