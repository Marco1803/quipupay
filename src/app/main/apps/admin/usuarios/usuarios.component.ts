import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { UsuariosService } from './usuarios.service';
import { List } from 'lodash';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalEventComponent } from './modal-event/modal-event.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  listaUsuarios: Usuario[] = []
  dialogRef: MatDialogRef<ModalEventComponent, any>;

  constructor(
    private _matDialog: MatDialog,
    public _usuarioService: UsuariosService
  ) {
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this._usuarioService.obtenerUsuarios()
      .subscribe(
        (data) => {
          this.listaUsuarios = data;
          console.log(this.listaUsuarios)
        });
  }


  addEvent(usuario: Usuario): void {
    if(usuario === null) usuario = new Usuario();
    this.dialogRef = this._matDialog.open(ModalEventComponent, {
      width: '75%',
      data: usuario
    });

    this.dialogRef.afterClosed().subscribe(
      (result: Usuario) => {
          console.log(result);
      });
  }

 
}
