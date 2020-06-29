import { NgModule } from '@angular/core';

import { LoginModule } from 'app/main/pages/authentication/login/login.module';
import { ForgotModule } from './authentication/forgot/forgot.module';

@NgModule({
    imports: [
        // Authentication
        LoginModule,
        ForgotModule
    ]
})
export class PagesModule
{

}
