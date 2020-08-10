import { Injectable, Pipe } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfiguracionUrl } from '../../../configuracionUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioListarModel } from '../../models/usuarioListarModel.model';
import { ComercioGrupoModel } from 'app/main/models/ComercioGrupoModel.model';
import { Rol } from '../../models/rol.model';
import { UserLoginService } from '../../pages/services/login-user.services';
import { CmbGruposModel } from 'app/main/models/cmbGruposModel.model';
import { UsuarioCrearModel } from 'app/main/models/usuarioCrearModel.model';
import { DepartamentoModel } from 'app/main/models/departamentoModel.model';
import { ProvinciaModel } from 'app/main/models/provinciaModel.model';
import { DistritoModel } from 'app/main/models/distritoModel.model';
import { ComercioToolBarModel } from 'app/main/models/comercioToolBarModel.model';
import { ComercioListarModel } from 'app/main/models/comercioListarModel.model';
import { ComercioMovimientosModel } from 'app/main/models/comercioMovimientosModel.model';
//import { map } from 'rxjs/operators';
//import { HttpClient, RequestOptions } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  baseUrl: ConfiguracionUrl;
  urlApi: string;
  tipoUsuario: string;
  headers: any;
  option: any;
  perfil: any;
  datagen: any;
  idtoken: string;
  idDevice: string;
  tokenAcess: string;

  constructor(private httpClient: HttpClient, getParametroCognito: UserLoginService) {
    this.baseUrl = new ConfiguracionUrl();
    this.idtoken = getParametroCognito.renovarToken();
    this.headers = new HttpHeaders({
      'Content-type': 'application/json;charset=utf8',
      'Authorization': this.idtoken
      // 'DeviceKey' : this.idDevice,
      // 'AccessToken' : this.tokenAcess
    });
    //   this.option = new RequestOptions({headers:this.headers});
  }



  //::::::::::::::::::::::::::::::: USUARIOS ::::::::::::::::::::::::::::::://
  usuarios_listar(jsonsend): Observable<UsuarioListarModel[]> {
    console.log('id token ')
    console.log(this.idtoken)
    return this.httpClient.get<UsuarioListarModel[]>(this.baseUrl.getUrlApiUsuarios() + 'usuarios?username='+jsonsend['username'], { headers: this.headers });
    
  }

  usuarios_agregar(cabecera: UsuarioCrearModel): Observable<UsuarioCrearModel> {
    return this.httpClient.post<UsuarioCrearModel>(this.baseUrl.getUrlApiUsuarios() + 'usuarios', cabecera, { headers: this.headers });
  }

  usuario_editar(editarUsuario: UsuarioCrearModel) {
    return this.httpClient.get<UsuarioCrearModel>(this.baseUrl.getUrlApiUsuarios() + 'usuarios/' + editarUsuario.username, { headers: this.headers });
  }

  usuario_actualizar(actualizarUsuario: UsuarioCrearModel) {
    return this.httpClient.put<UsuarioCrearModel>(this.baseUrl.getUrlApiUsuarios() + 'usuarios/'+ actualizarUsuario.username, actualizarUsuario, { headers: this.headers });
  }


  //::::::::::::::::::::::::::::::: COMERCIOS ::::::::::::::::::::::::::::::://
  comercios_listar(): Observable<ComercioListarModel[]> {
    console.log('id token ')
    console.log(this.idtoken)
    return this.httpClient.get<ComercioListarModel[]>(this.baseUrl.getUrlApi() + 'comercios', { headers: this.headers });
  }

  comercios_agregar(nuevoComercio: any): Observable<ComercioMovimientosModel> {
    return this.httpClient.post<ComercioMovimientosModel>(this.baseUrl.getUrlApi() + 'comercios', nuevoComercio, { headers: this.headers });
  }

  comercio_editar(editarUsuario: ComercioMovimientosModel) {
    return this.httpClient.get<ComercioMovimientosModel>(this.baseUrl.getUrlApi() + 'comercios/' + editarUsuario.comercioid, { headers: this.headers });
  }

  comercio_actualizar(actualizarComercio: ComercioMovimientosModel) {
    return this.httpClient.put<ComercioMovimientosModel>(this.baseUrl.getUrlApi() + 'comercios/' + actualizarComercio.comercioid, actualizarComercio, { headers: this.headers });
  }

  obtener_grupos(): Observable<ComercioGrupoModel[]> {
    return this.httpClient.get<ComercioGrupoModel[]>(this.baseUrl.getUrlApi() + 'comerciosgrupo', { headers: this.headers });
  }

  obtener_dpto(): Observable<DepartamentoModel[]> {
    return this.httpClient.get<DepartamentoModel[]>(this.baseUrl.getUrlApi() + 'ubigeo/departamento', { headers: this.headers });
  }
    
  cmb_provincia_listar(idDept: any): Observable<ProvinciaModel[]> {
    return this.httpClient.get<ProvinciaModel[]>(this.baseUrl.getUrlApi() + 'ubigeo/provincia/'+idDept, { headers: this.headers });
  }

  cmb_distrito_listar(idDept: any, idProv: any): Observable<DistritoModel[]> {
    return this.httpClient.get<DistritoModel[]>(this.baseUrl.getUrlApi() + 'ubigeo/distrito/'+idDept+'/'+idProv, { headers: this.headers });
  }



  //::::::::::::::::::::::::::::::: ROLES ::::::::::::::::::::::::::::::://
  roles_listar(): Observable<Rol[]> {
    console.log('id token ')
    console.log(this.idtoken)
    return this.httpClient.get<Rol[]>(this.baseUrl.getUrlApi() + 'roles', { headers: this.headers });
  }

  roles_agregar(nuevoRol: any): Observable<Rol> {
    return this.httpClient.post<Rol>(this.baseUrl.getUrlApi() + 'roles', nuevoRol, { headers: this.headers });
  }

  roles_editar(editarRol: Rol) {
    return this.httpClient.get<Rol>(this.baseUrl.getUrlApi() + 'roles/' + editarRol.id, { headers: this.headers });
  }

  roles_actualizar(actualizarRol: Rol) {
    return this.httpClient.put<Rol>(this.baseUrl.getUrlApi() + 'roles/' + actualizarRol.id, actualizarRol, { headers: this.headers });
  }


  //::::::::::::::::::::::::::::::: COMERCIO GRUPOS ::::::::::::::::::::::::::::::://
  obtenerComerciosGrupos(): Observable<ComercioGrupoModel[]> {
    // console.log('id token ')
    // console.log(this.idtoken)
    return this.httpClient.get<ComercioGrupoModel[]>(this.baseUrl.getUrlApi() + 'comerciosgrupo', { headers: this.headers });
  }

  agregar_grupos(nuevoGrupo: any): Observable<ComercioGrupoModel> {
    return this.httpClient.post<ComercioGrupoModel>(this.baseUrl.getUrlApi() + 'comerciosgrupo', nuevoGrupo, { headers: this.headers });
  }

  editar_grupos(editarGrupo: ComercioGrupoModel) {
    return this.httpClient.get<ComercioGrupoModel>(this.baseUrl.getUrlApi() + 'comerciosgrupo/' + editarGrupo.comerciogrupoid, { headers: this.headers });
  }

  actualizar_grupos(actualizarGrupo: ComercioGrupoModel) {
    return this.httpClient.put<ComercioGrupoModel>(this.baseUrl.getUrlApi() + 'comerciosgrupo/' + actualizarGrupo.comerciogrupoid, actualizarGrupo, { headers: this.headers });
  }

  //::::::::::::::::::::::::::::::: CARGADO DE COMBOS ::::::::::::::::::::::::::::::://

  //Obtener Combo Comercio
  cboComercios_listar(): Observable<ComercioListarModel[]> {
    return this.httpClient.get<ComercioListarModel[]>(this.baseUrl.getUrlApi() + 'comercios', { headers: this.headers });
  }

  //Obtener Combo Roles
  cboRoles_listar(): Observable<Rol[]> {
    return this.httpClient.get<Rol[]>(this.baseUrl.getUrlApi() + 'roles_activos', { headers: this.headers });
  }

    //Obtener Combo Grupos
    cboGrupos_listar(): Observable<CmbGruposModel[]> {
      return this.httpClient.get<CmbGruposModel[]>(this.baseUrl.getUrlApi() + 'comerciosgrupo_activos', { headers: this.headers });
    }

        //Obtener Combo Comercio de grupo
        cmb_comercio_grupo_listar(idgrupo: number): Observable<ComercioListarModel[]> {
          return this.httpClient.get<ComercioListarModel[]>(this.baseUrl.getUrlApi() + 'comercios_porgrupo/'+idgrupo, { headers: this.headers });
        }

        obtenerCboComercioToolBar(userCom): Observable<ComercioToolBarModel[]>{
          return this.httpClient.get<ComercioToolBarModel[]>(this.baseUrl.getUrlApi() + 'comercios_byuser/'+ userCom, { headers: this.headers });
        }

        obtenerCboComercioToolBar2(userCom): Observable<ComercioToolBarModel[]>{
          return this.httpClient.get<ComercioToolBarModel[]>(this.baseUrl.getUrlApi() + 'usuarios_auth/'+ userCom, { headers: this.headers });
        }


}

