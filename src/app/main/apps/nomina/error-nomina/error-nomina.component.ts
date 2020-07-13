import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NominaService } from '../nomina.service';
import { NominaErrorModel } from 'app/main/models/nominaErrorModel.model';

//tabla 1
export interface cabeceraDatos {
  subidoPor: string;
  estado: string;
  transNumber: string;
  total: string;
  detalle: string;
}

//tabla 2
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
  motivo: string;
  cartolas: string;
  canal: string;
  correoElectronico: string;
  estadoTransferencia: string;
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
  
    motivo: 'H',
    cartolas: 'HydrogenHydrogen',
    canal: 'H',
    correoElectronico: 'H',
    estadoTransferencia: 'HydrogenHydrogenH' 
  }
  ];


@Component({
  selector: 'app-error-nomina',
  templateUrl: './error-nomina.component.html',
  styleUrls: ['./error-nomina.component.scss']
})
export class ErrorNominaComponent implements OnInit {

  nominaId: number = 0;
  tipo: string = '';
  private sub: any;
  router: Router;
  listaNominasError: NominaErrorModel[]= [];

  //tabla 1
  cabeceraDetalle: string[] = ['subidoPor', 'estado', 'transNumber', 'total', 'detalle'];
  cabeceraFuente = ELEMENT_DATA1;

  //tabla 2
  displayedColumns: string[] = ['nomina', 'nroTransaccion', 'ordenCompra', 'notaCredito', 'cuentaDestino', 'tipoCuenta', 'Banco', 'rutTitular', 'nombre', 'monto', 'motivo', 'cartolas', 'canal', 'correoElectronico', 'estadoTransferencia'];
  dataSource = ELEMENT_DATA;

   constructor(
    public route:ActivatedRoute,
    router: Router,
    public _nominasService: NominaService
  ) { 
    this.router = router;

  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.nominaId = params['id'];
      this.tipo = params['tipo'];
      this.obtenerRegistrosError(this.nominaId,this.tipo);
      console.log(this.nominaId, this.tipo);
      console.log(this.nominaId,this.tipo);
    });
  }

  obtenerRegistrosError(nominaId,tipo){
    this._nominasService.nominas_listar_error(nominaId,tipo)
    .subscribe(
      (data) => {
        this.listaNominasError = data;
        console.log(this.listaNominasError)
      });
  }

}
