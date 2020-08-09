import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfiguracionUrl } from 'app/configuracionUrl';
import { UserLoginService } from 'app/main/pages/services/login-user.services';
import { Observable } from 'rxjs';
import { ReportesModel } from 'app/main/models/reportesModel.model';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

    //Variables
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
        // 'DeviceKey'    : this.idDevice,
        // 'AccessToken'  : this.tokenAcess
      });
    }

    reportes_listar(any): Observable<ReportesModel[]> {
      return this.httpClient.post<ReportesModel[]>(this.baseUrl.getUrlApi() + 'reporte_banco/' ,any, { headers: this.headers });
    }

}
