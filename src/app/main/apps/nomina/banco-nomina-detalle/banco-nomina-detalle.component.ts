import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NominaService } from '../nomina.service';
import swal from 'sweetalert2';
import { NominaOriginalModel } from 'app/main/models/nominaOriginalModel.model';

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
  {
    nomina: '',
    nroTransaccion: '',
    ordenCompra: '',
    notaCredito: '',
    cuentaDestino: '',

    tipoCuenta: '',
    Banco: '',
    rutTitular: '',
    nombre: '',
    monto: '',

    canal: '',
    correoElectronico: '',
    estado_banco: '',
    observacion_banco: '',
  }
];

@Component({
  selector: 'app-banco-nomina-detalle',
  templateUrl: './banco-nomina-detalle.component.html',
  styleUrls: ['./banco-nomina-detalle.component.scss']
})
export class BancoNominaDetalleComponent implements OnInit {

  nominaId: number = 0;
  banco: string = '';
  private sub: any;
  router: Router;
  listaNominasReg: NominaOriginalModel[] = [];

  //tabla 2
  displayedColumns: string[] = ['nroTransaccion', 'ordenCompra', 'notaCredito', 'cuentaDestino', 'tipoCuenta', 'Banco', 'rutTitular', 'nombre', 'monto', 'canal', 'correoElectronico', 'estado_banco', 'observacion_banco'];
  dataSource = ELEMENT_DATA;

  constructor(
    public route: ActivatedRoute,
    router: Router,
    public _nominasService: NominaService
  ) {
    this.router = router;
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.nominaId = params['id'];
      this.obtenerRegistros(this.nominaId);
      console.log(this.nominaId);
    });
  }

  obtenerRegistros(nominaId) {
    swal.fire({
      title: 'Espere por favor  ...',
      onBeforeOpen: () => {
        swal.showLoading()
      }
    });

    this._nominasService.nominas_listar_banco_detalle(nominaId)
      .subscribe(
        (data) => {
          console.log(data);
          this.listaNominasReg = data;
          swal.close();
          console.log(this.listaNominasReg)
        });
  }

}
