import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ComerciosComponent } from '../comercios/comercios.component';
import { GruposComponent } from './grupos.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FuseSharedModule } from '@fuse/shared.module';
import { ModalGruposEventComponent } from './modal-grupos-event/modal-grupos-event.component';
import { MaterialModule } from 'app/layout/materialComponent/material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseSidebarModule, FuseWidgetModule } from '@fuse/components';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  {
      path     : '**',
      component: GruposComponent,
      resolve  : {
      }
  }
];


@NgModule({
  declarations: [
    GruposComponent,
    ModalGruposEventComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    FuseSharedModule,

    MaterialModule,
    NgxChartsModule,
    FuseSidebarModule,
    FuseWidgetModule,
    FlexLayoutModule
  ],
  providers : [],
  entryComponents: [
    ModalGruposEventComponent
  ]
})
export class GruposModule { }
