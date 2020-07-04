import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { Observable, Subject } from "rxjs";
import "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import {   CognitoUserPool,  CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { CognitoCallback, CognitoService,LoggedInCallback } from 'app/cognito.service';
import { NewPasswordUser } from '../authentication/forgot/forgot.component';

import * as AWS from "aws-sdk/global";

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

    private _accessToken: string = "";
    private _userloggedIn: boolean = false;
    private _userDetails: any = {};

    constructor(public http: HttpClient,public cognitoUtil: CognitoService) {}
    
    isAuthenticated(callback: LoggedInCallback) {
        if (callback == null)
            throw("UserLoginService: Callback in isAuthenticated() cannot be null");

        let cognitoUser = this.cognitoUtil.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession(function (err, session) {
                if (err) {
                   // console.log("UserLoginService: Couldn't get the session: " + err, err.stack);
                    callback.isLoggedIn(err, false);
                }
                else {
                  //  console.log("UserLoginService: Session is " + session.isValid());
                    callback.isLoggedIn(err, session.isValid());
                }
            });
        } else {
          //  console.log("UserLoginService: can't retrieve the current user");
            callback.isLoggedIn("Can't retrieve the CurrentUser", false);
        }
    }

    newPassword(newPasswordUser: NewPasswordUser, callback: CognitoCallback): void {
        // Get these details and call
        //cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this);

        let authenticationData = {
            Username: newPasswordUser.username,
            Password: newPasswordUser.existingPassword,
        };
        let authenticationDetails = new AuthenticationDetails(authenticationData);

        let userData = {
            Username: newPasswordUser.username,
            Pool: this.cognitoUtil.getUserPool()
        };
        
        let cognitoUser = new CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            newPasswordRequired: function (userAttributes, requiredAttributes) {
                // User was signed up by an admin and must provide new
                // password and required attributes, if any, to complete
                // authentication.
        

                // the api doesn't accept this field back
                delete userAttributes.email_verified;
                cognitoUser.completeNewPasswordChallenge(newPasswordUser.password, requiredAttributes, {
                    onSuccess: function (result) {
                        callback.cognitoCallback(null, userAttributes);
                    },
                    onFailure: function (err) {
                        callback.cognitoCallback(err, null);
                    }
                });
            },
            onSuccess: function (result) {

                callback.cognitoCallback(null, result);
            },
            onFailure: function (err) {

                callback.cognitoCallback(err, null);
            }
        });
    }

    renovarToken():string{
        let tokenUsuario;
        var data = {
            UserPoolId : this.cognitoUtil.getUserPool().getUserPoolId(), // Your user pool id here
            ClientId : this.cognitoUtil.getUserPool().getClientId() // Your client id here
        };
        var userPool = new CognitoUserPool(data);
        var cognitoUser = userPool.getCurrentUser();
        console.log('renovar token 1');
        if (cognitoUser != null) {
            cognitoUser.getSession(function(err, session) {
                console.log('renovar token 2');
                if (err) {
                    console.log(err)
                    return;
                }
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId : 'us-west-2:7a03f2fe-4099-4ef0-b8df-0a1d1a980a8d',// your identity pool id here
                    Logins : {
                        'cognito-idp.us-west-2.amazonaws.com/us-west-2_oUDeQcE5u' : session.getIdToken().getJwtToken(),
                    } 
                });
                
                tokenUsuario = session.getIdToken().getJwtToken();
            });       
        }
        console.log(tokenUsuario);
        return tokenUsuario;
     }

    logout() {
        this.cognitoUtil.getCurrentUser().signOut();
        localStorage.clear();
    }

}
