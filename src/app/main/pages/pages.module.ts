import { NgModule } from '@angular/core';

import { LoginModule } from 'app/main/pages/authentication/login/login.module';
import { ForgotModule } from './authentication/forgot/forgot.module';
import { LogoutModule } from './authentication/logout/logout.module';

@NgModule({
    imports: [
        // Authentication
        LoginModule,
        ForgotModule,
        LogoutModule
    ],
})
export class PagesModule
{

}
