import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CognitoService } from 'app/cognito.service';
import { UserLoginService } from '../../services/login-user.services';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';

export class NewPasswordUser {
  username: string;
  existingPassword: string;
  password: string;
}

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ForgotComponent implements OnInit {
  registrationUser: NewPasswordUser;
  router: Router;
  errorMessage: string;
  errorPass: string;
  forgotForm: FormGroup;
  public authService: CognitoService;
  private sub: any;
  constructor(
    //public userRegistration: UserRegistrationService,
    public userService: UserLoginService,
    public route:ActivatedRoute,
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    router: Router) {
      this.router = router;
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
       //this.onInit();
    }

  ngOnInit(): void {
    this.registrationUser = new NewPasswordUser();
    this.sub = this.route.params.subscribe(params => {
      this.registrationUser.username = params['username'];
    });
    this.forgotForm = this._formBuilder.group({
      email   : [this.registrationUser.username],
      password: ['', Validators.required],
      password_new: ['', [Validators.required]]
    });
    this.userService.isAuthenticated(this);
    this.errorPass = null;
  }

  onRegister(){
    let miPalabra = this.forgotForm.value.password_new;
    let Cepecial = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?";//caracteres especiales
    let especial = 0;
    let may=0;//contador de mayusculas
    let min=0;//contador de minusculas
    let numb=0;//contador de numeros
    let cont=0;//contador de caracteres
    for(let index = 0; index < miPalabra.length; index++) {//filtramos la contraeña y valiamos si tiene mayuscula,minuscula,numero y caracter especial
      let letraActual = miPalabra.charAt(index);
      if (Cepecial.indexOf(miPalabra.charAt(index)) != -1) {
          especial++;
      }
      else if (/^([0-9])*$/.test(letraActual)){
        numb++;
      }
      else{
        if(this.esMayuscula(letraActual)){
          may++;
        }
        if(this.esMinuscula(letraActual)){
          min++;
        }
      }
      cont++;
    }
    if(cont<8){
      this.errorPass = "Debe ingresar al menos 8 caracteres";
        return false;
    }
    else if(especial<1 || numb<1 || may<1 || min<1 ){
      this.errorPass = "Debe ingresar al menos 1 carácter​​ Numérico, 1 carácter​​ en minúscula, 1 carácter​​ en mayúscula y un carácter​​ especial.";
        return false;
    }
    this.errorPass = null;
    this.errorMessage = null;
    this.registrationUser.username = this.forgotForm.value.email;
    this.registrationUser.password = this.forgotForm.value.password_new;
    this.registrationUser.existingPassword = this.forgotForm.value.password;
    console.log(this.registrationUser);
    this.userService.newPassword(this.registrationUser, this);
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
    if (isLoggedIn)
      this.router.navigate(["apps/admin/usuarios"]);
  }

  cognitoCallback(message: string, result: any) {//la funcion nueva contraseña retornara un mensaje si el proceso fue exitoso o erroneo///////
      console.log(message);
      console.log(result);
      if (message != null) { //error
        this.validarMensajes(message['message']);
      } else { //success
        this.router.navigate(['pages/auth/logout']);
      }
  }

  validarMensajes(mensaje:string){ /// validamos los mensajes de error al cambias la contraeña ya que las respuestas de cognito estan en ingles.
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
      case 'User does not exist.': {
        this.errorMessage = 'El usuario no existe.';
        break;
      }
      case 'Incorrect username or password.': {
        this.errorMessage = 'Nombre de usuario o contraseña incorrecta.';
        break;
      }
      case 'User is disabled': {
        this.errorMessage = 'El usuario esta inhabilitado';
        break;
      }
      case 'Password attempts exceeded': {
        this.errorMessage = 'Intentos de contraseña superados';
        break;
      }
      default: {
        this.errorMessage = 'Error de usuario';
         break;
      }
    }
  }
  esMayuscula(letra: string){/// funcion para detectar mayusculas
    return letra === letra.toUpperCase();
  }
  esMinuscula(letra: string){/// funcion para detectar minusculas
    return letra === letra.toLowerCase();
  }
}
