import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfiguracionUrl } from 'app/configuracionUrl';
import { FuseConfigService } from '@fuse/services/config.service';
import { Router } from '@angular/router';
import { NavigationService } from 'app/navigation/navigation.service';
import { UserLoginService } from '../../services/login-user.services';

@Component({
  selector: 'app-resend',
  templateUrl: './resend.component.html',
  styleUrls: ['./resend.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ResendComponent implements OnInit {

  loginForm: FormGroup;
  username: string; // se usara en caso de necesite cambiar el password
  listMenu: any;
  baseUrl: ConfiguracionUrl;
  errorMessage: string;
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    public userLoginService: UserLoginService,
    public router: Router,
    public navigationService: NavigationService
  ) {
    this.errorMessage = null;
    this._fuseConfigService.config = {
      layout: {
          navbar   : {
              hidden: true
          },
          toolbar  : {
              hidden: true
          },
          footer   : {
              hidden: true
          },
          sidepanel: {
              hidden: true
          }
      }
    };
  }

  ngOnInit(): void {
    this.baseUrl = new ConfiguracionUrl();
    this.loginForm = this._formBuilder.group({
        email   : ['', [Validators.required]]
    });
  }

  public OnSubmit(): void {
    /**
     * @method AuthService.authenticateCongnito calling the cognito authentication 
     * @param {string} username
     * @param {string} password
     * @return {object} With accesstoken and payload
     */
    console.log(this.loginForm.value.email);
    this.userLoginService.forgotPassword(this.loginForm.value.email.toUpperCase(), this);
  }

  // cognitoCallback(message: string, result: any) {
  //   console.log(message);
  //   console.log(result);
  //   if (message != null) { //error
  //     this.validateMessageCognito(message['message']);
  //   } else {
  //     this.router.navigate(['pages/auth/logout']);
  //   }
  // }

  cognitoCallback(message: string, result: any) {
    console.log(message);
    if (message == null && result == null) {
        this.router.navigate(['pages/auth/resendconfirmation', this.loginForm.value.email.toUpperCase()]);
    } else {
      this.validarMensajes(message);
    }
}

  validarMensajes(mensaje:string){/// validamos los mensajes de error ya que las respuestas de cognito estan en ingles.
    switch(mensaje) { 
      case 'Username/client id combination not found.': {  
        this.errorMessage = 'Nombre de usuario no encontrado.';
         break; 
      }
      case 'Attempt limit exceeded, please try after some time.': {  
        this.errorMessage = 'Se ha superado el l&iacute;mite de intentos, por favor intente despu&eacute;s de un tiempo.';
        break; 
      }
      case 'User password cannot be reset in the current state.': {  
        this.errorMessage = 'La contraseña del usuario no se puede restablecer en el estado actual.';
        break; 
      }
      case 'User is disabled': {   
        this.errorMessage = 'El usuario esta inhabilitado';
        break; 
      }
      default: { 
        this.errorMessage = 'Error de usuario';
         break; 
      } 
   } 
  }

}
