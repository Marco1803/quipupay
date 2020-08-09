import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { UsuarioListarModel } from '../../../models/usuarioListarModel.model';
import { UsuariosService } from './usuarios.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalEventComponent } from './modal-event/modal-event.component';
import swal from 'sweetalert2';
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

import { JwtHelperService } from '@auth0/angular-jwt';
import { GetParametrosCognito } from 'app/services/getParametrosCognito.service';
import { ComercioListarModel } from 'app/main/models/comercioListarModel.model';


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
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  //fechas
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class UsuariosComponent implements OnInit {

  //Variables
  listaUsuarios: UsuarioListarModel[] = []
  dialogRef: MatDialogRef<ModalEventComponent, any>;

  //Busqueda
  cboComercio   : ComercioListarModel[] = [];
  busquedaForm: FormGroup;

  //Token
  helper: JwtHelperService;
  idComercio: string = "";


  constructor(
    private _matDialog: MatDialog,
    public _usuarioService: UsuariosService,
    private formBuilder: FormBuilder,
    public authService: GetParametrosCognito
  ) {
     //Datos Token
 this.helper        = new JwtHelperService(); 
 let token          = this.authService.getIdToken();
 const decodedToken = this.helper.decodeToken(token);
 let idComercio     = `${ decodedToken["custom:IdComercio"]}`;
 this.idComercio      = idComercio;
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.obtenerComercio();
    this.initBuscador();
  }

   //Iniciualizando Forms
   initBuscador() {
    this.busquedaForm = this.formBuilder.group({
      fechaIni: new FormControl(moment(new Date(), 'DD MM').format('YYYY-MM-DD')),
      fechaFin: new FormControl(moment(new Date(), 'DD MM').format('YYYY-MM-DD')),
      cboCom: new FormControl(this.idComercio , null)
    });
  }

  //Obtenemos Datos
  obtenerUsuarios() {
    swal.fire({
      title: 'Espere por favor  ...',
      onBeforeOpen: () => {
        swal.showLoading()
      }
    });
    this._usuarioService.obtenerUsuarios()
      .subscribe(
        (data) => {
          console.log(data);
          this.listaUsuarios = data;
          swal.close();
        });
  }


  //Enlace a Modal
  addEventUsu(usuario: UsuarioListarModel): void {
    if (usuario === null) usuario = new UsuarioListarModel();
    this.dialogRef = this._matDialog.open(ModalEventComponent, {
      panelClass: 'event-form-dialog',
      data: usuario
    });

    this.dialogRef.afterClosed().subscribe(
      (result: UsuarioListarModel) => {
        this.obtenerUsuarios();
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

  ObtenerBusquedaNomina() {
      let jsonsend={
        fechaIni: moment(this.busquedaForm.get('fechaIni').value).format("DD/MM/YYYY"),
        fechaFin: moment(this.busquedaForm.get('fechaFin').value).format("DD/MM/YYYY"),
        cboCom : this.busquedaForm.get('cboCom').value
      }
         console.log(jsonsend);
    }
  

   

}
