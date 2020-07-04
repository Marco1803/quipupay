import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { CognitoService } from 'app/cognito.service';
import { Router } from '@angular/router';
import { NavigationService } from '../../../../navigation/navigation.service';
import { ConfiguracionUrl } from '../../../../configuracionUrl';

@Component({
    selector     : 'app-login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
    username: string; // se usara en caso de necesite cambiar el password
    listMenu: any;
    baseUrl: ConfiguracionUrl;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        public authService: CognitoService,
        public router: Router,
        public navigationService: NavigationService


    )
    {
        // Configure the layout
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

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.baseUrl = new ConfiguracionUrl();
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required]],
            password: ['', Validators.required]
        });
    }

    public OnSubmit(): void {
        /**
         * @method AuthService.authenticateCongnito calling the cognito authentication 
         * @param {string} username
         * @param {string} password
         * @return {object} With accesstoken and payload
         */
        this.authService
        .authenticateCongnito({
            Username: this.loginForm.value.email,
            Password: this.loginForm.value.password
        })
        .subscribe((result) => {
            // verify the result having the accessToken and payload information
            if (result && result.accessToken) {
            // After information is received send it to angular setters in services and can utlised
                this.authService.accessToken = result.accessToken.jwtToken;
                this.authService.userLoggedIn = true;
                this.authService.UserDetails = {
                    username: result.accessToken.payload.username
                };
            // Route to home screen after success
                
                // this.getMenu();
                //this.router.navigate(["apps/dashboards/analytics"]);
                location.href=this.baseUrl.getUrlBase()+"apps/dashboards/analytics";
            }else{
                //console.log(result);
                this.username = this.loginForm.value.email;
                this.validateMessageCognito(result.message);
            }
        }, (err) => {
                console.log(err);
                //this.validateMessageCognito(err.message);
            }
        );
    }

    validateMessageCognito(message: string){
        switch (message) {
            case "FORCE_CHANGE_PASSWORD":
                this.router.navigate(["pages/auth/forgotPassword",this.username.toUpperCase()]);
                break;
            case "Incorrect username or password.":
                this.router.navigate(["apps/admin/usuarios"]);
                break;
            default:
                break;
        }
    }



}
