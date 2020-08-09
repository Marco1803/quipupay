import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuseSharedModule } from '../../../../../@fuse/shared.module';
import { MaterialModule } from 'app/layout/materialComponent/material.module';
import { BancoNominaDetalleComponent } from './banco-nomina-detalle.component';

const routes: Routes = [
  {
      path     : '**',
      component: BancoNominaDetalleComponent,
      resolve  : {
      }
  }
];

@NgModule({
  declarations: [
    BancoNominaDetalleComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    FuseSharedModule,
  ],
  providers : [],
  entryComponents: [
  ]
})
export class BancoNominaDetalleModule { }
