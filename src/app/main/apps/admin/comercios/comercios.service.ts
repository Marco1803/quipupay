import { Injectable } from '@angular/core';
import { AdminService } from '../admin.service';
import { Comercio } from '../../../models/comercio.model';


@Injectable({
  providedIn: 'root'
})
export class ComerciosService {

  constructor( private _adminService: AdminService) { }

  obtenerComercios(){
    return this._adminService.comercios_listar();
    //this.mantenimientoService.cargarUsuarios(BusquedaUsuario,identificador);
  }

  agregarComercio(NuevoComercio: any){
    return this._adminService.comercios_agregar(NuevoComercio);
    //this.mantenimientoService.cargarUsuarios(BusquedaUsuario,identificador);
  }

  editarComercios(editarComercio: Comercio){
    return this._adminService.comercio_editar(editarComercio);
  }

  actualizarComercio(actualizarComercio: Comercio){
    return this._adminService.comercio_actualizar(actualizarComercio);
  }
  
  
}

