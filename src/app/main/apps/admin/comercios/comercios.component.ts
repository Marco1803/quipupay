import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComerciosService } from './comercios.service';
import { ModalEventComComponent } from './modal-event-com/modal-event-com.component';
import swal from 'sweetalert2';
import { ComercioListarModel } from 'app/main/models/comercioListarModel.model';
import { ComercioMovimientosModel } from 'app/main/models/comercioMovimientosModel.model';
import { fuseAnimations } from '@fuse/animations';

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
  selector: 'app-comercios',
  templateUrl: './comercios.component.html',
  styleUrls: ['./comercios.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  //fechas
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})

export class ComerciosComponent implements OnInit {

  //variables
  listaComercio: ComercioListarModel[] = [];

  //Modal
  dialogRef: MatDialogRef<ModalEventComComponent, any>;

  //Busqueda
  cboComercio: ComercioListarModel[] = [];
  busquedaForm: FormGroup;

  //Token
  helper: JwtHelperService;
  idComercio: string = "";

  //color = "accent";

  constructor(
    private _matDialog: MatDialog, //Modal
    public _comercioService: ComerciosService,
    private formBuilder: FormBuilder,
    public authService: GetParametrosCognito,
    public _usuarioService: UsuariosService
  ) {
    //Datos Token
    this.helper = new JwtHelperService();
    let token = this.authService.getIdToken();
    const decodedToken = this.helper.decodeToken(token);
    let idComercio = `${decodedToken["custom:IdComercio"]}`;
    this.idComercio = idComercio;
  }

  ngOnInit(): void {
    this.obtenerComercios();
    this.obtenerComercio();
    this.initBuscador();
  }

  //Obtener Datos
  obtenerComercios() {
    swal.fire({
      title: 'Espere por favor  ...',
      onBeforeOpen: () => {
        swal.showLoading()
      }
    });
    this._comercioService.obtenerComercios()
      .subscribe(
        (data) => {
          console.log('comercio');
          console.log(data);
          this.listaComercio = data;
          swal.close();
        });
  }

  //Enlace a Modal
  addEventCom(comercio: ComercioMovimientosModel): void {
    if (comercio === null) comercio = new ComercioMovimientosModel();
    this.dialogRef = this._matDialog.open(ModalEventComComponent, {
      panelClass: 'event-form-dialog',
      data: comercio
    });
    this.dialogRef.afterClosed().subscribe(
      (result: ComercioMovimientosModel) => {
        this.obtenerComercios();
      });
  }

  //busqueda
  obtenerComercio() {
    this._usuarioService.obtenerCboComercio()
      .subscribe(
        (data) => {
          this.cboComercio = data;
          console.log(this.cboComercio[0]['nombre'])
          //console.log(data);
        });

  }

  //Iniciualizando Forms
  initBuscador() {
    this.busquedaForm = this.formBuilder.group({
      fechaIni: new FormControl(moment(new Date(), 'DD MM').format('YYYY-MM-DD')),
      fechaFin: new FormControl(moment(new Date(), 'DD MM').format('YYYY-MM-DD'))
      //cboCom: new FormControl(this.idComercio, null)
    });
  }

  ObtenerBusquedaNomina() {
    let jsonsend={
      fechaIni: moment(this.busquedaForm.get('fechaIni').value).format("DD/MM/YYYY"),
      fechaFin: moment(this.busquedaForm.get('fechaFin').value).format("DD/MM/YYYY")
      //cboCom : this.busquedaForm.get('cboCom').value
    }
       console.log(jsonsend);
  }

}
