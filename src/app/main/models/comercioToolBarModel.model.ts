import { ComercioUsuarioModel } from './comercioUsuarioModel.model';

export class ComercioToolBarModel {
    username?: number;
    email?: string;
    nombres?: string;
    apellidos?: number;
    tipodocumento?: string;
    nrodocumento?: string;
    comerciogrupoid?: number;
    rolid?: number;
    rolname?: string;
    genero?: string;
    estado?: string;
    comercios?: ComercioUsuarioModel[];
}
