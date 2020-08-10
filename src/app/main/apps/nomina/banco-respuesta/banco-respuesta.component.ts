import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { AprobarNominaModel } from 'app/main/models/aprobarNominaModel.model';
import { NominaService } from '../nomina.service';
import swal from 'sweetalert2';
import * as XLSX from 'xlsx';

//exportar txt
import { Observable, of } from "rxjs";
import { DescargaBancoBbvaModel, DescargaBancoBbvaDetalleModel } from 'app/main/models/DescargaBancoBbvaModel.model';
import { BancoRespuestaService } from './banco-respuesta.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GetParametrosCognito } from 'app/services/getParametrosCognito.service';
import { CargaBancoModel } from 'app/main/models/cargaBancoModel.model';
import Swal from 'sweetalert2';
//Fin Exportar TXT

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
  selector: 'app-banco-respuesta',
  templateUrl: './banco-respuesta.component.html',
  styleUrls: ['./banco-respuesta.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class BancoRespuestaComponent implements OnInit {

  //Variables
  listaNominas: AprobarNominaModel[] = [];
  docUpload : any ;
  idNominaRespuesta : any ;
  header: subida_header;
  detail: subida_detail;
  helper: JwtHelperService;
  comercioData: string = "";
  userNameData: string = "";


  constructor(
    public _bancoRespuestaService: BancoRespuestaService,
    public _nominasService: NominaService,
    public authService: GetParametrosCognito
  ) { 
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
    this.obtenerNominas();
  }

  //Obtenemos Datos
  obtenerNominas() {
    swal.fire({
      title: 'Espere por favor  ...',
      onBeforeOpen: () => {
        swal.showLoading()
      }
    });
    this._nominasService.nominas_listar_banco_respuesta()
      .subscribe(
        (data) => {
          this.listaNominas = data;
          swal.close();
          console.log(this.listaNominas);
        });
  }

  subirArchivo(event, banco){

    switch (banco) {
      case 'BBVA':
        this.openFileBBVA(event);
        break;
      case 'BCP':
        this.onFileChangeBCP(event);
        break;
      default:
      // code block
    }


  }

  //Metodo Subir archivo txt
  openFileBBVA(event) {
    let input = event.target;
    for (var index = 0; index < input.files.length; index++) {
      let reader = new FileReader();
      reader.onload = () => {

        // Inicio BBVA

        // this 'text' is the content of the file
        var text = reader.result;
        //var jeison: any = JSON.parse(text);
        let detalle = [];
        this.docUpload =[];
        let data = text.toString().split("\n");
        //console.log(text);
        //console.log(data[0]);
        let cabecera: CargaBancoModel = new CargaBancoModel();
        let cont = 0;

        // cabecera.sec = ++cont;
        // cabecera.comercioid = this.comercioData;
        // cabecera.bancoid= 'BBVA';
        // cabecera.modo = 'Archivo';
        // cabecera.NroDocumento = '';
        // cabecera.estado = data[0].toString().substring(98, 101);
        // cabecera.observacion = data[0].toString().substring(101, 131);
        // let referencia  = data[0].toString().substring(51, 76);
        // let totalRegistros = data[0].toString().substring(76, 82);
        // let validacionPertenencia = data[0].toString().substring(82, 83);
        // let valorControl = data[0].toString().substring(83, 98);
        // let indicadorProceso = data[0].toString().substring(98, 101);
        // let descripcion = data[0].toString().substring(101, 131);
        // let filler = data[0].toString().substring(131, 151);
        // let id = data[0].toString().substring(1, 3);
        // let nominaOriId = data[0].toString().substring(4, 23);
        // let bancoId = '';
        // let cantTotal = '';
        // let chechsum = '';
        // let comercioId = '';
        // let estado = '';
        // let fecha_creacion = '';
        // let fecha_modificacion = '';
        // let flagExoneraITF = '';
        // let montoTotal= '';
        // let nominaId = '';
        // let tipoCuentaCargo= '';


        //console.log(cabecera);
        let contDet = 0;
        data.forEach((value, index) => {
          if(index >= 1){
            let detail: CargaBancoModel= new CargaBancoModel();

            detail.modo = 'Archivo';
            detail.nroDocumento = value.toString().substring(93, 105);
            detail.codEstado= value.toString().substring(227,229);
            detail.estado = '';
            detail.observacion = value.toString().substring(229, 259);
            // let tipoRegistro= value.toString().substring(0, 3);
            // let doiTipo= value.toString().substring(3, 4);
            // let doiNumero= value.toString().substring(4,16);
            // let tipoAbono= value.toString().substring(16, 17);
            // let numeroCuentaAbono= value.toString().substring(17, 37);
            // let nombreBeneficiario= value.toString().substring(37, 77);
            // let importeAbonar= value.toString().substring(77, 92);
            // let TipoDocumento= value.toString().substring(92, 93);
            // let numeroDocumento= value.toString().substring(93, 105);
            // let abonoGrupal= value.toString().substring(105, 106);
            // let referencia= value.toString().substring(106, 146);
            // let indicadorAviso= value.toString().substring(146, 147);
            // let medioAviso= value.toString().substring(147, 197);
            // let personaContacto= value.toString().substring(197, 227);
            // let indicadorProceso= value.toString().substring(227, 229);
            // let descripcion= value.toString().substring(229, 259);
            // let filler= value.toString().substring(259, 277);
            // let id = value.toString().substring(0, 3);
            // let nominaOriId= value.toString().substring(0, 3);
            // let bancoId = '';
            // let correlativoDocProv= '';
            // let fechaVencimiento= '';
            // let flgInterbancario= '';
            // let flgValidaIDC= '';
            // let modalidadPago= '';
            // let monedaAbonar= '';
            // let nominaId= '';
            // let num_sec= '';
            // let referenciaEmpresa= '';
            // let tipoCuenta= '';
            // let tipoPersona= '';


            detalle.push(detail);
          }
        });

        //cabecera.children = detalle;
        detalle = detalle;
        //console.table(cabecera);

        console.log(detalle);
        this.docUpload =  JSON.stringify(detalle) ;
        console.log(this.docUpload );

        // Fin  BBVA
      }
      reader.readAsText(input.files[index]);

    };


  }

  //Fin Metodo Subir archivo txt

  //Inicio Subir Excel BCP

  onFileChangeBCP(evt: any) {

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


      // this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      let datos = XLSX.utils.sheet_to_json(wb.Sheets[nombrehoja[0]]);

      var keys = Object.keys(datos[0]);
      console.log(keys);
      
      let cabecera: CargaBancoModel = new CargaBancoModel();
      let cont = 0;
      let detalle = [];
      this.docUpload =[];


      // cabecera.sec = ++cont;
      // cabecera.comercioid = this.comercioData.toString();
      // cabecera.bancoid= '0002';
      // cabecera.modo = '';
      // cabecera.NroDocumento = '';
      // cabecera.estado = '';
      // cabecera.observacion = '';

      // this.header.nombre = nombreExcelReal;
      // this.header.descripcion = "";
      // this.header.usuario_carga = this.userNameData;
      // this.header.monto_origin = 0.00;
      // this.header.comercio = this.comercioData;
      let contDet = 0;
      // cabecera.children = []

      if (datos.length > 0) {
        for (let i = 0; i < datos.length; i++) {
          let detail: CargaBancoModel= new CargaBancoModel();

          detail.modo = 'Archivo';
          detail.nroDocumento = (datos[i]["Documento - Número"] == undefined) ? "" : datos[i]["Documento - Número"];
          detail.codEstado= '';
          detail.estado = (datos[i]["Estado"] == undefined) ? "" : datos[i]["Estado"];
          detail.observacion = (datos[i]["Observación"] == undefined) ? "" : datos[i]["Observación"];
          // this.detail = new subida_detail();
          // this.detail.num_line = (datos[i]["#"] == undefined) ? "" : datos[i]["#"];
          // this.detail.transactionid = (datos[i]["Trans ID"] == undefined) ? "" : datos[i]["Trans ID"];
          // this.detail.username = (datos[i]["User name"] == undefined) ? "" : datos[i]["User name"];
          // this.detail.account = (datos[i]["Account number"] == undefined) ? "" : datos[i]["Account number"];
          // this.detail.amount = (datos[i]["Amount"] == undefined) ? "" : datos[i]["Amount"];
          // this.detail.currency = (datos[i]["Currency"] == undefined) ? "" : datos[i]["Currency"];
          // this.detail.amount_usd = (datos[i]["Amount (USD) ▾"] == undefined) ? "" : datos[i]["Amount (USD) ▾"];
          // this.detail.merchant = (datos[i]["Merchant"] == undefined) ? "" : datos[i]["Merchant"];
          // this.detail.customer_name = (datos[i]["Customer name"] == undefined) ? "" : datos[i]["Customer name"];
          // this.detail.account_type = (datos[i]["Account type"] == undefined) ? "" : datos[i]["Account type"];
          // console.log(datos[i]);
          // this.detail.account_numer = (datos[i]["Account number2"] == undefined) ? "" : datos[i]["Account number2"];
          // this.detail.dni = (datos[i]["DNI"] == undefined) ? "" : datos[i]["DNI"];
          // this.detail.department = (datos[i]["Department"] == undefined) ? "" : datos[i]["Department"];
          // this.detail.cci_numb = (datos[i]["CCI Number"] == undefined) ? "" : datos[i]["CCI Number"];
          // this.detail.reference = (datos[i]["Reference"] == undefined) ? "" : datos[i]["Reference"];
          // this.detail.kycyn = (datos[i]["KYCyn"] == undefined) ? "" : datos[i]["KYCyn"];
          // this.detail.correo = (datos[i]["correo"] == undefined) ? "" : datos[i]["correo"];
          // this.detail.celular = (datos[i]["celular"] == undefined) ? "" : datos[i]["celular"];
          // this.detail.date = (datos[i]["Date"] == undefined) ? "" : datos[i]["Date"];
          detalle.push(detail);

        }
        swal.close();
      }
      var myJsonString = JSON.stringify(detalle);
      console.log( detalle);
      this.docUpload = detalle;
      //this.cargar_nomina(this.header);

      // let x = this.data.slice(1);
      // console.log(x);

    };

    reader.readAsBinaryString(target.files[0]);

  }

  //Fin Subir Excel BCP



  
  //Actualizar datos
  actualizarNominas(idNomina) {


    Swal.fire({
      title: 'Desea cargar y actualizar la respuesta del banco?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.value) {

        console.log(this.docUpload,idNomina);
        this._nominasService.actualizarNominas(this.docUpload,idNomina)
          .subscribe(
            (data) => {
              alert('Actualizado');
              swal.close();
              console.log(this.listaNominas);
            });
        Swal.fire(
          'Registro actualizado!',
          '',
          'success'
        )
      }
    })







    

  }




}
