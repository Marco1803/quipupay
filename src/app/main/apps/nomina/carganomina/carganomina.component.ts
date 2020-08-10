import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { forEach } from 'lodash';
import { int } from 'aws-sdk/clients/datapipeline';
import { CarganominaService } from './carganomina.service';
import { RespuestaExcelModel } from 'app/main/models/respuestaExcelModel.model';
import swal from 'sweetalert2';
import { GetParametrosCognito } from 'app/services/getParametrosCognito.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { fuseAnimations } from '@fuse/animations';

export class subida_header {
  nombre: string;
  descripcion: string;
  usuario_carga: string;
  monto_origin: number;
  comercio: string;
  detail: subida_detail[] = [];
}

export class subida_detail {
  num_line: string;
  transactionid: string;
  username: string;
  account: string;
  amount: string;
  currency: string;
  amount_usd: string;
  merchant: string;
  customer_name: string;
  account_type: string;
  account_numer: string;
  dni: string;
  department: string;
  cci_numb: string;
  reference: string;
  kycyn: string;
  correo: string;
  celular: string;
  date: string;
}


@Component({
  selector: 'app-carganomina',
  templateUrl: './carganomina.component.html',
  styleUrls: ['./carganomina.component.scss'],
  animations : fuseAnimations
})
export class CarganominaComponent implements OnInit {

  respuestaExcel: RespuestaExcelModel[] = [];
  show: string;
  showBtn: string;
  helper: JwtHelperService;
  comercioData: string = "";
  userNameData: string = "";
  comercioId = '';


  datos: [][];
  header: subida_header;
  detail: subida_detail;
  constructor(
    public _cargarnominaService: CarganominaService,
    public authService: GetParametrosCognito) 
    {
    //Datos Token
     this.helper        = new JwtHelperService(); 
     let token          = this.authService.getIdToken();
     const decodedToken = this.helper.decodeToken(token);
     let comercioData   = `${ decodedToken["custom:IdComercio"]}`;
     let usernameData   = `${ decodedToken["cognito:username"]}`;
     this.comercioData  = comercioData;
     this.userNameData  = usernameData;

    this.header = new subida_header();
  }

  ngOnInit(): void {

    // const excel = XLSX.readFile("onFileChange");

    // var nombrehoja = excel.SheetNames;
    // let datos = XLSX.utils.sheet_to_json(excel.Sheets[nombrehoja[0]]);
    //   console.log(datos);
    this.show= 'false';
    this.showBtn= 'false';
  }



