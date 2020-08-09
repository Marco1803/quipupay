import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { JwtHelperService } from '@auth0/angular-jwt';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';
import { Router } from '@angular/router';
import { CognitoService } from 'app/cognito.service';
import { GetParametrosCognito } from 'app/services/getParametrosCognito.service';
import { UsuariosService } from 'app/main/apps/admin/usuarios/usuarios.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AdminService } from 'app/main/apps/admin/admin.service';
import { ComercioListarModel } from 'app/main/models/comercioListarModel.model';
@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];
    helper: JwtHelperService;
    username: string = "";
    userCom: any = '';
    comercioIdCombo = 0;

    //barra comercio
    nombreComercio: any;
    cboComercio: ComercioListarModel[] = [];
    busquedaForm: FormGroup;
    nombreUsuario : any;
    rolUsuario: any;

    // Private
    private _unsubscribeAll: Subject<any>;
    //comercio_byuser/username
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TranslateService} _translateService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService,
        public router: Router,
        public authService: GetParametrosCognito,
        public _usuarioService: UsuariosService,
        private formBuilder: FormBuilder,
        public _adminService: AdminService
    ) {
        this.helper = new JwtHelperService();
        let token = this.authService.getIdToken();
        const decodedToken = this.helper.decodeToken(token);
        let user = `${decodedToken["custom:Nombres"]} ${decodedToken["custom:Apellidos"]} `;
        let userCom = `${decodedToken["cognito:username"]}`;
        this.username = user;
        this.userCom = userCom;



        // Set the defaults
        this.userStatusOptions = [
            {
                title: 'Online',
                icon: 'icon-checkbox-marked-circle',
                color: '#4CAF50'
            },
            {
                title: 'Away',
                icon: 'icon-clock',
                color: '#FFC107'
            },
            {
                title: 'Do not Disturb',
                icon: 'icon-minus-circle',
                color: '#F44336'
            },
            {
                title: 'Invisible',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#BDBDBD'
            },
            {
                title: 'Offline',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#616161'
            }
        ];

        this.languages = [
            {
                id: 'es',
                title: 'Espanol',
                flag: 'es'
            }
            ,
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            {
                id: 'tr',
                title: 'Turkish',
                flag: 'tr'
            },
            {
                id: 'pe',
                title: 'Espanol',
                flag: 'pe'
            }

        ];

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.initBuscador();
        this.obtenerComercio(this.userCom);

        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, { id: this._translateService.currentLang });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
        // Do your search here...
        console.log(value);
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }

    logoutUser() {
        
        this.router.navigate(["pages/auth/logout"])
    }
    btnProfile() {

        this.router.navigate(["apps/admin/profile"])
    }
    initBuscador() {
        this.busquedaForm = this.formBuilder.group({
            comercio: new FormControl('', null)
        });
    }

//todo va casi bien 
    //busqueda
    obtenerComercio(userCom) {
        localStorage.setItem('comercioId', '');
        console.log(userCom);
        this._adminService.obtenerCboComercioToolBar2(userCom)
            .subscribe(
                (data) => {
                    console.log('la data');
                    console.log(data)
                    this.cboComercio = data['comercios'];
                    this.nombreComercio = this.cboComercio[0]['nombre'];
                    this.nombreUsuario = data['username'];
                    this.rolUsuario = data['rolname'];
                    this.comercioIdCombo = this.cboComercio[0]['comercioid'];
                    console.log(this.comercioIdCombo)
                    localStorage.setItem('comercioId', JSON.stringify(this.comercioIdCombo));
                    //comercioIdCombo
                });
    }

    cambioComercio(nombre, id) {
        localStorage.setItem('comercioId', '');
        console.log(nombre);
        this.nombreComercio = nombre;
        this.comercioIdCombo = id;
        localStorage.setItem('comercioId', JSON.stringify(this.comercioIdCombo));

    }

}
