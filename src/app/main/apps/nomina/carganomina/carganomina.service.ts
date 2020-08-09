import { Injectable } from '@angular/core';
import { NominaService } from '../nomina.service';
import { subida_header } from './carganomina.component';



@Injectable({
  providedIn: 'root'
})
export class CarganominaService {

    constructor( private _nominaService: NominaService) { }

    carganomina_cargar(nominacarga : subida_header){
        return this._nominaService.carganomina_cargar(nominacarga);
    }

    carganomina_cargar1(nominacarga : subida_header){
      return this._nominaService.carganomina_cargar1(nominacarga);
  }

    carganomina_cargar_Final(UUID : any){
      return this._nominaService.carganomina_cargar_Final(UUID);
  }


}