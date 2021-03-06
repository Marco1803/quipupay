import { Injectable } from '@angular/core';
import { NominaService } from '../nomina.service';

@Injectable({
  providedIn: 'root'
})
export class BancoRespuestaManualService {

  constructor(
    private _nominasService: NominaService
  ) { 
  }

  obtenerComercios(){
    return this._nominasService.nominas_listar();
  }
}
