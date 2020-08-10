import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { NominaService } from '../nomina.service';
import { NominaModel } from '../../../models/nominaModel.model';
import swal from 'sweetalert2';

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
  selector: 'app-nominas',
  templateUrl: './nominas.component.html',
  styleUrls: ['./nominas.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  //fechas
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})

export class NominasComponent {

  //Variables
  listaNominas: NominaModel[] = [];

  //Busqueda
  cboComercio   : ComercioListarModel[] = [];
  busquedaForm: FormGroup;

  //Token
  helper: JwtHelperService;
  idComercio: string = "";

  constructor(
    private formBuilder: FormBuilder,
    public _nominasService: NominaService,
    public _usuarioService: UsuariosService,
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
    this.obtenerComercio();
    this.initBuscador();
    this.obtenerNominas();
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
  obtenerNominas() {
    swal.fire({
      title: 'Espere por favor  ...',
      onBeforeOpen: () => {
        swal.showLoading()
      }
    });

    this._nominasService.nominas_listar()
      .subscribe(
        (data) => {

          this.listaNominas = data;
          swal.close();
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




