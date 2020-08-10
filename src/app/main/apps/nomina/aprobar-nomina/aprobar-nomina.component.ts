import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { AprobarNominaModel } from 'app/main/models/aprobarNominaModel.model';
import { NominaService } from '../nomina.service';
import swal from 'sweetalert2';
import { GetParametrosCognito } from 'app/services/getParametrosCognito.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aprobar-nomina',
  templateUrl: './aprobar-nomina.component.html',
  styleUrls: ['./aprobar-nomina.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})

export class AprobarNominaComponent implements OnInit {

  //Variables
  listaNominas: AprobarNominaModel[] = [];

  //token
  helper: JwtHelperService;
  comercio: string = "";

  constructor(
    public _nominasService: NominaService,
    public authService: GetParametrosCognito
  ) {
    //Datos Token
    this.helper = new JwtHelperService();
    let token = this.authService.getIdToken();
    const decodedToken = this.helper.decodeToken(token);
    let comercio = `${decodedToken["custom:IdComercio"]}`;
    let userLastName = `${decodedToken["custom:Apellidos"]}`;
    this.comercio = comercio;
  }

  ngOnInit(): void {
    this.obtenerNominas();
  }

  //Obtenemos Datos
  obtenerNominas() {
    swal.fire({
      title: 'Espere por favor  ...',
      onBeforeOpen: () => {
        swal.showLoading()
      }
    });
    this._nominasService.nominas_listar_aprobar()
      .subscribe(
        (data) => {
          this.listaNominas = data;
          swal.close();
        });
  }

  //Porcesos

  aprobarNomina(nominaId) {

    Swal.fire({
      title: 'Desea aprobar la nomina?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, aprobar!'
    }).then((result) => {
      if (result.value) {

        this._nominasService.nominas_aprobar(nominaId)
        .subscribe(
          (data) => {
            this.obtenerNominas();
            swal.close();
          });

        Swal.fire(
          'Registro actualizado!',
          '',
          'success'
        )
      }
    })




  }

  descartarNomina() {

  }

}
