import { Injectable } from '@angular/core';
import { AdminService } from '../admin.service';
import { UsuarioListarModel } from '../../../models/usuarioListarModel.model';
import { UsuarioCrearModel } from 'app/main/models/usuarioCrearModel.model';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor( private _adminService: AdminService) { }

obtenerUsuarios(jsonsend){
  return this._adminService.usuarios_listar(jsonsend);
  //this.mantenimientoService.cargarUsuarios(BusquedaUsuario,identificador);
}

agregarUsuario(cabecera: UsuarioCrearModel){
  return this._adminService.usuarios_agregar(cabecera);
}

editarUsuario(editarUsuario: UsuarioCrearModel){
  return this._adminService.usuario_editar(editarUsuario);
}

actualizarUsuario(actualizarUsuario: UsuarioCrearModel){
  return this._adminService.usuario_actualizar(actualizarUsuario);
}

// Obtener Combo Comercio

obtenerCboComercio(){
  return this._adminService.cboComercios_listar();
}

// Obtener Combo Rol

obtenerCboRoles(){
  return this._adminService.cboRoles_listar();
}

}
