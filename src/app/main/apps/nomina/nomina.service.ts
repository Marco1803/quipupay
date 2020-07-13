import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfiguracionUrl } from 'app/configuracionUrl';
import { UserLoginService } from 'app/main/pages/services/login-user.services';
import { subida_header } from './carganomina/carganomina.component';

@Injectable({
  providedIn: 'root'
})
export class NominaService implements Resolve<any>{

  orders: any[];
  onOrdersChanged: BehaviorSubject<any>;
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
      /**
     * Constructor
     *
     * @param {HttpClient} httpClient
     */

  constructor(
    private httpClient: HttpClient,
    getParametroCognito : UserLoginService
  ) { 
    this.onOrdersChanged = new BehaviorSubject({});
    this.baseUrl = new ConfiguracionUrl();
     this.idtoken = getParametroCognito.renovarToken();
     this.headers = new HttpHeaders({
    //   'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    //   'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    //   'Access-Control-Allow-Origin': '*',
      'Content-type':'application/json;charset=utf8',
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

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
      return new Promise((resolve, reject) => {

          Promise.all([
              this.getNominas()
          ]).then(
              () => {
                  resolve();
              },
              reject
          );
      });
  }

     /**
     * Get orders
     *
     * @returns {Promise<any>}
     */
    

    getNominas(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.httpClient.get('api/e-commerce-orders')
                .subscribe((response: any) => {
                    console.log(response);
                    this.orders = response;
                    this.onOrdersChanged.next(this.orders);
                    resolve(response);
                }, reject);
                
        });
    }

    carganomina_cargar(nominacarga: any): Observable<subida_header>{
        return this.httpClient.post<subida_header>(this.baseUrl.getUrlApi()+'nomina', nominacarga, {headers:this.headers});
    }

}
