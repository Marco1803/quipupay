import { Injectable } from '@angular/core';
import { AdminService } from '../admin.service';
import { Rol } from '../../../models/rol.model';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { NavigationService } from 'app/navigation/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService{

  
  constructor( 
    private _adminService: AdminService ,
    private _navigate: NavigationService
    ) {
     }

  obtenerRoles(){
    return this._adminService.roles_listar();
    //this.mantenimientoService.cargarUsuarios(BusquedaUsuario,identificador);
  }
  
  agregarRoles(NuevoRol: any){
    return this._adminService.roles_agregar(NuevoRol);
    //this.mantenimientoService.cargarUsuarios(BusquedaUsuario,identificador);
  }
  
  editarRoles(editarRol: Rol){
    return this._adminService.roles_editar(editarRol);
  }
  
  actualizarRoles(actualizarRol: Rol){
    return this._adminService.roles_actualizar(actualizarRol);
  }

}
