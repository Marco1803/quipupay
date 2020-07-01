import { Injectable } from '@angular/core';
import { Navigation } from '../main/models/navigation.model';
import { Observable } from 'rxjs';
import { ConfiguracionUrl } from '../configuracionUrl';
import { HttpClient } from '@angular/common/http';
import { GetParametrosCognito } from '../services/getParametrosCognito.service';

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

  

  constructor(private httpClient: HttpClient, getParametroCognito : GetParametrosCognito) { 
    this.baseUrl = new ConfiguracionUrl();
    this.headers = new Headers({
     'Content-type':'application/json;charset=utf8',
      'Authorization': getParametroCognito.getIdToken()
     // 'DeviceKey' : this.idDevice,
     // 'AccessToken' : this.tokenAcess
   });
  }

  navigation_listar(){
    return this.httpClient.get<Navigation[]>(this.baseUrl.getUrlApiNav(), {headers:this.headers}).toPromise();
  }


}
