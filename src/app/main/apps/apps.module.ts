import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccesosGuard } from 'app/services/guards/accesos.guard';
import { PagerService } from './nomina/pagination.service';


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
    },
    {
        path        : 'nomina/banco-envio',
        loadChildren: () => import('./nomina/banco-envio/banco-envio.module').then(m => m.BancoEnvioModule)
    },
    {
        path        : 'nomina/banco-respuesta',
        loadChildren: () => import('./nomina/banco-respuesta/banco-respuesta.module').then(m => m.BancoRespuestaModule)
    },
    {
        path        : 'nomina/banco-respuesta-manual',
        loadChildren: () => import('./nomina/banco-respuesta-manual/banco-respuesta-manual.module').then(m => m.BancoRespuestaManualModule)
    },
    {
        path        : 'nomina/banco-respuesta-manual-detalle/:id',
        loadChildren: () => import('./nomina/banco-respuesta-manual-detalle/banco-respuesta-manual-detalle.module').then(m => m.BancoRespuestaManualDetalleModule)
    },
    {
        path        : 'nomina/banco-nomina-detalle/:id',
        loadChildren: () => import('./nomina/banco-nomina-detalle/banco-nomina-detalle.module').then(m => m.BancoNominaDetalleModule)
    },
    {
        path        : 'reportes/reporte',
        loadChildren: () => import('./reportes/reporte/reporte.module').then(m => m.ReporteModule)
    },
    {
        path        : 'admin/grupos',
        loadChildren: () => import('./admin/grupos/grupos.module').then(m => m.GruposModule)
    },
    {
        path        : 'reportes/reporte-detalle',
        loadChildren: () => import('./reportes/reporte-detalle/reporte-detalle.module').then(m => m.ReporteDetalleModule)
    }
 
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule
    ],
    declarations: [],
    providers:[
        PagerService
    ]
})
export class AppsModule
{
}
