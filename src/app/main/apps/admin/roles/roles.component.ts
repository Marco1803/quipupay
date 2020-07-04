import { Component, OnInit } from '@angular/core';
import { Rol } from '../../../models/rol.model';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { RolesService } from './roles.service';
import { ModalEventRolComponent } from './modal-event-rol/modal-event-rol.component';
import { NavigationService } from '../../../../navigation/navigation.service';
import { ModalEventRolMenuComponent } from './modal-event-rol-menu/modal-event-rol-menu.component';
import { Navigation } from 'app/main/models/navigation.model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  listaRoles: Rol[] = []
  dialogRef: MatDialogRef<ModalEventRolComponent, any>;
  dialogRefMenu: MatDialogRef<ModalEventRolMenuComponent, any>;

  constructor(
    private _matDialog: MatDialog,
    public _roleService: RolesService,
    public _navigationService: NavigationService
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

  addEventShowMenu(rol: Rol){
    this.dialogRefMenu = this._matDialog.open(ModalEventRolMenuComponent, {
      panelClass: 'event-form-dialog',
      data: rol
    });

    this.dialogRefMenu.afterClosed().subscribe(
      (result: Rol) => {
        this.obtenerRoles();
      });
  } 
  
  validarNombre(id): string {
   return id.is_admin==="1" ? "Adminstrador" : "No Adminsitrador";
  }

}
