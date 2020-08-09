import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { ComercioGrupoModel } from 'app/main/models/ComercioGrupoModel.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-grupos-event',
  templateUrl: './modal-grupos-event.component.html',
  styleUrls: ['./modal-grupos-event.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalGruposEventComponent implements OnInit {

  //formato del modal
  action: string;
  dialogTitle: string;

  //Form
  grupoForm: FormGroup;

  //
  grupoDatos: ComercioGrupoModel[];

  constructor(
    public matDialogRef: MatDialogRef<ModalGruposEventComponent>, //Modal
    @Inject(MAT_DIALOG_DATA) public _data: ComercioGrupoModel, //datos para set en modal
    private formBuilder: FormBuilder, //form
    public _adminService: AdminService
  ) {

    this.inicializarForms();

    //Validacion de texto de modal
    if (_data.comerciogrupoid === undefined) {
      this.dialogTitle = 'Nuevo Grupo';
      this.action = 'Guardar';
    } else {
      this.dialogTitle = 'Editar Grupo';
      this.action = 'Modificar';
      this.editarGrupo(_data);
    }

  }

  //Inicializamos Form
  inicializarForms() {
    this.grupoForm = this.formBuilder.group({
      comerciogrupoid: ['', []],
      nombre: ['', []],
      nombrecontacto: ['', []],
      telefono: ['', []],
      correo: ['', []],
      estado: ['', []],
      fechacreacion: ['', []],
      fechaactualiza: ['', []]
    });
  }

  //Grabar | editar
  grabarGrupo() {

    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: "You won't be able to revert this!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, delete it!'
    // }).then((result) => {
    //   if (result.value) {
    //     Swal.fire(
    //       'Deleted!',
    //       'Your file has been deleted.',
    //       'success'
    //     )
    //   }
    // })


    this._adminService.editar_grupos(this.grupoForm.value).subscribe(
      (response : ComercioGrupoModel) => {
        console.log('llegue aqui');
        console.log(response);
        if(response.comerciogrupoid === undefined){
          this._adminService.agregar_grupos(this.grupoForm.value).subscribe(
            (response : ComercioGrupoModel)=> {
              this.matDialogRef.close(response);
            },
            
          );
          Swal.fire(
            'Registro guardado',
            '',
            'success'
          )
        }else{

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
              this._adminService.actualizar_grupos(this.grupoForm.value).subscribe(
                (response : ComercioGrupoModel) => {
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

    // this._adminService.agregar_grupos(this.grupoForm.value).subscribe(
    //   (response: ComercioGrupoModel) => {
    //     this.matDialogRef.close(response);
    //   },
    // );
  }

  //mostrar datos al editar
  editarGrupo(editarGrupo: ComercioGrupoModel) {
    console.log(editarGrupo.comerciogrupoid);
    this._adminService.editar_grupos(editarGrupo).subscribe(
      (response: ComercioGrupoModel) => {
        console.log(response);
        // this.grupoForm.get('nombre').setValue(response.nombre);
        // this.grupoForm.get('nombrecontacto').setValue(response.nombrecontacto);
        // this.grupoForm.get('telefono').setValue(response.telefono);
        // this.grupoForm.get('correo').setValue(response.correo);
        //this.grupoForm.get('comerciogrupoid').setValue(response.comerciogrupoid);
        this.grupoForm.setValue(response);
      }
    )
  }

  //Inicializamos
  ngOnInit(): void {
  }

  //Obtener Datos
  // obtenerGrupo() {
  //   this._adminService.obtener_grupos()
  //     .subscribe(
  //       (data) => {
  //         console.log(data);
  //         this.grupoDatos = data;
  //       });
  // }

}
