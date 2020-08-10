import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { AprobarNominaModel } from 'app/main/models/aprobarNominaModel.model';
import { NominaService } from '../nomina.service';
import swal from 'sweetalert2';

//exportar txt
import { Observable, of } from "rxjs";
import { DescargaBancoBbvaModel } from 'app/main/models/DescargaBancoBbvaModel.model';
import Swal from 'sweetalert2';

//fechas
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
//checkbox
import { ThemePalette } from '@angular/material/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CmbEstadoReporteModel } from 'app/main/models/cmbEstadoReporteModel.model';

import { UsuariosService } from '../../admin/usuarios/usuarios.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GetParametrosCognito } from 'app/services/getParametrosCognito.service';
import { ComercioListarModel } from 'app/main/models/comercioListarModel.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
// fin fechas

@Component({
  selector: 'app-banco-envio',
  templateUrl: './banco-envio.component.html',
  styleUrls: ['./banco-envio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations, 
  //fechas
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class BancoEnvioComponent implements OnInit {

  //Variables
  listaNominas: AprobarNominaModel[] = [];


  //Metodo para Exportar TXT
  fakeValidateUserData() {
    return of({
      userDate1: 1,
      userData2: 2
    });
  }

  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }

  dynamicDownloadTxt(nominaId, bancoNombre) {

    switch (bancoNombre) {
      case 'BBVA':
        this.exportBBVATxt(nominaId);
        break;
      case 'BCP':
        this.exportBCPTxt(nominaId);
        break;
      case 'IBK':
        this.exportIBKTxt(nominaId);
        break;
      default:
      // code block
    }

  }



  exportBBVATxt(nominaId) {

    this._nominasService.nominas_envio_Banco(nominaId)
      .subscribe(
        (data: DescargaBancoBbvaModel) => {

          // Inicio BBVA

          let text = '';

          console.log(data);
          let tipoRegistro = data['tipoRegistro'];
          let cuentaCargo = data['cuentaCargo'];
          let monedaCuentaCargo = data['monedaCuentaCargo'];
          let importeCargar = data['montoTotal'];
          let tipoProceso = data['tipoProceso'];
          let fechaProceso = data['fechaProceso'];
          let horaProceso = data['horaProceso'];
          let referencia = data['referencia'];
          let totalRegistros = data['cantTotal'];
          let validacionPertenencia = data['validacionPertenencia'];
          let valorControl = data['valorControl'];
          let indicadorProceso = data['indicadorProceso'];
          let descripcion = data['descripcion'];
          let montoTotalAbonar = data['montoTotalAbonar']
          let filler = data['filler'];

          text += data.tipoRegistro.trim().toString().padEnd(3, ' ') + cuentaCargo.trim().toString().padEnd(20, ' ') + monedaCuentaCargo.trim().toString().padEnd(3, ' ') + data.montoTotalAbonar.toString().trim().padStart(15, '0') + tipoProceso.trim().toString().padEnd(1, ' ') + fechaProceso.trim().toString().padEnd(8, '0') + horaProceso.trim().toString().padEnd(1, ' ') + referencia.trim().toString().padEnd(25, ' ') + totalRegistros.toString().trim().padStart(6, '0') + validacionPertenencia.trim().toString().padEnd(1, ' ') + valorControl.trim().toString().padEnd(15, '0') + indicadorProceso.trim().toString().padEnd(3, ' ') + descripcion.trim().toString().padEnd(30, ' ') + filler.trim().toString().padEnd(20, ' ') + '\r\n';
          console.log(text);

          data['nominaPagoDtl'].forEach((value, index) => {
            if (data['nominaPagoDtl'].length - 1 > index) {
              text += `${value.tipoRegistro.toString().trim().padEnd(3, '')}${value.doiTipo.trim().toString().padEnd(1, '')}${value.doiNumero.trim().toString().padEnd(12, ' ')}${value.tipoAbono.trim().toString().padEnd(1, ' ')}${value.numeroCuentaAbono.trim().toString().padEnd(20, ' ')}${value.nombreBeneficiario.trim().toString().padEnd(40, ' ')}${value.importeAbonar.trim().toString().padStart(15, '0')}${value.tipoDocumento.trim().toString().padEnd(1, ' ')}${value.numeroDocumento.trim().toString().padEnd(12, ' ')}${value.abonoGrupal.trim().toString().padEnd(1, ' ')}${value.referencia.trim().toString().padEnd(40, ' ')}${value.indicadorAviso.trim().toString().padEnd(1, ' ')}${value.medioAviso.trim().toString().padEnd(50, ' ')}${value.personaContacto.trim().toString().padEnd(30, ' ')}${value.indicadorProceso.trim().toString().padEnd(2, '0')}${value.descripcion.trim().toString().padEnd(30, '0')}${value.filler.trim().toString().padEnd(18, ' ')}\r\n`;
            }

            if (data['nominaPagoDtl'].length - 1 === index) {
              text += `${value.tipoRegistro.toString().trim().padEnd(3, '')}${value.doiTipo.trim().toString().padEnd(1, '')}${value.doiNumero.trim().toString().padEnd(12, ' ')}${value.tipoAbono.trim().toString().padEnd(1, ' ')}${value.numeroCuentaAbono.trim().toString().padEnd(20, ' ')}${value.nombreBeneficiario.trim().toString().padEnd(40, ' ')}${value.importeAbonar.trim().toString().padStart(15, '0')}${value.tipoDocumento.trim().toString().padEnd(1, ' ')}${value.numeroDocumento.trim().toString().padEnd(12, ' ')}${value.abonoGrupal.trim().toString().padEnd(1, ' ')}${value.referencia.trim().toString().padEnd(40, ' ')}${value.indicadorAviso.trim().toString().padEnd(1, ' ')}${value.medioAviso.trim().toString().padEnd(50, ' ')}${value.personaContacto.trim().toString().padEnd(30, ' ')}${value.indicadorProceso.trim().toString().padEnd(2, '0')}${value.descripcion.trim().toString().padEnd(30, '0')}${value.filler.trim().toString().padEnd(18, ' ')}`;
              this.dyanmicDownloadByHtmlTag({
                //fileName: 'My Report',
                fileName: nominaId.toString(),
                text: text
              });
            }
          });

        });
  }

  // Fin BBVA

  // data['nominaPagoBbvaDtl'].forEach((value, index) => {
  //   //text += `${value.id.toString().padEnd(30, ' ')} ${value.descripcion.trim()} ${value.comercio.trim()} \r\n`;
  //   if (data.length - 1 === index) {
  //     this.dyanmicDownloadByHtmlTag({
  //       fileName: 'My Report',
  //       text: text
  //     });
  //   }
  // });



  // Inicio BCP

  exportBCPTxt(nominaId) {

    let fechaNow = moment(new Date()).format("YYYYMMDD")

    this._nominasService.nominas_envio_Banco(nominaId)
      .subscribe(
        (data: DescargaBancoBbvaModel) => {

          let text = '';

          console.log(data);
          let tipoRegistro = data['tipoRegistro'];//
          let tipoRegistroBCPdet = '3';//
          let cantAbonoPlanilla = data['cantTotal'];//
          let fechaProceso = fechaNow;//
          let tipoCuentaCargo = data['tipoCuentaCargo'];
          let monedaCuentaCargo = data['monedaCuentaCargo'];
          let numeroCuentaCargo = data['cuentaCargo'];
          let montoTotalPlanilla = data['montoTotal'];//
          let referenciaPlanilla = data['referencia'];
          let flagExoneracionItf = data['flagExoneraITF'];
          let totalControl = data['chechsum'];

          text += data.tipoRegistro.trim().toString().padEnd(1, ' ') + cantAbonoPlanilla.toString().trim().padStart(6, '0') + fechaProceso.trim().toString().padEnd(8, ' ') + tipoCuentaCargo.trim().toString().padStart(1, '0') + monedaCuentaCargo.trim().toString().padEnd(4, ' ') + numeroCuentaCargo.trim().toString().padEnd(20, ' ') + montoTotalPlanilla.toString().trim().padStart(17, '0') + referenciaPlanilla.trim().toString().padEnd(40, ' ') + flagExoneracionItf.trim().toString().padEnd(1, ' ') + totalControl.trim().toString().padStart(15, '0') + '\r\n';
          console.log(text);
          data['nominaPagoDtl'].forEach((value, index) => {
            if (data['nominaPagoDtl'].length - 1 > index) {
              text += `${value.tipoRegistro.trim().toString().padEnd(1, '')}${value.tipoCuenta.trim().toString().padEnd(1, '')}${value.numeroCuentaAbono.trim().toString().padEnd(20, ' ')}${value.modalidadPago.trim().toString().padEnd(1, ' ')}${value.doiTipo.trim().toString().padEnd(1, ' ')}${value.doiNumero.trim().toString().padEnd(12, ' ')}${value.correlativoDocProv.trim().toString().padStart(3, ' ')}${value.nombreBeneficiario.trim().toString().padEnd(75, ' ')}${value.referencia.trim().toString().padEnd(40, ' ')}${value.referenciaEmpresa.trim().toString().padEnd(20, ' ')}${value.monedaAbonar.trim().toString().padEnd(4, ' ')}${value.importeAbonar.trim().toString().padStart(17, '0')}${value.flgValidaIDC.trim().toString().padEnd(1, ' ')}\r\n`;
              text += `${tipoRegistroBCPdet.padEnd(1, '')}${value.tipoDocumento.trim().toString().padEnd(1, '')}${value.numeroDocumento.trim().toString().padStart(15, '0')}${value.importeAbonar.trim().toString().padStart(17, '0')}\r\n`;
            }
            if (data['nominaPagoDtl'].length - 1 === index) {
              text += `${value.tipoRegistro.trim().toString().padEnd(1, '')}${value.tipoCuenta.trim().toString().padEnd(1, '')}${value.numeroCuentaAbono.trim().toString().padEnd(20, ' ')}${value.modalidadPago.trim().toString().padEnd(1, ' ')}${value.doiTipo.trim().toString().padEnd(1, ' ')}${value.doiNumero.trim().toString().padEnd(12, ' ')}${value.correlativoDocProv.trim().toString().padStart(3, ' ')}${value.nombreBeneficiario.trim().toString().padEnd(75, ' ')}${value.referencia.trim().toString().padEnd(40, ' ')}${value.referenciaEmpresa.trim().toString().padEnd(20, ' ')}${value.monedaAbonar.trim().toString().padEnd(4, ' ')}${value.importeAbonar.trim().toString().padStart(17, '0')}${value.flgValidaIDC.trim().toString().padEnd(1, ' ')}\r\n`;
              text += `${tipoRegistroBCPdet.padEnd(1, '')}${value.tipoDocumento.trim().toString().padEnd(1, '')}${value.numeroDocumento.trim().toString().padStart(15, '0')}${value.importeAbonar.trim().toString().padStart(17, '0')}`;
              this.dyanmicDownloadByHtmlTag({
                fileName: 'My Report',
                text: text
              });
            }
          });


        });
  }

  // Fin BCP

  //Inicio Interbank

  exportIBKTxt(nominaId) {

    this._nominasService.nominas_envio_Banco(nominaId)
      .subscribe(
        (data: DescargaBancoBbvaModel) => {
          let text = '';

          console.log(data);
          let enBlanco = '00';
          let retencion = '0000000000000';

          data['nominaPagoDtl'].forEach((value, index) => {
            if (data['nominaPagoDtl'].length - 1 > index) {
              text += `${value.tipoRegistro.trim().toString().padEnd(2, '')}${value.doiNumero.trim().toString().padEnd(20, ' ')}${value.tipoDocumento.trim().toString().padEnd(1, ' ')}${value.numeroDocumento.trim().toString().padEnd(20, ' ')}${value.fechaVencimiento.trim().toString().padEnd(8, ' ')}${value.monedaAbonar.trim().toString().padEnd(2, ' ')}${value.importeAbonar.trim().toString().padStart(15, '0')}${value.flgInterbancario.trim().toString().padEnd(1, ' ')}${value.tipoAbono.trim().toString().padEnd(2, ' ')}${value.tipoCuenta.trim().toString().padEnd(3, ' ')}${value.monedaAbonar.trim().toString().padEnd(2, ' ')}${value.ibk_tienda.toString().trim().padEnd(3, ' ')}${value.numeroCuentaAbono.trim().toString().padEnd(20, ' ')}${value.tipoPersona.trim().toString().padEnd(1, ' ')}${value.doiTipo.trim().toString().padEnd(2, ' ')}${value.doiNumero.trim().toString().padEnd(15, ' ')}${value.nombreBeneficiario.trim().toString().padEnd(60, ' ')}${enBlanco.trim().toString().padEnd(2, ' ')}${retencion.trim().toString().padEnd(13, ' ')}\r\n`;

            }
            if (data['nominaPagoDtl'].length - 1 === index) {
              text += `${value.tipoRegistro.trim().toString().padEnd(2, '')}${value.doiNumero.trim().toString().padEnd(20, ' ')}${value.tipoDocumento.trim().toString().padEnd(1, ' ')}${value.numeroDocumento.trim().toString().padEnd(20, ' ')}${value.fechaVencimiento.trim().toString().padEnd(8, ' ')}${value.monedaAbonar.trim().toString().padEnd(2, ' ')}${value.importeAbonar.trim().toString().padStart(15, '0')}${value.flgInterbancario.trim().toString().padEnd(1, ' ')}${value.tipoAbono.trim().toString().padEnd(2, ' ')}${value.tipoCuenta.trim().toString().padEnd(3, ' ')}${value.monedaAbonar.trim().toString().padEnd(2, ' ')}${value.ibk_tienda.toString().trim().padEnd(3, ' ')}${value.numeroCuentaAbono.trim().toString().padEnd(20, ' ')}${value.tipoPersona.trim().toString().padEnd(1, ' ')}${value.doiTipo.trim().toString().padEnd(2, ' ')}${value.doiNumero.trim().toString().padEnd(15, ' ')}${value.nombreBeneficiario.trim().toString().padEnd(60, ' ')}${enBlanco.trim().toString().padEnd(2, ' ')}${retencion.trim().toString().padEnd(13, ' ')}`;
              this.dyanmicDownloadByHtmlTag({
                fileName: 'My Report',
                text: text
              });
            }
          });


        });
  }

  //Fin Interbank


  dynamicDownloadJson() {
    this.fakeValidateUserData().subscribe((res) => {
      this.dyanmicDownloadByHtmlTag({
        fileName: 'My Report.json',
        text: JSON.stringify(res)
      });
    });
  }

  dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }

  //Fin Metodo para Exportar TXT

  constructor(
    public _nominasService: NominaService
  ) { }

  ngOnInit(): void {
    this.obtenerNominas();
  }

  //Obtener Datos
  obtenerNominas() {
    swal.fire({
      title: 'Espere por favor  ...',
      onBeforeOpen: () => {
        swal.showLoading()
      }
    });
    this._nominasService.nominas_listar_banco_Envio()
      .subscribe(
        (data) => {
          this.listaNominas = data;
          swal.close();
          console.log(this.listaNominas);
        });
  }

  enviar_nomina(idUnico){

    Swal.fire({
      title: 'Desea actualizar el estado a enviado?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar!'
    }).then((result) => {
      if (result.value) {

        this._nominasService.nominas_envio_banco(idUnico)
        .subscribe(
          (data) => {
            this.obtenerNominas();
            swal.close();
          });
          
        Swal.fire(
          'Registro actualizado!',
          '',
          'success'
        )
      }
    })





  }

}
