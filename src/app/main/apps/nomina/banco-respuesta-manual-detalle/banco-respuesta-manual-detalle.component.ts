import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NominaService } from '../nomina.service';
import { NominaOriginalModel } from 'app/main/models/nominaOriginalModel.model';
import { CargaBancoModel } from 'app/main/models/cargaBancoModel.model';
import Swal from 'sweetalert2';


//tabla 2
export interface PeriodicElement {
  estado: string;
  nroTransaccion1: string;
  observacion: string;
  numeroDocumento: string;
  modo: string;
  codEstado: string;
  Estado: string;
  numeroCuentaAbono: string;
  importeAbonar: string;
  monedaAbonar: string;
}
//tabla 2
const ELEMENT_DATA: PeriodicElement[] = [
  {
    estado:'',
    nroTransaccion1: '',
    observacion: '',
    numeroDocumento: '',
    modo: '',
    codEstado: '',
    Estado: '',
    numeroCuentaAbono: '',
    importeAbonar: '',
    monedaAbonar: ''
  }
];

@Component({
  selector: 'app-banco-respuesta-manual-detalle',
  templateUrl: './banco-respuesta-manual-detalle.component.html',
  styleUrls: ['./banco-respuesta-manual-detalle.component.scss']
})
export class BancoRespuestaManualDetalleComponent implements OnInit {

  nominaId: number = 0;
  banco: string = '';
  private sub: any;
  router: Router;
  listaNominasReg: NominaOriginalModel[]= [];

  //Select all check box
  completed: boolean;

  //tabla 2
  displayedColumns: string[] = ['nroTransaccion1','estado','observacion', 'numeroDocumento','numeroCuentaAbono','importeAbonar','monedaAbonar'];
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

      this.obtenerRegistros(this.nominaId);
      console.log(this.nominaId, this.banco);
    });
  }

  obtenerRegistros(nominaId){
    this._nominasService.nominas_listar_respuesta_manual_detalle(nominaId)
    .subscribe(
      (data) => {
        this.listaNominasReg = data;
        console.log(this.listaNominasReg)
      });
  }

  onChange(name: string, isChecked: boolean) {
    this.listaNominasReg.find(objeto => objeto.id === name).check = isChecked;
  }

  getchecksAprobar(){


   
    //console.log( detalle);

    Swal.fire({
      title: 'Desea actualizar el estado a Aprobado por el Banco?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar!'
      
    }).then((result) => {
     

      if (result.value) {

        let listadoChe = this.listaNominasReg.filter(objeto => objeto.check );
        console.log('aprobar');
    console.log(listadoChe);
        listadoChe.forEach(function(e){
          e.cod_estado = '00';
          e.estado = 'ABONO CORRECTO';
        });
    
        //console.log(listadoChe);
        let detalle = [];
        for (let i = 0; i < listadoChe.length; i++) {
    if(listadoChe[i]['check']=true){
          let detail: CargaBancoModel= new CargaBancoModel();
          detail.codEstado = listadoChe[i]['cod_estado'];
          detail.estado  = listadoChe[i]['estado'];
          detail.modo = 'Manual';
          detail.nroDocumento = listadoChe[i]['numeroDocumento'];
          detail.observacion = listadoChe[i]['observacion'];
          detalle.push(detail);
        }
        }

        this._nominasService.nominas_respuesta_banco_aprobar(detalle,this.nominaId)
        .subscribe(
          (data) => {
            this.obtenerRegistros(this.nominaId);
          });
    
    
          console.log( detalle);


        Swal.fire(
          'Registro actualizado!',
          '',
          'success'
        )
      }
    })


  }

  getchecksRechazar(){

    //console.log( detalle);


    Swal.fire({
      title: 'Desea actualizar el estado a Rechazado por el Banco?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar!'
    }).then((result) => {
      if (result.value) {

        let listadoChe = this.listaNominasReg.filter(objeto => objeto.check);
        listadoChe.forEach(function(e){
          e.cod_estado = '01';
          e.estado = 'ABONO INCORRECTO';
        });
    
        //console.log(listadoChe);
        let detalle = [];
        for (let i = 0; i < listadoChe.length; i++) {
          if(listadoChe[i]['check']=true){
          let detail: CargaBancoModel= new CargaBancoModel();
          detail.codEstado = listadoChe[i]['cod_estado'];
          detail.estado  = listadoChe[i]['estado'];
          detail.modo = 'Manual';
          detail.nroDocumento = listadoChe[i]['numeroDocumento'];
          detail.observacion = listadoChe[i]['observacion'];
          detalle.push(detail);
          }
        }


        this._nominasService.nominas_respuesta_banco_aprobar(detalle,this.nominaId)
        .subscribe(
          (data) => {

            this.obtenerRegistros(this.nominaId);
          });
          console.log( detalle);
        Swal.fire(
          'Registro actualizado!',
          '',
          'success'
        )
      }
    })





  }

  Input1(idDetaNomina, datos){
    this.listaNominasReg.find(objeto => objeto.id === idDetaNomina).observacion = datos;
  }

  selectAll(isChecked: boolean){
    console.log('cabecera0',isChecked);
    this.listaNominasReg.forEach(function (value) {
      if(value.estado == 'PENDIENTE'){
      value.check = isChecked;
      }else{
        value.check = false;
      }
    });
    console.log('cabecera0',this.listaNominasReg);

  }

  
}
