
export class CargaNomina {
    nombre?: string;
    descripcion?: string;
    usuario_carga?: string;
    monto_origin?: number;
    num_origin?: number;
    comercio?: string;
    detail?: string;

    constructor(
        public _nombre?: string,
        public _descripcion?: string,
        public _usuario_carga?: string,
        public _monto_origin?: number,
        public _num_origin?: number,
        public _comercio?: string,
        public _detail?: string

    ) {
        this.nombre = _nombre;
        this.descripcion = _descripcion;
        this.usuario_carga = _usuario_carga;
        this.monto_origin = _monto_origin;
        this.num_origin = _num_origin;
        this.comercio = _comercio;
        this.detail = _detail
    }

}


