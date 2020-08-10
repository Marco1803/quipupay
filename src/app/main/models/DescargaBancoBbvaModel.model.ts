export class DescargaBancoBbvaModel {
    id?                 : string;
    nominaOriId         : string;
    tipoRegistro        : string;
    cuentaCargo         : string;
    monedaCuentaCargo   : string;
    importeCargar       : string;
    tipoProceso         : string;
    fechaProceso        : string;
    horaProceso?        : string;
    totalRegistros      : string;
    validacionPertenencia: string;
    valorControl        : string;
    indicadorProceso    : string;
    descripcion         : string;
    filler              : string;
    referencia          : string;
    bancoId             : string;
    cantTotal           : string;
    chechsum            : string;
    ibk_tienda          : string;
    numeroCuentaAbono   : string;
    comercioId          : string;
    estado              : string;
    fecha_creacion      : string;
    fecha_modificacion  : string;
    flagExoneraITF      : string;
    montoTotal          : string;
    nominaId            : string;
    tipoCuentaCargo     : string;
    montoTotalAbonar  : string;
    nominaPagoBbvaDtl   : DescargaBancoBbvaDetalleModel[];

    constructor(
        public _id                  : string,
        public _nominaOriId         : string,
        public _tipoRegistro        : string,
        public _cuentaCargo         : string,
        public _monedaCuentaCargo   : string,
        public _importeCargar       : string,
        public _tipoProceso         : string,
        public _fechaProceso        : string,
        public _horaProceso         : string,
        public _totalRegistros      : string,
        public _validacionPertenencia: string,
        public _valorControl        : string,
        public _indicadorProceso    : string,
        public _descripcion         : string,
        public _filler              : string,
        public _referencia          : string,
        public _bancoId             : string,
        public _cantTotal           : string,
        public _chechsum            : string,
        public _comercioId          : string,
        public _estado              : string,
        public _fecha_creacion      : string,
        public _fecha_modificacion  : string,
        public _flagExoneraITF      : string,
        public _montoTotal          : string,
        public _nominaId            : string,
        public _tipoCuentaCargo     : string,
        public _nominaPagoBbvaDtl   : DescargaBancoBbvaDetalleModel[]
    ) {
        this.id                         = _id,
        this.nominaOriId                = _nominaOriId,
        this.tipoRegistro               = _tipoRegistro;
        this.cuentaCargo                = _cuentaCargo;
        this.monedaCuentaCargo          = _monedaCuentaCargo;
        this.importeCargar              = _importeCargar;
        this.tipoProceso                = _tipoProceso;
        this.fechaProceso               = _fechaProceso;
        this.horaProceso                = _horaProceso;
        this.totalRegistros             = _totalRegistros;
        this.validacionPertenencia      = _validacionPertenencia;
        this.valorControl               = _valorControl;
        this.indicadorProceso           = _indicadorProceso;
        this.descripcion                = _descripcion;
        this.filler                     = _filler;
        this.referencia                 = _referencia;
        this.bancoId                    = _bancoId;
        this.cantTotal                  = _cantTotal;
        this.chechsum                   = _chechsum;
        this.comercioId                 = _comercioId;
        this.estado                     = _estado;
        this.fecha_creacion             = _fecha_creacion;
        this.fecha_modificacion         = _fecha_modificacion;
        this.flagExoneraITF             = _flagExoneraITF;
        this.montoTotal                 = _montoTotal;
        this.nominaId                   = _nominaId;
        this.tipoCuentaCargo            = _tipoCuentaCargo;
        this.nominaPagoBbvaDtl          = _nominaPagoBbvaDtl;
    }
}


export class DescargaBancoBbvaDetalleModel {
    id                          : string;
    tipoRegistro                : string;
    doiTipo                     : string;
    doiNumero                   : string;
    tipoAbono                   : string;
    ibk_tienda                  : string;
    numeroCuentaAbono           : string;
    nombreBeneficiario          : string;
    importeAbonar               : string;
    tipoDocumento               : string;
    numeroDocumento             : string;
    abonoGrupal                 : string;
    referencia                  : string;
    indicadorAviso              : string;
    medioAviso                  : string;
    personaContacto             : string;
    indicadorProceso            : string;
    descripcion                 : string;
    filler                      : string;
    nominaOriId                 : string;
    bancoId                     : string;
    correlativoDocProv          : string;
    fechaVencimiento            : string;
    flgInterbancario            : string;
    flgValidaIDC                : string;
    modalidadPago               : string;
    monedaAbonar                : string;
    nominaId                    : string;
    num_sec                     : string;
    referenciaEmpresa           : string;
    tipoCuenta                  : string;
    tipoPersona                 : string;

    constructor(

        public _id                  : string,
        public _tipoRegistro        : string,
        public _doiTipo             : string,
        public _doiNumero           : string,
        public _tipoAbono           : string,
        public _numeroCuentaAbono   : string,
        public _nombreBeneficiario  : string,
        public _importeAbonar       : string,
        public _tipoDocumento       : string,
        public _numeroDocumento     : string,
        public _abonoGrupal         : string,
        public _referencia          : string,
        public _indicadorAviso      : string,
        public _medioAviso          : string,
        public _personaContacto     : string,
        public _indicadorProceso    : string,
        public _descripcion         : string,
        public _filler              : string,
        public _nominaOriId         : string,
        public _bancoId             : string,
        public _correlativoDocProv  : string,
        public _fechaVencimiento    : string,
        public _flgInterbancario    : string,
        public _flgValidaIDC        : string,
        public _modalidadPago       : string,
        public _monedaAbonar        : string,
        public _nominaId            : string,
        public _num_sec             : string,
        public _referenciaEmpresa   : string,
        public _tipoCuenta          : string,
        public _tipoPersona         : string

    ) {

        this.id                         = _id;
        this.tipoRegistro               = _tipoRegistro;
        this.doiTipo                    = _doiTipo;
        this.doiNumero                  = _doiNumero;
        this.tipoAbono                  = _tipoAbono;
        this.numeroCuentaAbono          = _numeroCuentaAbono;
        this.nombreBeneficiario         = _nombreBeneficiario;
        this.importeAbonar              = _importeAbonar;
        this.tipoDocumento              = _tipoDocumento;
        this.numeroDocumento            = _numeroDocumento;
        this.abonoGrupal                = _abonoGrupal;
        this.referencia                 = _referencia;
        this.indicadorAviso             = _indicadorAviso;
        this.medioAviso                 = _medioAviso;
        this.personaContacto            = _personaContacto;
        this.indicadorProceso           = _indicadorProceso;
        this.descripcion                = _descripcion;
        this.filler                     = _filler;
        this.nominaOriId                = _nominaOriId;
        this.bancoId                    = _bancoId;
        this.correlativoDocProv         = _correlativoDocProv;
        this.fechaVencimiento           = _fechaVencimiento;
        this.flgInterbancario           = _flgInterbancario;
        this.flgValidaIDC               = _flgValidaIDC;
        this.modalidadPago              = _modalidadPago;
        this.monedaAbonar               = _monedaAbonar;
        this.nominaId                   = _nominaId;
        this.num_sec                    = _num_sec;
        this.referenciaEmpresa          = _referenciaEmpresa;
        this.tipoCuenta                 = _tipoCuenta;
        this.tipoPersona                = _tipoPersona;
    };

}
