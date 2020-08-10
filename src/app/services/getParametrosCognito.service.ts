import { Injectable } from '@angular/core';
import { ConfiguracionUrl } from '../configuracionUrl';


@Injectable({
  providedIn: 'root'
})
export class GetParametrosCognito {
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

  

  constructor() { 
  }


  getIdToken():string{
    let idToken: string;
    for (let index = 0; index < localStorage.length; index++) {
        let posicion = localStorage.key(index).indexOf("idToken");
        if(posicion != -1){
            let key = localStorage.key(index);
            idToken = localStorage.getItem(key);
        }

    }
    console.log('');
    return idToken;
}
}
