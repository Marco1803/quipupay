import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { UserLoginService } from 'app/main/pages/services/login-user.services';
import { ConfiguracionUrl } from 'app/configuracionUrl';
import { roleArn } from 'aws-sdk/clients/lexmodelbuildingservice';
import { Rol } from 'app/main/models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class ReporteDetalleService  {

  orders: any[];
  onOrdersChanged: BehaviorSubject<any>;

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
  
   /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */

  constructor(
    private _httpClient: HttpClient, getParametroCognito: UserLoginService
  ) { 
    // Set the defaults
    this.onOrdersChanged = new BehaviorSubject({});

    this.baseUrl = new ConfiguracionUrl();
    this.idtoken = getParametroCognito.renovarToken();
    this.headers = new HttpHeaders({
      'Content-type': 'application/json;charset=utf8',
      'Authorization': this.idtoken
      // 'DeviceKey' : this.idDevice,
      // 'AccessToken' : this.tokenAcess
    });
  }




  /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */

    // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    // {
    //     return new Promise((resolve, reject) => {

    //         Promise.all([
    //             this.comercios_listar()
    //         ]).then(
    //             () => {
    //                 resolve();
    //             },
    //             reject
    //         );
    //     });
    // }

        /**
     * Get orders
     *
     * @returns {Promise<any>}
     */
    // getOrders(): Promise<any>
    // {
    //     return new Promise((resolve, reject) => {
    //         this._httpClient.get(this.baseUrl.getUrlApi() + 'comercios', { headers: this.headers })
    //             .subscribe((response: any) => {
    //               console.log('response');
    //               console.log(response);
    //                 this.orders = response;
    //                 this.onOrdersChanged.next(this.orders);
    //                 resolve(response);
    //             }, reject);
    //     });
    // }

    comercios_listar(): Observable<Rol[]> {
      //console.log('id token ')
      //console.log('')
      return this._httpClient.get<Rol[]>(this.baseUrl.getUrlApi() + 'roles', { headers: this.headers });
    }

    // comercios_listar(): Observable<Comercio[]> {
    //   console.log('id token ')
    //   console.log(this.idtoken)
    //   return this.httpClient.get(this.baseUrl.getUrlApi() + 'comercios', { headers: this.headers });
    // }
}
