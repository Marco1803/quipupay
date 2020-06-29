
export class Usuario {
    username?: string;
    enabled?: string;
    email?: string;
    userCreateDate?: string;
    userStatus?: string;
    lastModifiedDate?: string;
    nombres?: string;
    apellidos?: string;
    tipodocumento?: string;
    nrodocumento?: string;
    idrol?: string;
    idComercio?: string;
    genero?: string;

    constructor(
        public _username?: string,
        public _enabled?: string,
        public _email?: string,
        public _userCreateDate?: string,
        public _userStatus?: string,
        public _lastModifiedDate?: string,
        public _nombres?: string,
        public _apellidos?: string,
        public _tipodocumento?: string,
        public _nrodocumento?: string,
        public _idrol?: string,
        public _idComercio?: string,
        public _genero?: string

    ) { 
        this.username=_username;
        this.enabled=_enabled;
        this.email=_email;
        this.userCreateDate=_userCreateDate;
        this.userStatus=_userStatus;
        this.lastModifiedDate=_lastModifiedDate;
        this.nombres=_nombres;
        this.apellidos=_apellidos;
        this.tipodocumento=_tipodocumento;
        this.nrodocumento=_nrodocumento;
        this.idrol=_idrol;
        this.idComercio=_idComercio;
        this.genero=_genero;
    }

}


