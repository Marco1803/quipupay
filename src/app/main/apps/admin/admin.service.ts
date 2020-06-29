import { Injectable, Pipe } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { ConfiguracionUrl } from '../../../configuracionUrl';
import { HttpClient } from '@angular/common/http';
//import { HttpClient, RequestOptions } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';







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
  idtoken     :'';
  idDevice    :'';
  tokenAcess  :'';

   constructor(private httpClient: HttpClient) { 
     this.baseUrl = new ConfiguracionUrl();
     this.headers = new Headers({
      'Content-type':'application/json;charset=utf8'
      // 'Authorization': this.idtoken,
      // 'DeviceKey' : this.idDevice,
      // 'AccessToken' : this.tokenAcess
    });
    //   this.option = new RequestOptions({headers:this.headers});
    }
  

  

  usuarios_listar(): Observable<Usuario[]>{
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
}

