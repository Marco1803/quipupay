import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReporteComponent } from './reporte.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/layout/materialComponent/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseSidebarModule, FuseWidgetModule } from '@fuse/components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';


const routes: Routes = [
  {
      path     : '**',
      component: ReporteComponent,
      resolve  : {
      }
  }
];


@NgModule({
  declarations: [
    ReporteComponent
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
export class ReporteModule { }
