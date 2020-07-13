import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { AprobarNominaModel } from 'app/main/models/aprobarNominaModel.model';
import { AprobarNominaService } from './aprobar-nomina.service';
import { NominaService } from '../nomina.service';

@Component({
  selector: 'app-aprobar-nomina',
  templateUrl: './aprobar-nomina.component.html',
  styleUrls: ['./aprobar-nomina.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations,
})
export class AprobarNominaComponent implements OnInit {

  listaNominas: AprobarNominaModel[]= [];

  constructor(
    public _nominasService: NominaService
  ) { }

  ngOnInit(): void {
    this.obtenerNominas();
  }

  obtenerNominas() {
    this._nominasService.nominas_listar()
      .subscribe(
        (data) => {
          this.listaNominas = data;
          console.log(this.listaNominas)
        });
  }

}
