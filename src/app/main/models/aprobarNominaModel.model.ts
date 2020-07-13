export class AprobarNominaModel {
    id?:string;
    nombre:string;
    descripcion:string;
    usuario_carga:string;
    monto_origin:string;
    num_origin:string;
    comercio:string;
    id_val:string;
    id_err:string;

    constructor(
        public _id?: string,
        public _nombre?: string,
        public _descripcion?: string,
        public _usuario_carga?: string,
        public _monto_origin?: string,
        public _num_origin?: string,
        public _comercio?: string,
        public _id_val?: string,
        public _id_err?: string
    ) { 
        this.id             = _id;
        this.nombre         = _nombre;
        this.descripcion    = _descripcion;
        this.usuario_carga  = _usuario_carga;
        this.monto_origin   = _monto_origin;
        this.num_origin     = _num_origin;
        this.comercio       = _comercio;
        this.id_val         = _id_val;
        this.id_err         = _id_err;

    }
}
