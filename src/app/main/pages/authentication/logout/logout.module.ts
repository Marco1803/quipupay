import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from 'app/main/pages/authentication/login/login.component';
import { LogoutComponent } from './logout.component';

const routes = [
    {
        path     : 'auth/logout',
        component: LogoutComponent
    }
];

@NgModule({
    declarations: [
        LogoutComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
    ]
})
export class LogoutModule
{
}