  onFileChange(evt: any) {

    let comercioId = localStorage.getItem('comercioId');
    this.comercioId =  comercioId;


 
    swal.fire({
      title: 'Espere por favor  ...',
      onBeforeOpen: () => {
        swal.showLoading()
      }
    });


    //console.log(evt);
    const target: DataTransfer = <DataTransfer>(evt.target);
    let nombreExcel: string = evt.target.value;
    let nombreExcelReal = nombreExcel.substring(12, nombreExcel.length)

    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      // const wsname : string = wb.SheetNames[0];

      // const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      // console.log(ws);

      var nombrehoja = wb.SheetNames;
      //console.log(evt.target.value);
      this.header = new subida_header();
      
      // this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      let datos = XLSX.utils.sheet_to_json(wb.Sheets[nombrehoja[0]]);
      //console.log('impresion ', datos[0]);
      //console.log(this.header);
//debugger;
      this.header.nombre = nombreExcelReal;
      this.header.descripcion = "";
      this.header.usuario_carga = this.userNameData;
      this.header.monto_origin = 0.00;
      this.header.comercio = this.comercioId;
      if (datos.length > 0) {
        for (let i = 0; i < datos.length; i++) {
          this.detail = new subida_detail();
          this.detail.num_line = (datos[i]["#"] == undefined) ? "" : datos[i]["#"];
          this.detail.transactionid = (datos[i]["Trans ID"] == undefined) ? "" : datos[i]["Trans ID"];
          this.detail.username = (datos[i]["User name"] == undefined) ? "" : datos[i]["User name"];
          this.detail.account = (datos[i]["Account number"] == undefined) ? "" : datos[i]["Account number"];
          this.detail.amount = (datos[i]["Amount"] == undefined) ? "" : datos[i]["Amount"];
          this.detail.currency = (datos[i]["Currency"] == undefined) ? "" : datos[i]["Currency"];
          this.detail.amount_usd = (datos[i]["Amount (USD) ▾"] == undefined) ? "" : datos[i]["Amount (USD) ▾"];
          this.detail.merchant = (datos[i]["Merchant"] == undefined) ? "" : datos[i]["Merchant"];
          this.detail.customer_name = (datos[i]["Customer name"] == undefined) ? "" : datos[i]["Customer name"];
          this.detail.account_type = (datos[i]["Account type"] == undefined) ? "" : datos[i]["Account type"];
          console.log(datos[i]);
          this.detail.account_numer = (datos[i]["Payment Account"] == undefined) ? "" : datos[i]["Payment Account"];
          this.detail.dni = (datos[i]["DNI"] == undefined) ? "" : datos[i]["DNI"];
          this.detail.department = (datos[i]["Department"] == undefined) ? "" : datos[i]["Department"];
          this.detail.cci_numb = (datos[i]["CCI Number"] == undefined) ? "" : datos[i]["CCI Number"];
          this.detail.reference = (datos[i]["Reference"] == undefined) ? "" : datos[i]["Reference"];
          this.detail.kycyn = (datos[i]["KYCyn"] == undefined) ? "" : datos[i]["KYCyn"];
          this.detail.correo = (datos[i]["correo"] == undefined) ? "" : datos[i]["correo"];
          this.detail.celular = (datos[i]["celular"] == undefined) ? "" : datos[i]["celular"];
          this.detail.date = (datos[i]["Date"] == undefined) ? "" : datos[i]["Date"];
          this.header.detail.push(this.detail);

        }
        swal.close();
      }
      var myJsonString = JSON.stringify(this.header);
      console.log(this.header);
      this.showBtn= 'true';
      //this.cargar_nomina(this.header);

      // let x = this.data.slice(1);
      // console.log(x);

    };

    reader.readAsBinaryString(target.files[0]);

  }

  cargar_nomina() {
    this.show='true';
    this.showBtn = 'false';
    if (this.header != null) {
    
      this._cargarnominaService.carganomina_cargar1(this.header).subscribe(
        result => {

          console.log('llegamos' + result['UUID'] + result);
          console.log(result);
          if (result['UUID'] != null) {
            console.log('llegamos parte 2' + result['UUID']);

            swal.fire(
              'Nro de proceso en ejecucion: '+result['UUID'] + '\n' ,
              'Espere su validación ...',
              'success'
            )
            this.Respuesta(result['UUID']);
          } else {
            console.log('error');
          }

          //progress bar


          //progress bar

          //this.respuestaExcel = result;
          //alert('Numero de Nomina cargada: '+result['UUID']+ '\n' + 'Validadas: '+result['registroVal']+ '\n' + 'Errores: '+ result['registroErr']);
          //alert('Numero de Nomina cargada: '+result['UUID']);

        },
        error => {
          console.log(error);
        });
    } else {
      alert('error');
    }

  }

  Respuesta(result) {
    let dataCargada = '';
    let datacargada2 = [];


        if (dataCargada == '' || dataCargada == null) {
         
          //alert('no hay nada' );
          setTimeout(() => {
            this._cargarnominaService.carganomina_cargar_Final(result) .subscribe(
              (data) => {
                if(data == null){
                  //alert('nulo' );
                  dataCargada = '';


                  this.Respuesta(result)
                }else{
                  //alert('hay dato' );
                  this.show='false';
                  this.showBtn = 'true';
                  dataCargada = '1';
                  console.log(data);
                  datacargada2=data;
                  console.log(datacargada2);
                  swal.fire(
                    'Id de Nomina Nro: '+data['id']+ '\n' ,
                    'Validadas: '+data['num_valida']+ ' - ' + 'Errores: '+ data['num_error'],
                    'success'
                  )
                
                }
                
            });
          }, 2000);
        }else{
          alert('alerta');
        }

  }




}

