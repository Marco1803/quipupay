import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { forEach } from 'lodash';

@Component({
  selector: 'app-carganomina',
  templateUrl: './carganomina.component.html',
  styleUrls: ['./carganomina.component.scss']
})
export class CarganominaComponent implements OnInit {

  // data: [][];
  datos: [][];
  constructor() { }

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

      if (datos.length>0) {
        datos.forEach(element => {  
          console.log("recorrido")  
          console.log(element)
        });

        console.log(datos.length);

        for (let i = 0; i < datos.length; i++) {
          
          console.log ("Block statement execution no." + i);           

          console.log(datos[i]["Trans ID"]);
        
        }

      }      

      var myJsonString = JSON.stringify(datos);

      console.log(datos);
      console.log(myJsonString);

      // let x = this.data.slice(1);
      // console.log(x);

    };

    reader.readAsBinaryString(target.files[0]);

  }

}
