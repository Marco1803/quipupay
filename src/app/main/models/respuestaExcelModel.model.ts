
export class RespuestaExcelModel {
    idNomina?: number;
    registroVal?: number;
    registroErr?: number;


    constructor(
        public _idNomina?: number,
        public _registroVal?: number,
        public _registroErr?: number

    ) {
        this.idNomina = _idNomina;
        this.registroVal = _registroVal;
        this.registroErr = _registroErr;
    }

}

