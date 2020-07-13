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

}