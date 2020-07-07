import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NominaService implements Resolve<any>{

  orders: any[];
  onOrdersChanged: BehaviorSubject<any>;

      /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */

  constructor(
    private _httpClient: HttpClient
  ) { 
    this.onOrdersChanged = new BehaviorSubject({});
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
            this._httpClient.get('api/e-commerce-orders')
                .subscribe((response: any) => {
                    console.log(response);
                    this.orders = response;
                    this.onOrdersChanged.next(this.orders);
                    resolve(response);
                }, reject);
                
        });
    }


}
