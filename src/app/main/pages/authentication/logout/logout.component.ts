import { Component, OnInit } from '@angular/core';
import { LoggedInCallback, CognitoService } from 'app/cognito.service';
import { Router } from '@angular/router';
import { UserLoginService } from '../../services/login-user.services';
import * as  AmazonCognitoIdentity from "amazon-cognito-identity-js";

@Component({
  selector: 'app-dashborad',
  template: '<p>cerrar sesion</p>'
})
export class LogoutComponent implements OnInit {

  constructor(public router: Router,
    public userService: UserLoginService,
    public cognitoUtil: CognitoService) 
    {
    
    }
    
    ngOnInit() : void{
      console.log("logout");
      this.userService.isAuthenticated(this);
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
      console.log(isLoggedIn);
      if (isLoggedIn) {
          ////////destruye el id del dispositivo logeado
          var data = {
              UserPoolId : this.cognitoUtil.getUserPool().getUserPoolId(), // Your user pool id here
              ClientId : this.cognitoUtil.getUserPool().getClientId() // Your client id here
          };
          var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
          var cognitoUser = userPool.getCurrentUser();
          if (cognitoUser != null) {
            cognitoUser.getSession(function(err, session) {
                if (err) {
                    return;
                }
                cognitoUser.listDevices(10, null, {
                    onSuccess: function (result) {
                        let cant = Object.keys(result['Devices']).length;
                          for (let index = 0; index < cant; index++) {
                              let valor = result['Devices'][index]['DeviceKey'];
                              cognitoUser.forgetSpecificDevice(valor,{
                                  onSuccess: function(){
                                  },
                                  onFailure: function(err1) {
                                  }
                                });
                          }
                    },
                    onFailure: function(err) {
                    }
                }); 
            });
            sessionStorage.clear();
            this.userService.logout();
            localStorage.clear();
            this.router.navigate(['pages/auth/login']);
          }
          this.router.navigate(['pages/auth/login']);
        }
      }
}
