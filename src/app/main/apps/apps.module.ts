import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccesosGuard } from 'app/services/guards/accesos.guard';
const routes = [
    {
        path        : 'dashboards/analytics',
        loadChildren: () => import('./dashboards/analytics/analytics.module').then(m => m.AnalyticsDashboardModule)
    },
    {
        path        : 'dashboards/project',
        canActivate : [ AccesosGuard ],
        loadChildren: () => import('./dashboards/project/project.module').then(m => m.ProjectDashboardModule)
    },
    {
        path        : 'admin/usuarios',
        loadChildren: () => import('./admin/usuarios/usuarios.module').then(m => m.UsuariosModule)
    },
    {
        path        : 'admin/comercios',
        loadChildren: () => import('./admin/comercios/comercios.module').then(m => m.ComerciosModule)
    },
    {
        path        : 'admin/roles',
        loadChildren: () => import('./admin/roles/roles.module').then(m => m.RolesModule)
    },
    {
        path        : 'admin/profile',
        loadChildren: () => import('./admin/profile/profile.module').then(m => m.ProfileModule)
    },
    {
        path        : 'nomina/nominas',
        loadChildren: () => import('./nomina/nominas/nominas.module').then(m => m.NominasModule)
    },
    {
        path        : 'nomina/carga',
        loadChildren: () => import('./nomina/carganomina/carganomina.module').then(m => m.CargaNominaModule)
    },
    {
        path        : 'nomina/detalle-nomina/:id/:tipo',
        loadChildren: () => import('./nomina/detalle-nomina/detalle-nomina.module').then(m => m.DetalleNominaModule)
    },
    {
        path        : 'nomina/aprobar-nomina',
        loadChildren: () => import('./nomina/aprobar-nomina/aprobar-nomina.module').then(m => m.AprobarNominaModule)
    },
    {
        path        : 'nomina/error-nomina/:id/:tipo',
        loadChildren: () => import('./nomina/error-nomina/error-nomina.module').then(m => m.ErrorNominaModule)
    }
    // {
    //     path        : 'mail',
    //     loadChildren: () => import('./mail/mail.module').then(m => m.MailModule)
    // },
    // {
    //     path        : 'mail-ngrx',
    //     loadChildren: () => import('./mail-ngrx/mail.module').then(m => m.MailNgrxModule)
    // },
    // {
    //     path        : 'chat',
    //     loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
    // },
    // {
    //     path        : 'calendar',
    //     loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
    // },
    // {
    //     path        : 'e-commerce',
    //     loadChildren: () => import('./e-commerce/e-commerce.module').then(m => m.EcommerceModule)
    // },
    // {
    //     path        : 'academy',
    //     loadChildren: () => import('./academy/academy.module').then(m => m.AcademyModule)
    // },
    // {
    //     path        : 'todo',
    //     loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)
    // },
    // {
    //     path        : 'file-manager',
    //     loadChildren: () => import('./file-manager/file-manager.module').then(m => m.FileManagerModule)
    // },
    // {
    //     path        : 'contacts',
    //     loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule)
    // },
    // {
    //     path        : 'scrumboard',
    //     loadChildren: () => import('./scrumboard/scrumboard.module').then(m => m.ScrumboardModule)
    // }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule
    ]
})
export class AppsModule
{
}
