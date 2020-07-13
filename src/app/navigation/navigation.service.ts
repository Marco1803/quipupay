import { Injectable, InjectionToken } from '@angular/core';
import { Navigation } from '../main/models/navigation.model';
import { Observable } from 'rxjs';
import { ConfiguracionUrl } from '../configuracionUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetParametrosCognito } from '../services/getParametrosCognito.service';
import { UserLoginService } from '../main/pages/services/login-user.services';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  baseUrl     :ConfiguracionUrl;
  urlApi      :string;
  tipoUsuario :string;
  headers     :any;
  option      :any;
  perfil      :any;
  datagen     :any;
  idtoken     :string;
  idDevice    :string;
  tokenAcess  :'';

  //idtoken = localStorage.getItem(.indexOf("IdToken"));

  

  constructor(private httpClient: HttpClient, getParametroCognito : UserLoginService) { 
    this.baseUrl = new ConfiguracionUrl();
    this.idtoken = getParametroCognito.renovarToken();
    this.headers = new HttpHeaders({
     'Content-type':'application/json;charset=utf8',
      'Authorization': this.idtoken
     // 'DeviceKey' : this.idDevice,
     // 'AccessToken' : this.tokenAcess
   });
  }

  navigation_listar(){
    return this.httpClient.get<Navigation[]>(this.baseUrl.getUrlApiNav(), {headers:this.headers}).toPromise();
  }

  obtenerMenu() {
    return this.httpClient.get<Navigation[]>(this.baseUrl.getUrlApiNav(), {headers:this.headers}).pipe(
      map((data: any) => {
          return data;
      })
    );
  }

}
