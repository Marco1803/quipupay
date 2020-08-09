import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuseSharedModule } from '../../../../../@fuse/shared.module';
import { BancoRespuestaManualComponent } from './banco-respuesta-manual.component';

import { MaterialModule } from 'app/layout/materialComponent/material.module';

const routes: Routes = [
  {
      path     : '**',
      component: BancoRespuestaManualComponent,
      resolve  : {
      }
  }
];

@NgModule({
  declarations: [
    BancoRespuestaManualComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    FuseSharedModule,
  ]
})
export class BancoRespuestaManualModule { }
