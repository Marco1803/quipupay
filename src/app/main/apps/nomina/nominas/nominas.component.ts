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
  selector: 'app-nominas',
  templateUrl: './nominas.component.html',
  styleUrls: ['./nominas.component.scss'],
  //fechas
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})

export class NominasComponent {

  listaNominas: NominaModel[] = [];
  displayedColumns = ['id', 'archivo', 'Subido_por', 'estado',
  'total_soles', 'total_num', 'fecha_carga', 'ultima_actualziacion',
  'compania', 'acciones'];
  dataSource :  MatTableDataSource<NominaModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;



  //Variables
  //listaNominas: NominaModel[] = [];

  //Busqueda
  cboComercio: ComercioListarModel[] = [];
  busquedaForm: FormGroup;

  //Token
  helper: JwtHelperService;
  idComercio: string = "";
  comercioId = '';

   //tabla
   totalPag : number = 0;

  constructor(
    private formBuilder: FormBuilder,
    public _nominasService: NominaService,
    public _usuarioService: UsuariosService,
    public authService: GetParametrosCognito
  ) {
    //Datos Token
    this.helper = new JwtHelperService();
    let token = this.authService.getIdToken();
    const decodedToken = this.helper.decodeToken(token);
    let idComercio = `${decodedToken["custom:IdComercio"]}`;
    this.idComercio = idComercio;

  }

  ngOnInit(): void {
    // let comercioId = localStorage.getItem('comercioId');
    // console.log(comercioId);
    // this.comercioId =  comercioId;

    this.dataSource = new MatTableDataSource(this.listaNominas);
    this.dataSource.paginator = this.paginator;

    this.obtenerComercio();
    this.initBuscador();
    this.obtenerNominas();


  }

  ngAfterViewInit() {
    let variable = this.paginator.nextPage;
    console.log(variable);
    

}

  //Iniciualizando Forms
  initBuscador() {
    this.busquedaForm = this.formBuilder.group({
      finicio: new FormControl(moment(new Date(), 'DD MM').format('YYYY-MM-DD')),
      ffinal: new FormControl(moment(new Date(), 'DD MM').format('YYYY-MM-DD')),
      nominaId : new FormControl(''),
      cboCom: new FormControl(this.idComercio, null)
    });
  }

  //Obtenemos Datos
  obtenerNominas() {
    // swal.fire({
    //   title: 'Espere por favor  ...',
    //   onBeforeOpen: () => {
    //     swal.showLoading()
    //   }
    // });

    //timeout

    // let dataCargada = '';
    // let datacargada2 = [];


    //     if (dataCargada == '' || dataCargada == null) {
    //       //alert('no hay nada' );
    //       setTimeout(() => {
    //         let comercioId = localStorage.getItem('comercioId');
    //         console.log(comercioId);
    //         this.comercioId =  comercioId;

    //             if(this.comercioId == '' ){
    //               console.log('no hay data');
    //               dataCargada = '';
    //               this. obtenerNominas();
    //             }else{
    //               this._nominasService.nominas_listar(this.comercioId)
    //               .subscribe(
    //                 (data) => {
    //                   console.log('hay data');
    //                   dataCargada = '1';
    //                   this.listaNominas = data;
    //                   console.log(data);
    //                   swal.close();
    //                 });
    //             }
    //       }, 1000);
    //     }
    //timeout



    // this._nominasService.nominas_listar(this.comercioId)
    //   .subscribe(
    //     (data) => {

    //       this.listaNominas = data;
    //       swal.close();
    //     });
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
    let comercioId = localStorage.getItem('comercioId');
    console.log(comercioId);
    this.comercioId = comercioId;

    let jsonsend = {
      finicio: moment(this.busquedaForm.get('finicio').value).format("YYYY-MM-DD"),
      ffinal: moment(this.busquedaForm.get('ffinal').value).format("YYYY-MM-DD"),
      nominaId: this.busquedaForm.get('nominaId').value,
      cboCom: this.comercioId
    }

    this._nominasService.nominas_listar(jsonsend)
      .subscribe(
        (data) => {
console.log(data);
          this.listaNominas = data;
          this.totalPag = this.listaNominas.length
          this.dataSource = new MatTableDataSource(this.listaNominas ); 
          this.dataSource.paginator = this.paginator;
          swal.close();
        });
  }



}




