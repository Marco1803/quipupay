import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';

import { TipoDocumento } from '../../../../models/tipoDocumento.model';
import { TipoGenero } from '../../../../models/tipoGenero.model';
import { Rol } from '../../../../models/rol.model';
import { AdminService } from '../../admin.service';
import { CmbGruposModel } from 'app/main/models/cmbGruposModel.model';
import { UsuarioCrearModel } from 'app/main/models/usuarioCrearModel.model';
import { ComercioUsuarioModel } from 'app/main/models/comercioUsuarioModel.model';
import { ComercioMovimientosModel } from 'app/main/models/comercioMovimientosModel.model';
import { ComercioListarModel } from 'app/main/models/comercioListarModel.model';



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
  cboGrupos: CmbGruposModel[] = [];

  listaDocumentos: TipoDocumento[] = [
    new TipoDocumento('1', "D.N.I"),
    new TipoDocumento('2', "Carnet de Extranjeria")
  ];

  listaGenero: TipoGenero[] = [
    new TipoGenero('M', "Masculino"),
    new TipoGenero('F', "Femenino")
  ];


  cboComercio: ComercioListarModel[] = [];
  cboRoles: Rol[] = [];


  constructor(
    public matDialogRef: MatDialogRef<ModalEventComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: UsuarioCrearModel,
    private formBuilder: FormBuilder,
    public _usuarioService: UsuariosService,
    public _adminService: AdminService
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

    //
    this.usuarioForm.get('comerciogrupoid').valueChanges.subscribe(
      (data: number) => {
        this._adminService.cmb_comercio_grupo_listar(data)
          .subscribe(
            (data: ComercioListarModel[]) => {
              let comercioDetalle = [];
              data.forEach((value, index) => {
                console.log('hola');
                console.log(data);
                let comuser: ComercioListarModel = new ComercioListarModel();
                comuser.comercioid = value.comercioid
                comuser.nombre = value.nombre
                comercioDetalle.push(comuser);
              });

              this.cboComercio = comercioDetalle;

            }
          );
      }
    );
  }

  inicializarForms() {
    this.usuarioForm = this.formBuilder.group({
      username: ['', []],
      email: ['', []],
      nombres: ['', []],
      apellidos: ['', []],
      tipodocumento: ['', []],
      nrodocumento: ['', []],
      comerciogrupoid: ['', []],
      rolid: ['', []],
      genero: ['', []],
      estado: ['', []],
      comercios: ['', []]
    });
  }

  

  ngOnInit() {
    this.obtenerRoles();

    this.obtenerGrupos();
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

    console.log(this.usuarioForm);


    let cabecera: UsuarioCrearModel = new UsuarioCrearModel();
    cabecera.apellidos = this.usuarioForm.get('apellidos').value;
    cabecera.comerciogrupoid = this.usuarioForm.get('comerciogrupoid').value;
    cabecera.email = this.usuarioForm.get('email').value;
    cabecera.estado = this.usuarioForm.get('estado').value;
    cabecera.genero = this.usuarioForm.get('genero').value;
    cabecera.nombres = this.usuarioForm.get('nombres').value;
    cabecera.nrodocumento = this.usuarioForm.get('nrodocumento').value;
    cabecera.rolid = this.usuarioForm.get('rolid').value;
    cabecera.tipodocumento = this.usuarioForm.get('tipodocumento').value;
    cabecera.username = this.usuarioForm.get('username').value;
    cabecera.comercios = [];
    this.usuarioForm.value.comercios.forEach((value, index) => {
      let comId = this.cboComercio.find(e => e.comercioid == value);
      cabecera.comercios.push(comId);
    });


    console.log('cabecera',cabecera);


    this._usuarioService.editarUsuario(this.usuarioForm.value).subscribe(
      (response: UsuarioCrearModel) => {
        console.log('empieza el if',response );
        if (response.username === null) {
          console.log('cabecera crear',cabecera);
          this._usuarioService.agregarUsuario(cabecera).subscribe(
            (response: UsuarioCrearModel) => {              
              console.log('status');
            console.log(response['statusCode']);

              console.log('crear',response );
              this.matDialogRef.close(response);
            },
          );
        } else {
          console.log('editar datos',this.usuarioForm.value)
          this._usuarioService.actualizarUsuario(cabecera).subscribe(
            (response: UsuarioCrearModel) => {
              console.log('editar',response );
              this.matDialogRef.close(response);
            },
          );
        }
      }
    )
  }



  /////

  editarUsuario(editarUsuario: UsuarioCrearModel) {
    console.log(editarUsuario);
    console.log(editarUsuario);
    this._usuarioService.editarUsuario(editarUsuario).subscribe(
      (response: UsuarioCrearModel) => {
        console.log('response');
        console.log(response);
        let ar = [];
        response.comercios.forEach((value, index) => {
          ar.push(value.comercioid);
        });

        console.log('dataaaaa',ar);

        this.usuarioForm.setValue(response);
        this.usuarioForm.get('comercios').setValue(ar);
      }
    )
  }

  // obtenerComercio(){
  //   this._usuarioService.obtenerCboComercio()
  //   .subscribe(
  //     (data) => {
  //       this.cboComercio = data;
  //       console.log(this.cboComercio)
  //     });
  // }

  obtenerRoles() {
    this._usuarioService.obtenerCboRoles()
      .subscribe(
        (data) => {
          this.cboRoles = data;
          console.log('roles')
          console.log(this.cboRoles)
        });
  }

  obtenerGrupos() {
    this._adminService.cboGrupos_listar()
      .subscribe(
        (data) => {
          console.log(data);
          this.cboGrupos = data;
          console.log(this.cboGrupos)
        });
  }



  change($event) {
    console.log(this.usuarioForm.value)
  }

}
