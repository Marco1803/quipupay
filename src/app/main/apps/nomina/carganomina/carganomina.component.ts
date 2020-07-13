import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { forEach } from 'lodash';
import { int } from 'aws-sdk/clients/datapipeline';
import { CarganominaService } from './carganomina.service';

export class subida_header {
  nombre:string;
  descripcion:string;
  usuario_carga:string;
  monto_origin:number;
  comercio:string;
  detail:subida_detail[] = [];
}

export class subida_detail {
  num_line:string;
  transactionid:string;
  username:string;
  account:string;
  amount:string;
  currency:string;
  amount_usd:string;
  merchant:string;
  customer_name:string;
  account_type:string;
  account_numer:string;
  dni:string;
  department:string;
  cci_numb:string;
  reference:string;
  kycyn:string;
  correo:string;
  celular:string;
  date:string;
}


@Component({
  selector: 'app-carganomina',
  templateUrl: './carganomina.component.html',
  styleUrls: ['./carganomina.component.scss']
})
export class CarganominaComponent implements OnInit {

  // data: [][];
  datos: [][];
  header:subida_header;
  detail:subida_detail;
  constructor(public _cargarnominaService: CarganominaService) { 
    this.header = new subida_header();
  }

  ngOnInit(): void {

    // const excel = XLSX.readFile("onFileChange");

    // var nombrehoja = excel.SheetNames;
    // let datos = XLSX.utils.sheet_to_json(excel.Sheets[nombrehoja[0]]);
    //   console.log(datos);

  }

  

  onFileChange(evt: any) {
    const target : DataTransfer =  <DataTransfer>(evt.target);
    
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      // const wsname : string = wb.SheetNames[0];

      // const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      // console.log(ws);

      var nombrehoja = wb.SheetNames;

      // this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      let datos = XLSX.utils.sheet_to_json(wb.Sheets[nombrehoja[0]]);
      this.header.nombre="marco";
      this.header.descripcion="test";
      this.header.monto_origin=0.00;
      this.header.comercio="1";
      if (datos.length>0) {
        for (let i = 0; i < datos.length; i++) {
          this.detail = new subida_detail();
          this.detail.num_line          = (datos[i]["#"] == undefined)?"":datos[i]["#"];
          this.detail.transactionid     = (datos[i]["Trans ID"] == undefined)?"":datos[i]["Trans ID"];
          this.detail.username          = (datos[i]["User name"] == undefined)?"":datos[i]["User name"];
          this.detail.account           = (datos[i]["Account number"] == undefined)?"":datos[i]["Account number"];
          this.detail.amount            = (datos[i]["Amount"] == undefined)?"":datos[i]["Amount"];
          this.detail.currency          = (datos[i]["Currency"] == undefined)?"":datos[i]["Currency"];
          this.detail.amount_usd        = (datos[i]["Amount (USD) ▾"] == undefined)?"":datos[i]["Amount (USD) ▾"];
          this.detail.merchant          = (datos[i]["Merchant"] == undefined)?"":datos[i]["Merchant"];
          this.detail.customer_name     = (datos[i]["Customer name"] == undefined)?"":datos[i]["Customer name"];
          this.detail.account_type      = (datos[i]["Account type"] == undefined)?"":datos[i]["Account type"];
          this.detail.account_numer     = (datos[i]["Account number"] == undefined)?"":datos[i]["Account number"];
          this.detail.dni               = (datos[i]["DNI"] == undefined)?"":datos[i]["DNI"];
          this.detail.department        = (datos[i]["Department"] == undefined)?"":datos[i]["Department"];
          this.detail.cci_numb          = (datos[i]["CCI Number"] == undefined)?"":datos[i]["CCI Number"];
          this.detail.reference         = (datos[i]["Reference"] == undefined)?"":datos[i]["Reference"];
          this.detail.kycyn             = (datos[i]["KYCyn"] == undefined)?"":datos[i]["KYCyn"];
          this.detail.correo            = (datos[i]["correo"] == undefined)?"":datos[i]["correo"];
          this.detail.celular           = (datos[i]["celular"] == undefined)?"":datos[i]["celular"];
          this.detail.date              = (datos[i]["Date"] == undefined)?"":datos[i]["Date"];
          this.header.detail.push(this.detail);
          
        }
      }      
      this.cargar_nomina(this.header);
      var myJsonString = JSON.stringify(this.header);

      // let x = this.data.slice(1);
      // console.log(x);

    };

    reader.readAsBinaryString(target.files[0]);

  }

  cargar_nomina(nominaoriginal:subida_header){
    this._cargarnominaService.carganomina_cargar(nominaoriginal).subscribe(
      result => {
        console.log(result);
      },
      error => {console.log(error);
      });
  }
}
