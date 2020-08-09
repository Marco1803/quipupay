import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
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
import { ReportesModel } from 'app/main/models/reportesModel.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ReportesService } from '../reportes.service';
import { MatSort } from '@angular/material/sort';
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
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss'],
  //fechas
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})

export class ReporteComponent implements OnInit {

  orders: ReportesModel[] = [];
  displayedColumns = ['operacion_id', 'comercioid', 'comercio', 'nomina_nombre',
  'nominaid', 'trans_oc', 'trans_nc', 'account_number',
  'account_type', 'banco', 'rut', 'nombre',
  'correo', 'celular', 'monto', 'moneda',
  'usuario_carga', 'fecha_carga', 'fecha_modificacion', 'estado_banco','observacion_banco'];
  dataSource :  MatTableDataSource<ReportesModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  //Busqueda
  busquedaForm: FormGroup;
  CmbEstadoReporteModel: CmbEstadoReporteModel[] = [
    new CmbEstadoReporteModel('', "Todos"),
    new CmbEstadoReporteModel('01', "Rechazado por banco"),
    new CmbEstadoReporteModel('00', "Aprobada por banco")
  ];

  //tabla
  totalPag : number = 0;
  
  

  constructor(
    private formBuilder: FormBuilder,
    public _reportesService : ReportesService
  ) 
  { 

  }

  ngOnInit(): void {
    this.initBuscador();
    this.dataSource = new MatTableDataSource(this.orders);
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    let variable = this.paginator.nextPage;
    console.log(variable);
    

}

  obtenerReportes(any){

    swal.fire({
      title: 'Espere por favor  ...',
      onBeforeOpen: () => {
        swal.showLoading()
      }
    });


    this._reportesService.reportes_listar(any)
    .subscribe(
      (data: any) => {
        this.orders = data;
        this.totalPag = this.orders.length
        console.log(this.totalPag);
        this.dataSource = new MatTableDataSource(this.orders ); 
        this.dataSource.paginator = this.paginator;
        swal.close();
      });
  }

  //Iniciualizando Forms
  initBuscador() {
    this.busquedaForm = this.formBuilder.group({
      finicio: new FormControl(moment(new Date(), 'DD MM').format('YYYY-MM-DD')),
      ffinal: new FormControl(moment(new Date(), 'DD MM').format('YYYY-MM-DD')),
      nominaid: new FormControl('',[]),
      codestado_banco: new FormControl('',[]),
      comercioid: new FormControl('',[])
    });
  }

  //Acciones
  buscarReporte() {
    let jsonsend = {
      finicio: moment(this.busquedaForm.get('finicio').value).format("YYYY-MM-DD"),
      ffinal: moment(this.busquedaForm.get('ffinal').value).format("YYYY-MM-DD"),
      nominaid: this.busquedaForm.get('nominaid').value,
      codestado_banco: this.busquedaForm.get('codestado_banco').value,
      comercioid: ''
    }
    console.log(jsonsend);
    this.obtenerReportes(jsonsend)
  }

}
