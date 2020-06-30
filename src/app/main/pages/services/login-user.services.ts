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

    logout() {
        this.cognitoUtil.getCurrentUser().signOut();
        localStorage.clear();
    }

}
