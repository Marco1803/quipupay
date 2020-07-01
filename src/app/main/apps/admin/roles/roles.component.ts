import { Component, OnInit } from '@angular/core';
import { Rol } from '../../../models/rol.model';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { RolesService } from './roles.service';
import { ModalEventRolComponent } from './modal-event-rol/modal-event-rol.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  listaRoles: Rol[] = []
  dialogRef: MatDialogRef<ModalEventRolComponent, any>;

  constructor(
    private _matDialog: MatDialog,
    public _roleService: RolesService
  ) { }

  ngOnInit(): void {
    this.obtenerRoles();
  }

  obtenerRoles() {
    this._roleService.obtenerRoles()
      .subscribe(
        (data) => {
          this.listaRoles = data;
          console.log(this.listaRoles)
        });
  }

  addEventRol(rol: Rol): void {
    if(rol === null) rol = new Rol();
    this.dialogRef = this._matDialog.open(ModalEventRolComponent, {
      panelClass: 'event-form-dialog',
      data: rol
    });

    this.dialogRef.afterClosed().subscribe(
      (result: Rol) => {
        this.obtenerRoles();
      });
  }

}
