import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteComponent } from '../reporte/reporte.component';
import { ReporteDetalleComponent } from './reporte-detalle.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from 'app/layout/materialComponent/material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseSidebarModule, FuseWidgetModule } from '@fuse/components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';

const routes: Routes = [
  {
      path     : '**',
      component: ReporteDetalleComponent,
      resolve  : {
      }
  }
];


@NgModule({
  declarations: [
    ReporteDetalleComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    FuseSharedModule,

    NgxChartsModule,

    FuseSidebarModule,
    FuseWidgetModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
  }),




    

  ]
})
export class ReporteDetalleModule { }
