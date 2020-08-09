import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Rol } from '../../../models/rol.model';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { RolesService } from './roles.service';
import { ModalEventRolComponent } from './modal-event-rol/modal-event-rol.component';
import { NavigationService } from '../../../../navigation/navigation.service';
import { ModalEventRolMenuComponent } from './modal-event-rol-menu/modal-event-rol-menu.component';
import swal from 'sweetalert2';
import { fuseAnimations } from '@fuse/animations';

//fechas
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
//checkbox
import { ThemePalette } from '@angular/material/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CmbEstadoReporteModel } from 'app/main/models/cmbEstadoReporteModel.model';

import { UsuariosService } from '../../admin/usuarios/usuarios.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GetParametrosCognito } from 'app/services/getParametrosCognito.service';
import { ComercioListarModel } from 'app/main/models/comercioListarModel.model';


const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
// fin fechas

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  //fechas
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})

export class RolesComponent implements OnInit {

  //Variables
  listaRoles: Rol[] = []

  //Modal
  dialogRef: MatDialogRef<ModalEventRolComponent, any>;
  dialogRefMenu: MatDialogRef<ModalEventRolMenuComponent, any>;

  //Busqueda
  cboComercio   : ComercioListarModel[] = [];
  busquedaForm: FormGroup;

  //Token
  helper: JwtHelperService;
  idComercio: string = "";

  constructor(
    private _matDialog: MatDialog,
    public _roleService: RolesService,
    public _navigationService: NavigationService,
    private formBuilder: FormBuilder,
    public _usuarioService: UsuariosService,
    public authService: GetParametrosCognito
  ) {
     //Datos Token
 this.helper        = new JwtHelperService(); 
 let token          = this.authService.getIdToken();
 const decodedToken = this.helper.decodeToken(token);
 let idComercio     = `${ decodedToken["custom:IdComercio"]}`;
 this.idComercio      = idComercio;
   }

  ngOnInit(): void {
    this.obtenerRoles();
    this.obtenerComercio();
    this.initBuscador();
  }

   //Iniciualizando Forms
   initBuscador() {
    this.busquedaForm = this.formBuilder.group({
      fechaIni: new FormControl(moment(new Date(), 'DD MM').format('YYYY-MM-DD')),
      fechaFin: new FormControl(moment(new Date(), 'DD MM').format('YYYY-MM-DD')),
      cboCom: new FormControl(this.idComercio , null)
    });
  }

  //Obtenemos Datos
  obtenerRoles() {
    swal.fire({
      title: 'Espere por favor  ...',
      onBeforeOpen: () => {
        swal.showLoading()
      }
    });
    this._roleService.obtenerRoles()
      .subscribe(
        (data) => {
          this.listaRoles = data;
          swal.close();
        });
  }

  //Agregar
  addEventRol(rol: Rol): void {
    if (rol === null) rol = new Rol();
    this.dialogRef = this._matDialog.open(ModalEventRolComponent, {
      panelClass: 'event-form-dialog',
      data: rol
    });
    this.dialogRef.afterClosed().subscribe(
      (result: Rol) => {
        this.obtenerRoles();
      });
  }

  //enlace a Modal
  // addEventShowMenu(rol: Rol) {
  //   this.dialogRefMenu = this._matDialog.open(ModalEventRolMenuComponent, {
  //     panelClass: 'event-form-dialog',
  //     data: rol
  //   });

  //   this.dialogRefMenu.afterClosed().subscribe(
  //     (result: Rol) => {
  //       this.obtenerRoles();
  //     });
  // }

   //busqueda
   obtenerComercio() {
    this._usuarioService.obtenerCboComercio()
      .subscribe(
        (data) => {
          this.cboComercio = data;
          console.log(this.cboComercio[0]['nombre'])
          //console.log(data);
        });

  }

  ObtenerBusquedaNomina() {
      let jsonsend={
        fechaIni: moment(this.busquedaForm.get('fechaIni').value).format("DD/MM/YYYY"),
        fechaFin: moment(this.busquedaForm.get('fechaFin').value).format("DD/MM/YYYY"),
        cboCom : this.busquedaForm.get('cboCom').value
      }
         console.log(jsonsend);
    }
  


  //Validaciones
  validarNombre(id): string {
    return id.is_admin === "1" ? "Adminstrador" : "No Adminsitrador";
  }

}
