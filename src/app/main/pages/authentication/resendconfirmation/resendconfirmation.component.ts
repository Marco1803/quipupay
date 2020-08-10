import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfiguracionUrl } from 'app/configuracionUrl';
import { FuseConfigService } from '@fuse/services/config.service';
import { UserLoginService } from '../../services/login-user.services';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationService } from 'app/navigation/navigation.service';

@Component({
  selector: 'app-resendconfirmation',
  templateUrl: './resendconfirmation.component.html',
  styleUrls: ['./resendconfirmation.component.scss']
})
export class ResendconfirmationComponent implements OnInit {
  loginForm: FormGroup;
  username: string; // se usara en caso de necesite cambiar el password
  listMenu: any;
  baseUrl: ConfiguracionUrl;
  errorMessage: string;
  usuario: string;
  errorPass: string;
  private sub: any;
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    public userLoginService: UserLoginService,
    public router: Router,
    public navigationService: NavigationService,
    public route: ActivatedRoute
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
    this.sub = this.route.params.subscribe(params => {
        this.usuario = params['usuario'];
    });
    this.errorMessage = null;
    this.errorPass = null;
    this.loginForm = this._formBuilder.group({
        email   : ['', [Validators.required]],
        codigo   : ['', [Validators.required]],
        password   : ['', [Validators.required]]
    });
    this.loginForm.patchValue({
      email:this.usuario
    });
  }

  public OnSubmit(): void {
    /**
     * @method AuthService.authenticateCongnito calling the cognito authentication 
     * @param {string} username
     * @param {string} password
     * @return {object} With accesstoken and payload
     */
    console.log(this.loginForm);
    this.userLoginService.confirmNewPassword(this.loginForm.value.email, this.loginForm.value.codigo, this.loginForm.value.password, this);
  }

  cognitoCallback(message: string) {
    if (message != null) { //error
        this.errorMessage = message;
    } else { //success
        this.router.navigate(['pages/auth/login']);
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
