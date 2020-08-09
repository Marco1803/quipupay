import { Component, OnInit,  ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { NominaService } from '../nomina.service';
import { NominaModel } from '../../../models/nominaModel.model';

import { UsuariosService } from '../../admin/usuarios/usuarios.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { PagerService } from '../pagination.service'; 
import { ComercioListarModel } from 'app/main/models/comercioListarModel.model';

//fechas
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
//checkbox
import {ThemePalette} from '@angular/material/core';
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
  selector: 'app-banco-respuesta-manual',
  templateUrl: './banco-respuesta-manual.component.html',
  styleUrls: ['./banco-respuesta-manual.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations, 
  //fechas
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})

export class BancoRespuestaManualComponent implements OnInit {

  //Variables
  listaNominas  : NominaModel[] = [];
  cboComercio   : ComercioListarModel[] = [];
  busquedaForm  : FormGroup;

  //paginado
  rowtotales: any;
  xpag: number;
  pag: number;
  rowtotales2: number;
  listaAfiliaciones: any;
  nrow: any;
 

  constructor(
    public _nominasService: NominaService,
    public _usuarioService: UsuariosService,
    private formBuilder: FormBuilder,
    private pageService: PagerService//paginado
  ) {
  }

  //Paginado
  pager: any = {};
  private allItems: any;

  ngOnInit(): void {
    this.initBuscador();
    this.obtenerNominas();
    this.obtenerComercio();
    this.pag = 0;//numero de pagina
  }

  //Iniciualizando Forms
  initBuscador(){
    this.busquedaForm = this.formBuilder.group({
      fechaIni: new FormControl(moment(new Date(), 'DD MM').format('YYYY-MM-DD')),
      fechaFin: new FormControl(moment(new Date(), 'DD MM').format('YYYY-MM-DD')),
      comercio : new FormControl('', null)
    });
  }


  //Obtener registros
  obtenerNominas() {
    swal.fire({
      title: 'Espere por favor  ...',
      onBeforeOpen: () => {
        swal.showLoading()
      }
    });

    this._nominasService.nominas_listar_respuesta_manual()
      .subscribe(
        (data) => {
          this.listaNominas = data;
          swal.close();
          console.log(this.listaNominas)
        });
  }

  obtenerComercio() {
    this._usuarioService.obtenerCboComercio()
      .subscribe(
        (data) => {
          this.cboComercio = data;
          console.log(this.cboComercio)
        });
  }
  
  //Acciones
  grabarUsuario() {
    let jsonsend={
      fechaIni: moment(this.busquedaForm.get('fechaIni').value).format("DD/MM/YYYY"),
      fechaFin: moment(this.busquedaForm.get('fechaFin').value).format("DD/MM/YYYY"),
      comercio : this.busquedaForm.get('comercio').value
    }
       console.log(jsonsend);
  }


  //Paginados
  setPage(page: number) {///funcion del numero de pagina
    this.pager = this.pageService.getPager(this.rowtotales, page, this.xpag);
  }

  selectpag() {
    this.buscarReporte(1);
  }

  buscarReporte(pag: number) {
    if (pag) {
      this.pag = pag;
    } else {
      this.pag = 1;
    }

    this._nominasService.nominas_listar2(this.listaNominas, this.pag, this.xpag).subscribe(
      (res) => {
        let data = res;
        //this.rowtotales = res.headers.get('numrow');//numero total de registro de la consulta.
        this.rowtotales = 100;
        if (pag == 0) {//validamos que el numero de pagina no sea 0
          pag = 1;
        }
        if (pag > 1) {
          this.rowtotales2 = ((pag - 1) * this.xpag) + 1;//calculamos el #de registro, para que cuando cambie de pagina siga la secuencia
        }
        else {
          this.rowtotales2 = pag;
        }
        this.listaAfiliaciones = data;
        this.allItems = data;
        this.setPage(pag);
        this.nrow = data.length;
      },
    );
  }


}
