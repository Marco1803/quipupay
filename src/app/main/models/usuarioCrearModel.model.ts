import { ComercioUsuarioModel } from './comercioUsuarioModel.model';



export class UsuarioCrearModel {

    username?: string;
    email?: string;
    nombres?: string;
    apellidos?: string;
    tipodocumento?: string;
    nrodocumento?: string;
    comerciogrupoid?:number;
    rolid?: number;
    genero?:string;
    estado?:string;
    comercios?: ComercioUsuarioModel[];
}

