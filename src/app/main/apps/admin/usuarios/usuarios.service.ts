import { Injectable } from '@angular/core';
import { AdminService } from '../admin.service';
import { Usuario } from '../../../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor( private _adminService: AdminService) { }

obtenerUsuarios(){
  return this._adminService.usuarios_listar();
  //this.mantenimientoService.cargarUsuarios(BusquedaUsuario,identificador);
}

agregarUsuario(NuevoUsuario: any){
  return this._adminService.usuarios_agregar(NuevoUsuario);
  //this.mantenimientoService.cargarUsuarios(BusquedaUsuario,identificador);
}

editarUsuario(editarUsuario: Usuario){
  return this._adminService.usuario_editar(editarUsuario);
}

actualizarUsuario(actualizarUsuario: Usuario){
  return this._adminService.usuario_actualizar(actualizarUsuario);
}

}
