import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalEventComponent } from './modal-event/modal-event.component';
import swal from 'sweetalert2';
import { fuseAnimations } from '@fuse/animations';
//modelos
import { ComercioListarModel } from 'app/main/models/comercioListarModel.model';
import { UsuarioListarModel } from '../../../models/usuarioListarModel.model';
//servicios
import { GetParametrosCognito } from 'app/services/getParametrosCognito.service';
import { UsuariosService } from './usuarios.service';
//fechas
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
//checkbox
import { ThemePalette } from '@angular/material/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  //fechas
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})

export class UsuariosComponent implements OnInit {

  listaUsuarios: UsuarioListarModel[] = [];
  displayedColumns = ['nombre_usuario', 'nombre', 'apellido', 'email',
  'rol', 'estado', 'acciones'];
  dataSource :  MatTableDataSource<UsuarioListarModel>;
   //tabla
   totalPag : number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  //Variables
  // listaUsuarios: UsuarioListarModel[] = []
  dialogRef: MatDialogRef<ModalEventComponent, any>;

  //Busqueda
  cboComercio: ComercioListarModel[] = [];
  busquedaForm: FormGroup;

  //Token
  helper: JwtHelperService;
  idComercio: string = "";
  comercioId = '';


  constructor(
    private _matDialog: MatDialog,
    public _usuarioService: UsuariosService,
    private formBuilder: FormBuilder,
    public authService: GetParametrosCognito
  ) {
    //Datos Token
    this.helper = new JwtHelperService();
    let token = this.authService.getIdToken();
    const decodedToken = this.helper.decodeToken(token);
    let idComercio = `${decodedToken["custom:IdComercio"]}`;
    this.idComercio = idComercio;
  }

  ngOnInit(): void {

    //paginado
    this.dataSource = new MatTableDataSource(this.listaUsuarios);
    this.dataSource.paginator = this.paginator;

    this.obtenerComercio();
    this.initBuscador();
  }

  //Iniciualizando Forms
  initBuscador() {
    this.busquedaForm = this.formBuilder.group({
      // fechaIni: new FormControl(moment(new Date(), 'DD MM').format('YYYY-MM-DD')),
      // fechaFin: new FormControl(moment(new Date(), 'DD MM').format('YYYY-MM-DD')),
      username: new FormControl('', null),
    });
  }

  ngAfterViewInit() {
    let variable = this.paginator.nextPage;
    console.log(variable);
    

}

  //Enlace a Modal
  addEventUsu(usuario: UsuarioListarModel): void {
    if (usuario === null) usuario = new UsuarioListarModel();
    this.dialogRef = this._matDialog.open(ModalEventComponent, {
      panelClass: 'event-form-dialog',
      data: usuario
    });

    this.dialogRef.afterClosed().subscribe(
      (result: UsuarioListarModel) => {
        this.ObtenerBusquedaNomina();
      });
  }

  //busqueda
  obtenerComercio() {
    this._usuarioService.obtenerCboComercio()
      .subscribe(
        (data) => {
          this.cboComercio = data;
        });

  }

  ObtenerBusquedaNomina() {
    let comercioId = localStorage.getItem('comercioId');
    console.log(comercioId);
    this.comercioId = comercioId;

    let jsonsend = {
      // fechaIni: moment(this.busquedaForm.get('fechaIni').value).format("DD/MM/YYYY"),
      // fechaFin: moment(this.busquedaForm.get('fechaFin').value).format("DD/MM/YYYY"),
      username: this.busquedaForm.get('username').value,
      cboCom: this.comercioId
    }
    console.log(jsonsend);

    swal.fire({
      title: 'Espere por favor  ...',
      onBeforeOpen: () => {
        swal.showLoading()
      }
    });
    this._usuarioService.obtenerUsuarios(jsonsend)
      .subscribe(
        (data) => {
          console.log(data);
          this.listaUsuarios = data;
          this.totalPag = this.listaUsuarios.length
          this.dataSource = new MatTableDataSource(this.listaUsuarios ); 
          this.dataSource.paginator = this.paginator;
          swal.close();
        });
  }




}
