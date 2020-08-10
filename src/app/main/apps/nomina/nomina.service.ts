import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { subida_header } from './carganomina/carganomina.component';
import { ConfiguracionUrl } from '../../../configuracionUrl';
import { UserLoginService } from '../../pages/services/login-user.services';
import { NominaModel } from '../../models/nominaModel.model';

import { NominaOriginalModel } from 'app/main/models/nominaOriginalModel.model';
import { NominaErrorModel } from 'app/main/models/nominaErrorModel.model';
import { DescargaBancoBbvaModel, DescargaBancoBbvaDetalleModel } from 'app/main/models/DescargaBancoBbvaModel.model';
import { CargaBancoModel } from 'app/main/models/cargaBancoModel.model';

@Injectable({
  providedIn: 'root'
})

export class NominaService {

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

  //::::::::::::::::::::::::::::::: APROBAR NOMINA ::::::::::::::::::::::::::::::://
  nominas_listar_aprobar(): Observable<NominaModel[]> {
    return this.httpClient.get<NominaModel[]>(this.baseUrl.getUrlApiNomina() + 'nomina_aprobar', { headers: this.headers });
  }

  nominas_aprobar(nominaId): Observable<any> {
    console.log('headers');
    console.log(this.headers);
    const body = { }
    return this.httpClient.post<any>(this.baseUrl.getUrlApi() + 'nomina_aprobar/' + nominaId, body, { headers: this.headers });
  }

  //::::::::::::::::::::::::::::::: BANCO ENVIO ::::::::::::::::::::::::::::::://
  nominas_listar_banco_Envio(): Observable<NominaModel[]> {
    return this.httpClient.get<NominaModel[]>(this.baseUrl.getUrlApiNomina() + 'nomina_banco_envio', { headers: this.headers });
  }

  nominas_envio_Banco(nominaId): Observable<DescargaBancoBbvaModel> {

    return this.httpClient.get<DescargaBancoBbvaModel>(this.baseUrl.getUrlApiNomina() + 'nomina_banco_descarga/' + nominaId, { headers: this.headers });
  }

  nominas_envio_banco(idUnico): Observable<any> {
    const body = { }
    return this.httpClient.post<any>(this.baseUrl.getUrlApi() + 'nomina_banco_enviado/' + idUnico,body, { headers: this.headers });
  }


  //::::::::::::::::::::::::::::::: BANCO RESPUESTAS ::::::::::::::::::::::::::::::://
  nominas_listar_banco_respuesta(): Observable<NominaModel[]> {
    return this.httpClient.get<NominaModel[]>(this.baseUrl.getUrlApiNomina() + 'nomina_banco_respuesta', { headers: this.headers });
  }

  actualizarNominas(cabecera, idNomina): Observable<CargaBancoModel> {
    return this.httpClient.post<CargaBancoModel>(this.baseUrl.getUrlApi() + 'nomina_banco_respuesta/'+ idNomina,cabecera, { headers: this.headers });
  }


  //::::::::::::::::::::::::::::::: BANCO NOMINA DETALLE ::::::::::::::::::::::::::::::://

  nominas_listar_banco_detalle(nominaId): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl.getUrlApiNomina() + 'nomina_banco/'+ nominaId , { headers: this.headers });
  }



  //::::::::::::::::::::::::::::::: BANCO RESPUESTA MANUAL ::::::::::::::::::::::::::::::://
  nominas_listar2(busquedaAnulacion: any, pag: number, xpag: number): Observable<NominaModel[]> {
    let user = JSON.stringify(busquedaAnulacion)
    return this.httpClient.get<any>(this.baseUrl.getUrlApiNomina() + 'nominacarga', { headers: this.headers });
    //return this.httpClient.post(this.baseUrl.getUrlApi() + 'Prod/Reporte/busqueda/'+ pag +'/'+ xpag,user, this.option);
  }

  nominas_listar_respuesta_manual(): Observable<NominaModel[]> {
    return this.httpClient.get<NominaModel[]>(this.baseUrl.getUrlApiNomina() + 'nomina_banco_respuesta', { headers: this.headers });
  }

  //::::::::::::::::::::::::::::::: BANCO RESPUESTA MANUAL DETALLE ::::::::::::::::::::::::::::::://
  nominas_listar_respuesta_manual_detalle(nominaId): Observable<NominaOriginalModel[]> {
    return this.httpClient.get<NominaOriginalModel[]>(this.baseUrl.getUrlApiNomina() + 'nomina_banco/'+ nominaId , { headers: this.headers });
  }

  nominas_respuesta_banco_aprobar(cabecera, idNomina): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl.getUrlApi() + 'nomina_banco_respuesta_manual/'+ idNomina,cabecera, { headers: this.headers });
  }



  //::::::::::::::::::::::::::::::: CARGA NOMINA ::::::::::::::::::::::::::::::://
  carganomina_cargar1(nominacarga: any): Observable<subida_header> {
    return this.httpClient.post<subida_header>(this.baseUrl.getUrlApiCarga(), nominacarga, { headers: this.headers });
  }

  carganomina_cargar_Final(UUID: any) {
    return this.httpClient.get<any>(this.baseUrl.getUrlApiTemp() + 'nomina_carga/' + UUID, { headers: this.headers });
  }

  //::::::::::::::::::::::::::::::: NOMINAS ::::::::::::::::::::::::::::::://
  nominas_listar(jsonsend): Observable<NominaModel[]> {
    return this.httpClient.get<NominaModel[]>(this.baseUrl.getUrlApiNomina() + 'nomina_carga?comercioId='+jsonsend['cboCom']+'&nominaId='+jsonsend['nominaId']+'&finicio='+jsonsend['finicio']+'&ffinal='+jsonsend['ffinal'], { headers: this.headers });
  }

  // nominas_listar(): Observable<NominaModel[]> {
  //   return this.httpClient.get<NominaModel[]>(this.baseUrl.getUrlApiNomina() + 'nominacarga', { headers: this.headers });
  // }



  //::::::::::::::::::::::::::::::: DETALLE NOMINA - ENVIO A PAGINAS SEGUN SELECCION ::::::::::::::::::::::::::::::://
  nominas_listar_original(nominaId, tipo): Observable<NominaOriginalModel[]> {
    return this.httpClient.get<NominaOriginalModel[]>(this.baseUrl.getUrlApiNomina() + 'nomina/' + nominaId + '/' + tipo, { headers: this.headers });
  }

  nominas_listar_error(nominaId, tipo): Observable<NominaErrorModel[]> {
    return this.httpClient.get<NominaErrorModel[]>(this.baseUrl.getUrlApiNomina() + 'nomina/' + nominaId + '/' + tipo, { headers: this.headers });
  }

  carganomina_cargar(nominacarga: any): Observable<subida_header> {
    return this.httpClient.post<subida_header>(this.baseUrl.getUrlApiCarga(), nominacarga, { headers: this.headers });
  }









}
