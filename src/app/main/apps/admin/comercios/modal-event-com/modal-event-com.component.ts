import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalEventComponent } from '../../usuarios/modal-event/modal-event.component';
import { Comercio } from 'app/main/models/comercio.model';
import { ComerciosService } from '../comercios.service';

@Component({
  selector: 'app-modal-event-com',
  templateUrl: './modal-event-com.component.html',
  styleUrls: ['./modal-event-com.component.scss'],
  encapsulation:  ViewEncapsulation.None
})
export class ModalEventComComponent implements OnInit {

  action: string;
  dialogTitle: string;
  comercioForm: FormGroup;

  constructor(
    public matDialogRef: MatDialogRef<ModalEventComComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: Comercio,
    private formBuilder: FormBuilder,
    public _comercioService: ComerciosService
  ) { 
    this.inicializarForms();
    if (_data.id === undefined) {
      this.dialogTitle = 'Nuevo Comercio';
      this.action = 'Guardar';
    } else {
      this.dialogTitle = 'Editar Comercio';
      this.action = 'Modificar';
      this.editarComercio(_data);
    }
  }

  inicializarForms() {
    this.comercioForm = this.formBuilder.group({
      id: ['', []],
      nombre: ['', []],
      ruc: ['', []],
      iddepartamento: ['', []],
      idprovincia: ['', []],
      iddistrito: ['', []],
      direccion: ['', []],
      nombrecontacto: ['', []],
      telefono: ['', []],
      correo: ['', []],
      identificador: ['', []],
      estado: ['', []]
    });
  }

  ngOnInit(): void {
  }

  grabarComercio() {
    this._comercioService.editarComercios(this.comercioForm.value).subscribe(
      (response : Comercio) => {
        if(response.id === undefined){
          this._comercioService.agregarComercio(this.comercioForm.value).subscribe(
            (response : Comercio)=> {
              this.matDialogRef.close(response);
            },
          );
        }else{
          this._comercioService.actualizarComercio(this.comercioForm.value).subscribe(
            (response : Comercio) => {
              this.matDialogRef.close(response)
            },
          );
        }
      }
    )

    // this._comercioService.agregarComercio(this.comercioForm.value).subscribe(
    //   (response: Comercio) => {
    //     this.matDialogRef.close(response);
    //   },
    // );
  }


  editarComercio(editarComercios: Comercio) {
    this._comercioService.editarComercios(editarComercios).subscribe(
      (response: Comercio) => {
        this.comercioForm.setValue(response);
      }
    )
  }

}
