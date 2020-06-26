import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor() { }

  cargarUsuarios( desde: number = 0 ){

let url= 'http://dummy.restapiexample.com/api/v1/employees';
return url;

  }
}
