
export class Rol {
    id?: number;
    nombre?: string;
    nombre_vista?: string;
    is_admin?: string;
    estado?: string;
    fechacreacion?: string;

    constructor(
        public _id?: number,
        public _nombre?: string,
        public _nombre_vista?: string,
        public _is_admin?: string,
        public _estado?: string,
        public _fechacreacion?: string

    ) { 
        this.id=_id;
        this.nombre=_nombre;
        this.nombre_vista=_nombre_vista;
        this.is_admin=_is_admin;
        this.estado=_estado;
        this.fechacreacion=_fechacreacion;
    }

}

