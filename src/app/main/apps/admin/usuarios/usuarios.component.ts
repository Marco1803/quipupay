import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { UsuariosService } from './usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario [] = [];
  desde: number = 0;
  totalRegistro: number = 0;

  constructor(
    public _usuarioService: UsuariosService
  ) { }

  ngOnInit(): void {
  }

  cargarUsuarios(){
  }

}
