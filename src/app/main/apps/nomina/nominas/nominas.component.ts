import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { NominaService } from '../nomina.service';
import { takeUntil } from 'rxjs/internal/operators';

import { FormBuilder, FormGroup } from '@angular/forms';
import { NominaModel } from '../../../models/nominaModel.model';
import { Usuario } from '../../../models/usuario.model';
import { Comercio } from '../../../models/comercio.model';


@Component({
  selector: 'app-nominas',
  templateUrl: './nominas.component.html',
  styleUrls: ['./nominas.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations,
})
export class NominasComponent{

    listaNominas: NominaModel[]= [];

  constructor(
    public _nominasService: NominaService
  ) { 
  
  }

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




