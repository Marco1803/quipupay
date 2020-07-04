import { Injectable, Pipe } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { ConfiguracionUrl } from '../../../configuracionUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { HttpClient, RequestOptions } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { Comercio } from 'app/main/models/comercio.model';
import { Rol } from '../../models/rol.model';
import { UserLoginService } from '../../pages/services/login-user.services';







@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl     :ConfiguracionUrl;
  urlApi      :string;
  tipoUsuario :string;
  headers     :any;
  option      :any;
  perfil      :any;
  datagen     :any;
  idtoken     :string;
  idDevice    :string;
  tokenAcess  :string;

   constructor(private httpClient: HttpClient, getParametroCognito : UserLoginService) { 
     this.baseUrl = new ConfiguracionUrl();
     this.idtoken = getParametroCognito.renovarToken();
     this.headers = new HttpHeaders({
      'Content-type':'application/json;charset=utf8',
      'Authorization': this.idtoken
      // 'DeviceKey' : this.idDevice,
      // 'AccessToken' : this.tokenAcess
    });
    //   this.option = new RequestOptions({headers:this.headers});
    }
  

  
  // Usuarios
  usuarios_listar(): Observable<Usuario[]>{
    console.log('id token ')
    console.log(this.idtoken)
    return this.httpClient.get<Usuario[]>(this.baseUrl.getUrlApi()+'usuarios', {headers:this.headers});
  }

  usuarios_agregar(nuevoUsuario: any): Observable<Usuario>{
    return this.httpClient.post<Usuario>(this.baseUrl.getUrlApi()+'usuarios', nuevoUsuario, {headers:this.headers});
  }
  
  usuario_editar(editarUsuario: Usuario){
    return this.httpClient.get<Usuario>(this.baseUrl.getUrlApi()+'usuarios/'+editarUsuario.username, {headers:this.headers});
  }

  usuario_actualizar(actualizarUsuario: Usuario){
    return this.httpClient.put<Usuario>(this.baseUrl.getUrlApi()+'usuarios', actualizarUsuario, {headers:this.headers});
  }


  // Comercios
  comercios_listar(): Observable<Comercio[]>{
    console.log('id token ')
    console.log(this.idtoken)
    return this.httpClient.get<Comercio[]>(this.baseUrl.getUrlApi()+'comercios', {headers:this.headers});
  }

  comercios_agregar(nuevoComercio: any): Observable<Comercio>{
    return this.httpClient.post<Comercio>(this.baseUrl.getUrlApi()+'comercios', nuevoComercio, {headers:this.headers});
  }

  comercio_editar(editarUsuario: Comercio){
    return this.httpClient.get<Comercio>(this.baseUrl.getUrlApi()+'comercios/'+editarUsuario.id, {headers:this.headers});
  }

  comercio_actualizar(actualizarComercio: Comercio){
    return this.httpClient.put<Comercio>(this.baseUrl.getUrlApi()+'comercios/'+actualizarComercio.id, actualizarComercio, {headers:this.headers});
  }

  // Roles
  roles_listar(): Observable<Rol[]>{
    console.log('id token ')
    console.log(this.idtoken)
    return this.httpClient.get<Rol[]>(this.baseUrl.getUrlApi()+'roles', {headers:this.headers});
  }
         
  roles_agregar(nuevoRol: any): Observable<Rol>{
    return this.httpClient.post<Rol>(this.baseUrl.getUrlApi()+'roles', nuevoRol, {headers:this.headers});
  }
      
  roles_editar(editarRol: Rol){
    return this.httpClient.get<Rol>(this.baseUrl.getUrlApi()+'roles/'+editarRol.id, {headers:this.headers});
  }
      
  roles_actualizar(actualizarRol: Rol){
    return this.httpClient.put<Rol>(this.baseUrl.getUrlApi()+'roles/'+actualizarRol.id, actualizarRol, {headers:this.headers});
  }

  //Obtener Combo Comercio

  cboComercios_listar(): Observable<Comercio[]>{
    return this.httpClient.get<Comercio[]>(this.baseUrl.getUrlApi()+'comercios', {headers:this.headers});
  }

  //Obtener Combo Roles
   
  cboRoles_listar(): Observable<Rol[]>{
    return this.httpClient.get<Rol[]>(this.baseUrl.getUrlApi()+'roles', {headers:this.headers});
  }


}

