export class AdminOptionModel {
    id?:string;
    nombre:string;

    constructor(
        public _id?: string,
        public _nombre?: string
    ) { 
        this.id = _id;
        this.nombre = _nombre;
    }
}
