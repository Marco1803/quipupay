import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GetParametrosCognito } from 'app/services/getParametrosCognito.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  //Form
  perfilForm: FormGroup;
  passwordChangeForm: FormGroup;

  //Token y variables
  helper: JwtHelperService;
  userName: string = "";
  userLastName: string = "";

  constructor(
    private perfilFormBuilder: FormBuilder,
    private passwordFormBuilder: FormBuilder,
    public authService: GetParametrosCognito
  ) {
     //Datos Token
     this.helper        = new JwtHelperService(); 
     let token          = this.authService.getIdToken();
     const decodedToken = this.helper.decodeToken(token);
     let userName       = `${ decodedToken["custom:Nombres"]}`;
     let userLastName   = `${ decodedToken["custom:Apellidos"]}`;
     this.userName      = userName;
     this.userLastName  = userLastName;

    this.inicializarForms();
    this.iniPasswordForm();
   }

  // Inicalizamos Variables
  inicializarForms() {
    this.perfilForm = this.perfilFormBuilder.group({
      apellidos: [this.userLastName, []],
      nombres: [this.userName, []],
      email: ['', []]
    });
  }

  iniPasswordForm(){
    this.passwordChangeForm = this.passwordFormBuilder.group({
      nuevaPassword: ['', []],
      confirmaNuevaPassword: ['', []]
    })
  }


  ngOnInit(): void {
  }

}
