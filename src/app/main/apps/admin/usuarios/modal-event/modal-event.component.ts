import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';
import { Usuario } from 'app/main/models/usuario.model';
import { TipoDocumento } from '../../../../models/tipoDocumento.model';
import { TipoGenero } from '../../../../models/tipoGenero.model';



@Component({
  selector: 'app-modal-event',
  templateUrl: './modal-event.component.html',
  styleUrls: ['./modal-event.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalEventComponent implements OnInit {

  action: string;
  dialogTitle: string;
  usuarioForm: FormGroup;

  listaDocumentos : TipoDocumento[] = [
    new TipoDocumento(null,":: Seleccione ::"),
    new TipoDocumento(1,"D.N.I"),
    new TipoDocumento(2,"Carnet de Extranjeria")
  ]

  listaGenero : TipoGenero[] = [
    new TipoGenero(null,":: Seleccione ::"),
    new TipoGenero('M',"Masculino"),
    new TipoGenero('F',"Femenino")
  ]


  constructor(
    public matDialogRef: MatDialogRef<ModalEventComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: Usuario,
    private formBuilder : FormBuilder,
    public _usuarioService: UsuariosService
  ) { 

    console.log(_data);
    if(_data.username === undefined){
      this.editarUsuario(_data);
    }
  }

ngOnInit(){
  this.inicializarForms();
}

inicializarForms(){
  this.usuarioForm = this.formBuilder.group({
    username      : new FormControl(),
    email         : new FormControl(),
    nombres       : new FormControl(),
    apellidos     : new FormControl(),
    tipodocumento : new FormControl(),
    nrodocumento  : new FormControl(),
    idcomercio    : new FormControl(),
    idrol         : new FormControl(),
    genero        : new FormControl()
  }); 
}

grabarUsuario(){
  this._usuarioService.editarUsuario(this.usuarioForm.value).subscribe(
    (response : Usuario) => {
      if(response.username === undefined){
        this._usuarioService.agregarUsuario(this.usuarioForm.value).subscribe(          
          (response : Usuario) => {
            this.matDialogRef.close(response);
          },
        ); 
      }else{
        this._usuarioService.actualizarUsuario(this.usuarioForm.value).subscribe(          
          (response : Usuario) => {
            this.matDialogRef.close(response);
          },
        ); 
      }
    }
  )



}

editarUsuario(editarUsuario : Usuario){
  this._usuarioService.editarUsuario(editarUsuario).subscribe(
    (response : Usuario) => {
      this.usuarioForm.setValue(response);
    }
  )
}


}
