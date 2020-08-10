import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NominaService } from '../nomina.service';
import { NominaOriginalModel } from 'app/main/models/nominaOriginalModel.model';
import swal from 'sweetalert2';

//tabla 1
export interface cabeceraDatos {
  subidoPor: string;
  estado: string;
  transNumber: string;
  total: string;
  detalle: string;
}

//tabla 1
const ELEMENT_DATA1: cabeceraDatos[] = [
  {
    subidoPor: '1',
    estado: 'Hydrogen',
    transNumber: '1.0079',
    total: 'HydrogenHydrogen',
    detalle: 'H'
  }
];

//tabla 2
export interface PeriodicElement {
  nomina: string;
  nroTransaccion: string;
  ordenCompra: string;
  notaCredito: string;
  cuentaDestino: string;
  tipoCuenta: string;
  Banco: string;
  rutTitular: string;
  nombre: string;
  monto: string;
  canal: string;
  correoElectronico: string;
  estado_banco: string;
  observacion_banco: string;
}
  //tabla 2
  const ELEMENT_DATA: PeriodicElement[] = [
    {nomina: '1', 
    nroTransaccion: 'Hydrogen', 
    ordenCompra: '1.0079', 
    notaCredito: 'HydrogenHydrogenHydrogenHydrogenHydrogenHydrogen',
    cuentaDestino: 'H',

    tipoCuenta: 'HydrogenHydrogenHydrogenHydrogenHydrogen',
    Banco: 'H',
    rutTitular: 'H',
    nombre: 'HydrogenHydrogenHydrogenH',
    monto: 'H',
  
    canal: 'H',
    correoElectronico: 'H',
    estado_banco: 'HydrogenHydrogenH',
    observacion_banco: 'H'
  }
  ];

@Component({
  selector: 'app-detalle-nomina',
  templateUrl: './detalle-nomina.component.html',
  styleUrls: ['./detalle-nomina.component.scss']
})


export class DetalleNominaComponent implements OnInit {

  nominaId: number = 0;
  tipo: string = '';
  private sub: any;
  router: Router;
  listaNominasReg: NominaOriginalModel[]= [];

  //tabla 1
  cabeceraDetalle: string[] = ['subidoPor', 'estado', 'transNumber', 'total', 'detalle'];
  cabeceraFuente = ELEMENT_DATA1;

  //tabla 2
  displayedColumns: string[] = [ 'nroTransaccion', 'ordenCompra', 'notaCredito', 'cuentaDestino', 'tipoCuenta', 'Banco', 'rutTitular', 'nombre', 'monto', 'canal', 'correoElectronico', 'estado_banco', 'observacion_banco'];
  dataSource = ELEMENT_DATA;

 
  constructor(
    public route:ActivatedRoute,
    router: Router,
    public _nominasService: NominaService
  ) { 
    this.router = router;

  }

  ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
      this.nominaId = params['id'];
      this.tipo = params['tipo'];
      this.obtenerRegistros(this.nominaId,this.tipo);
      console.log(this.nominaId, this.tipo);
    });
  }

  obtenerRegistros(nominaId,tipo){
    swal.fire({
      title: 'Espere por favor  ...',
      onBeforeOpen: () => {
        swal.showLoading()
      }
    });

    this._nominasService.nominas_listar_original(nominaId,tipo)
    .subscribe(
      (data) => {
        this.listaNominasReg = data;
        swal.close();
        console.log(this.listaNominasReg)
      });
  }




}
