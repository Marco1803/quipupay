export class TipoDocumento {
    id?:number;
    nombre:string;

    constructor(
        public _id?: number,
        public _nombre?: string
    ) { 
        this.id = _id;
        this.nombre = _nombre;
    }
}
