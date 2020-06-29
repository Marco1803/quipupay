import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "./../environments/environment";
import { Observable, Subject } from "rxjs";
import "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import {   CognitoUserPool,  CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

export interface CognitoCallback {
  cognitoCallback(message: string, result: any): void;
}

export interface LoggedInCallback {
  isLoggedIn(message: string, loggedIn: boolean): void;
}

@Injectable({
  providedIn: 'root'
})

export class CognitoService {
  public static _REGION = environment.cognitoPool.region;
  public static _IDENTITY_POOL_ID = environment.cognitoPool.identityPoolId;
  public static _USER_POOL_ID = environment.cognitoPool.UserPoolId;
  public static _CLIENT_ID = environment.cognitoPool.ClientId;
  public static _POOL_DATA: any = {
      UserPoolId: CognitoService._USER_POOL_ID,
      ClientId: CognitoService._CLIENT_ID
  };

  private _accessToken: string = "";
  private _userloggedIn: boolean = false;
  private _userDetails: any = {};

  constructor(public http: HttpClient) {}

  authenticateCongnito(data): Observable<any> {
    // Defining an rxjs subject so as to emit after recieving the response
    let authResult = new Subject<any>();
    // Add the User details to amazon cognito sdk
    const CogAuthData = new AuthenticationDetails(data);
    // Create a user pool with cliend id and secret key
    const CogUserPool = new CognitoUserPool(environment.cognitoPool);
    // Instantiate an cognito user with details and pool information
    const CogUser = new CognitoUser({
      Username: data.Username,
      Pool: CogUserPool
    });
    // Authenticate the cognito user with information
    CogUser.authenticateUser(CogAuthData, {
      newPasswordRequired: err => {
        console.log(err);
        var res = {
          code: "NotAuthorizedException",
          message: "FORCE_CHANGE_PASSWORD",
          name: "NotAuthorizedException",
          email: err.email
        }
        authResult.next(res);
      },
      onSuccess: result => {
        // on success send it to subject so that it will emit the success
        authResult.next(result);
      },
      onFailure: err => {
        // on failure send it to suvject so that will emit the error
        authResult.error(err); 
      }
    });
    // Handling the final Observable 
    return authResult.asObservable();
  }

  getUserPool() {
    if (environment.cognitoPool.cognito_idp_endpoint) {
        CognitoService._POOL_DATA.endpoint = environment.cognitoPool.cognito_idp_endpoint;
    }
    return new CognitoUserPool(CognitoService._POOL_DATA);
  }
  getCurrentUser() {
      return this.getUserPool().getCurrentUser();
  }
  // Set accesstoken data
  set accessToken(value: string) {
    this._accessToken = value;
  }
  // set Logged in user data
  set userLoggedIn(value: boolean) {
    this._userloggedIn = value;
  }
  // get user Logged in data
  get userLoggedIn(): boolean {
    return this._userloggedIn;
  }
  // set user details
  set UserDetails(value: any) {
    this._userDetails = value;
  }
  // set user Details
  get UserDetails(): any {
    return this._userDetails;
  }

}
