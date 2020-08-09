import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComerciosService } from '../comercios.service';
import { AdminService } from '../../admin.service';
import { ComercioGrupoModel } from 'app/main/models/ComercioGrupoModel.model';
import { DepartamentoModel } from 'app/main/models/departamentoModel.model';
import { ProvinciaModel } from 'app/main/models/provinciaModel.model';
import { DistritoModel } from 'app/main/models/distritoModel.model';
import { ComercioMovimientosModel } from 'app/main/models/comercioMovimientosModel.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-event-com',
  templateUrl: './modal-event-com.component.html',
  styleUrls: ['./modal-event-com.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalEventComComponent implements OnInit {

  action: string;
  dialogTitle: string;
  comercioForm: FormGroup;
  comercioGrupo: ComercioGrupoModel[];
  idComercioEnvio: any;
  cboDpto:DepartamentoModel[]=[];
  cboProvincia:ProvinciaModel[]=[];
  cboDistrito:DistritoModel[]=[];

  constructor(
    public matDialogRef: MatDialogRef<ModalEventComComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: ComercioMovimientosModel,
    private formBuilder: FormBuilder,
    public _comercioService: ComerciosService,
    public _adminService: AdminService
  ) {
    this.inicializarForms();
    if (_data.comercioid === undefined) {
      this.dialogTitle = 'Nuevo Comercio';
      this.action = 'Guardar';
    } else {
      this.dialogTitle = 'Editar Comercio';
      this.action = 'Modificar';
      this.editarComercio(_data);
    }

        //
        this.comercioForm.get('iddepartamento').valueChanges.subscribe(
          (idDept: any) => {
            console.log(idDept);
            this._adminService.cmb_provincia_listar(idDept)
              .subscribe(
                (data: ProvinciaModel[]) => {
                  this.cboProvincia = data;
                }
              );
          }
        );

        //
        this.comercioForm.get('idprovincia').valueChanges
        .subscribe(
          (data: any) => {
            this._adminService.cmb_distrito_listar(this.comercioForm.get('iddepartamento').value,data)
              .subscribe(
                (data: DistritoModel[]) => {
                  this.cboDistrito = data;
                }
              );
          }
        );
  }

  inicializarForms() {
    this.comercioForm = this.formBuilder.group({
      comercioid: ['', []],
      nombre: ['', []],
      ruc: ['', []],
      comerciogrupoid: ['', []],
      iddepartamento: ['', []],
      idprovincia: ['', []],
      iddistrito: ['', []],
      direccion: ['', []],
      nombrecontacto: ['', []],
      telefono: ['', []],
      correo: ['', []],
      estado: ['', []]
    });
  }

  ngOnInit(): void {
    this.obtenerGrupo();
    this.obtenerDpto();
  }


  grabarComercio() {
    console.log(this.comercioForm.value);
    this._comercioService.editarComercios(this.comercioForm.value).subscribe(
      (response: ComercioMovimientosModel) => {
        if (response.comercioid === undefined) {
          this._comercioService.agregarComercio(this.comercioForm.value).subscribe(
            (response: ComercioMovimientosModel) => {
              this.matDialogRef.close(response);
            },
          );
          Swal.fire(
            'Registro guardado',
            '',
            'success'
          )
        } else {

          Swal.fire({
            title: 'Desea actualizar el registro?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, actualizar!'
          }).then((result) => {
            if (result.value) {

              this._comercioService.actualizarComercio(this.comercioForm.value).subscribe(
                (response: ComercioMovimientosModel) => {
                  this.matDialogRef.close(response)
                },
              );
              Swal.fire(
                'Registro actualizado!',
                '',
                'success'
              )
            }
          })



        }
      }
    )

    // this._comercioService.agregarComercio(this.comercioForm.value).subscribe(
    //   (response: Comercio) => {
    //     this.matDialogRef.close(response);
    //   },
    // );
  }


  editarComercio(editarComercios: ComercioMovimientosModel) {
    console.log('edit');
    console.log(editarComercios);
    this._comercioService.editarComercios(editarComercios).subscribe(
      (response: ComercioMovimientosModel) => {
        console.log('respuesta');
        console.log(response);
        // this.comercioForm.get('comercioid').setValue(response.comercioid);
        this.comercioForm.setValue(response);
      }
    )
  }

  //Obtener Datos
  obtenerGrupo() {
    this._adminService.obtener_grupos()
      .subscribe(
        (data) => {
          console.log(data);
          console.log(data);
          this.comercioGrupo = data;
        });
  }

  //Obtener Departamento
  obtenerDpto() {
    this._adminService.obtener_dpto()
      .subscribe(
        (data) => {
          console.log('departamento');
          console.log(data);
          this.cboDpto = data;
        });
  }

}
