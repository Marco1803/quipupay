import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfiguracionUrl } from 'app/configuracionUrl';
import { UserLoginService } from 'app/main/pages/services/login-user.services';
import { dashboardCabModel } from 'app/main/models/dashboardModel.model';

@Injectable()
export class ProjectDashboardService implements Resolve<any>
{
    projects: any[];
    widgets: any[];

    //variables
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
    constructor(private _httpClient: HttpClient, getParametroCognito: UserLoginService) {
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
    

    //obtenerProjectData

    obtenerProjectData(jsonsend): Observable<dashboardCabModel[]> {
        console.log('id token ')
        console.log(this.idtoken)
        return this._httpClient.get<dashboardCabModel[]>(this.baseUrl.getUrlApiUsuarios() + 'dashboard?finicio='+jsonsend.fechaIni+'&ffinal='+jsonsend.fechaFin+'&comercioId='+jsonsend.comercioId, { headers: this.headers });
      }
                                                                                                 //?finicio=2020-08-07&ffinal=2020-08-07
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
                this.getProjects(),
                this.getWidgets()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get projects
     *
     * @returns {Promise<any>}
     */
    getProjects(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/project-dashboard-projects')
                .subscribe((response: any) => {
                    this.projects = response;
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Get widgets
     *
     * @returns {Promise<any>}
     */
    getWidgets(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/project-dashboard-widgets')
                .subscribe((response: any) => {
                    this.widgets = response;
                    resolve(response);
                }, reject);
        });
    }
}
