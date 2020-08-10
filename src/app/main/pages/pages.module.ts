import { NgModule } from '@angular/core';

import { LoginModule } from 'app/main/pages/authentication/login/login.module';
import { ForgotModule } from './authentication/forgot/forgot.module';
import { LogoutModule } from './authentication/logout/logout.module';
import { ResendModule } from './authentication/resend/resend.module';
import { ResendconfirmationModule } from './authentication/resendconfirmation/resendconfirmation.module';

@NgModule({
    imports: [
        // Authentication
        LoginModule,
        ResendModule,
        ForgotModule,
        LogoutModule,
        ResendconfirmationModule
    ],
    declarations: [],
})
export class PagesModule
{

}
