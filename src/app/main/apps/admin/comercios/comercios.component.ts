import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalEventComponent } from '../usuarios/modal-event/modal-event.component';
import { ComerciosService } from './comercios.service';
import { Comercio } from '../../../models/comercio.model';
import { ComerciosModule } from './comercios.module';
import { ModalEventComComponent } from './modal-event-com/modal-event-com.component';
//import { Comercio } from 'app/main/models/comercio.model';


@Component({
  selector: 'app-comercios',
  templateUrl: './comercios.component.html',
  styleUrls: ['./comercios.component.scss']
})
export class ComerciosComponent implements OnInit {

  listaComercio: Comercio[]= [];
  dialogRef: MatDialogRef<ModalEventComComponent, any>;

  constructor(
    private _matDialog: MatDialog,
    public _comercioService: ComerciosService
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios() 
  }

  obtenerUsuarios() {
    this._comercioService.obtenerComercios()
      .subscribe(
        (data) => {
          this.listaComercio = data;
          console.log(this.listaComercio)
        });
  }

  addEventCom(comercio: Comercio): void{
    if(comercio === null) comercio = new Comercio();
    this.dialogRef = this._matDialog.open(ModalEventComComponent, {
      panelClass: 'event-form-dialog',
      data: comercio
    });

    this.dialogRef.afterClosed().subscribe(
      (result: Comercio) => {
        this.obtenerUsuarios();
      });

  }


}
