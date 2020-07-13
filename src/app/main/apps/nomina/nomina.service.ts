import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfiguracionUrl } from '../../../configuracionUrl';
import { UserLoginService } from '../../pages/services/login-user.services';
import { NominaModel } from '../../models/nominaModel.model';
import { Usuario } from 'app/main/models/usuario.model';
import { Comercio } from '../../models/comercio.model';
import { NominaOriginalModel } from 'app/main/models/nominaOriginalModel.model';
import { NominaErrorModel } from 'app/main/models/nominaErrorModel.model';

@Injectable({
  providedIn: 'root'
})
export class NominaService {

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

  constructor(
    private httpClient: HttpClient, getParametroCognito: UserLoginService) {
    this.baseUrl = new ConfiguracionUrl();
    this.idtoken = getParametroCognito.renovarToken();
    this.headers = new HttpHeaders({
      'Content-type': 'application/json;charset=utf8',
      'Authorization': this.idtoken
      // 'DeviceKey' : this.idDevice,
      // 'AccessToken' : this.tokenAcess
    });
  }

  nominas_listar(): Observable<NominaModel[]>{
    console.log('id token ')
    console.log(this.idtoken)
    return this.httpClient.get<NominaModel[]>(this.baseUrl.getUrlApiNomina()+'nominacarga', {headers:this.headers});
  }

  nominas_listar_original(nominaId,tipo): Observable<NominaOriginalModel[]>{
    console.log('id token ')
    console.log(this.idtoken)
    return this.httpClient.get<NominaOriginalModel[]>(this.baseUrl.getUrlApiNomina()+'nomina/'+nominaId+'/'+tipo,{headers:this.headers});
  }

  nominas_listar_error(nominaId,tipo): Observable<NominaErrorModel[]>{
    console.log('id token ')
    console.log(this.idtoken)
    return this.httpClient.get<NominaErrorModel[]>(this.baseUrl.getUrlApiNomina()+'nomina/'+nominaId+'/'+tipo,{headers:this.headers});
  }



}
