import {Inject, Injectable} from "@angular/core";
//import {CognitoUtil} from "./service/cognito.service";
import * as  AmazonCognitoIdentity from "amazon-cognito-identity-js";
//import * as AWS from "aws-sdk/global";
import { CognitoService } from './cognito.service';

export class RenovarToken{
    constructor(@Inject(CognitoService) public cognitoUtil: CognitoService) {
    }
    // renovarToken():string{
    //     let tokenUsuario;
    //     var data = {
    //         UserPoolId : this.cognitoUtil.getUserPool().getUserPoolId(), // Your user pool id here
    //         ClientId : this.cognitoUtil.getUserPool().getClientId() // Your client id here
    //     };
    //     var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
    //     var cognitoUser = userPool.getCurrentUser();
    //     if (cognitoUser != null) {
    //         cognitoUser.getSession(function(err, session) {
    //             if (err) {
    //                 console.log(err)
    //                 return;
    //             }
    //             AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    //                 IdentityPoolId : 'us-east-1:fbe0340f-9ffc-4449-a935-bb6a6661fd53',// your identity pool id here
    //                 Logins : {
    //                     'cognito-idp.us-east-1.amazonaws.com/us-west-2_vSrvNhknk' : session.getIdToken().getJwtToken(),
    //                 } 
    //             });

    //             tokenUsuario = session.getIdToken().getJwtToken();
    //         });       
    //     }
    //     return tokenUsuario;
    //  }

    headerDevice():string{
        let tokenDevice;
        for (let index = 0; index < localStorage.length; index++) {
            let posicion = localStorage.key(index).indexOf("deviceKey");
            if(posicion != -1){
                let key = localStorage.key(index);
                tokenDevice = localStorage.getItem(key);
            }
        }
        return tokenDevice;
    }

    headerTokenAccess():string{
        let tokenAccess;
        for (let index = 0; index < localStorage.length; index++) {
            let posicion = localStorage.key(index).indexOf("accessToken");
            if(posicion != -1){
                let key = localStorage.key(index);
                tokenAccess = localStorage.getItem(key);
            }
        }
        return tokenAccess;
    }
    

}