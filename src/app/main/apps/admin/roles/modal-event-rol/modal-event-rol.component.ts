import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from '../../../../models/rol.model';
import { RolesService } from '../roles.service';
import { AdminOptionModel } from '../../../../models/adminOptionModel.model';

@Component({
  selector: 'app-modal-event-rol',
  templateUrl: './modal-event-rol.component.html',
  styleUrls: ['./modal-event-rol.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalEventRolComponent implements OnInit {

  //modal
  action: string;
  dialogTitle: string;

  //form
  rolForm: FormGroup;

  //Combosbox
  adminOption: AdminOptionModel[] = [
    new AdminOptionModel('1', "Si"),
    new AdminOptionModel('0', "No")
  ];

  constructor(
    public matDialogRef: MatDialogRef<ModalEventRolComponent>,//modal
    @Inject(MAT_DIALOG_DATA) public _data: Rol, //modal
    private formBuilder: FormBuilder, //form
    public _rolService: RolesService
  ) {
    this.inicializarForms();
    if (_data.id === undefined) {
      this.dialogTitle = 'Nuevo Rol';
      this.action = 'Guardar';
    } else {
      this.dialogTitle = 'Editar Rol';
      this.action = 'Modificar';
      this.editarRol(_data);
    }
  }

  inicializarForms() {
    this.rolForm = this.formBuilder.group({
      id: ['', []],
      nombre: ['', []],
      nombre_vista: ['', []],
      is_admin: ['', []],
      estado: ['', []],
      fechacreacion: ['', []]
    });
  }

  ngOnInit(): void {
  }

  grabarRol() {
    this._rolService.editarRoles(this.rolForm.value).subscribe(
      (response: Rol) => {
        if (response.id === undefined) {
          this._rolService.agregarRoles(this.rolForm.value).subscribe(
            (response: Rol) => {
              this.matDialogRef.close(response);
            },
          );
        } else {
          this._rolService.actualizarRoles(this.rolForm.value).subscribe(
            (response: Rol) => {
              this.matDialogRef.close(response)
            },
          );
        }
      }
    )
  }

  editarRol(editarRol: Rol) {
    this._rolService.editarRoles(editarRol).subscribe(
      (response: Rol) => {
        this.rolForm.setValue(response);
      }
    )
  }

}
