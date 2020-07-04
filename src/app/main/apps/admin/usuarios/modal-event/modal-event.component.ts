import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';
import { Usuario } from 'app/main/models/usuario.model';
import { TipoDocumento } from '../../../../models/tipoDocumento.model';
import { TipoGenero } from '../../../../models/tipoGenero.model';
import { Comercio } from '../../../../models/comercio.model';
import { Rol } from '../../../../models/rol.model';



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

  listaDocumentos: TipoDocumento[] = [
    new TipoDocumento(1, "D.N.I"),
    new TipoDocumento(2, "Carnet de Extranjeria")
  ];
  
  listaGenero: TipoGenero[] = [
    new TipoGenero('M', "Masculino"),
    new TipoGenero('F', "Femenino")
  ];
  

  cboComercio: Comercio[] = [];
  cboRoles: Rol[] = [];


  constructor(
    public matDialogRef: MatDialogRef<ModalEventComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: Usuario,
    private formBuilder: FormBuilder,
    public _usuarioService: UsuariosService
  ) {
    this.inicializarForms();
    if (_data.username === undefined) {
      this.dialogTitle = 'Nuevo Usuario';
      this.action = 'Guardar';
    } else {
      this.dialogTitle = 'Editar Usuario';
      this.action = 'Modificar';
      this.editarUsuario(_data);
    }
  }

  inicializarForms() {
    this.usuarioForm = this.formBuilder.group({
      username: ['', []],
      email: ['', []],
      nombres: ['', []],
      apellidos: ['', []],
      tipodocumento: ['', []],
      nrodocumento: ['', []],
      idcomercio: ['', []],
      idrol: ['', []],
      genero: ['', []]
    });
  }

  ngOnInit(): void {
this.obtenerRoles();
this.obtenerComercio();
  }

  grabarUsuario() {
    // this._usuarioService.editarUsuario(this.usuarioForm.value).subscribe(
    //   (response : Usuario) => {
    //     if(response.username === undefined){
    //       this._usuarioService.agregarUsuario(this.usuarioForm.value).subscribe(          
    //         (response : Usuario) => {
    //           this.matDialogRef.close(response);
    //         },
    //       ); 
    //     }else{
    //       this._usuarioService.actualizarUsuario(this.usuarioForm.value).subscribe(          
    //         (response : Usuario) => {
    //           this.matDialogRef.close(response);
    //         },
    //       ); 
    //     }
    //   }
    // )

    this._usuarioService.agregarUsuario(this.usuarioForm.value).subscribe(
      (response: Usuario) => {
        
        this.matDialogRef.close(response);
      },
    );
  }

  editarUsuario(editarUsuario: Usuario) {
    this._usuarioService.editarUsuario(editarUsuario).subscribe(
      (response: Usuario) => {
        this.usuarioForm.setValue(response);
      }
    )
  }

  obtenerComercio(){
    this._usuarioService.obtenerCboComercio()
    .subscribe(
      (data) => {
        this.cboComercio = data;
        console.log(this.cboComercio)
      });
  }

  obtenerRoles(){
    this._usuarioService.obtenerCboRoles()
    .subscribe(
      (data) => {
        this.cboRoles = data;
        console.log(this.cboRoles)
      });
  }

}
