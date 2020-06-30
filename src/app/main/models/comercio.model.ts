export class Comercio {
    id?: string;
    nombre?: string;
    ruc?: string;
    iddepartamento?: string;
    idprovincia?: string;
    iddistrito?: string;
    direccion?: string;
    nombrecontacto?: string;
    telefono?: string;
    correo?: string;
    identificador?: string;
    estado?: string;

    constructor(
        public _id?: string,
        public _nombre?: string,
        public _ruc?: string,
        public _iddepartamento?: string,
        public _idprovincia?: string,
        public _iddistrito?: string,
        public _direccion?: string,
        public _nombrecontacto?: string,
        public _telefono?: string,
        public _correo?: string,
        public _identificador?: string,
        public _estado?: string

    ) { 
        this.id=_id;
        this.nombre=_nombre;
        this.ruc=_ruc;
        this.iddepartamento=_iddepartamento;
        this.idprovincia=_idprovincia;
        this.iddistrito=_iddistrito;
        this.direccion=_direccion;
        this.nombrecontacto=_nombrecontacto;
        this.telefono=_telefono;
        this.correo=_correo;
        this.identificador=_identificador;
        this.estado=_estado;
    }

}


