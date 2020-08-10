import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ComerciosComponent } from './comercios.component';
import { ModalEventComponent } from '../usuarios/modal-event/modal-event.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FuseSharedModule } from '../../../../../@fuse/shared.module';
import { ModalEventComComponent } from './modal-event-com/modal-event-com.component';
import { MaterialModule } from 'app/layout/materialComponent/material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseSidebarModule, FuseWidgetModule } from '@fuse/components';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  {
      path     : '**',
      component: ComerciosComponent,
      resolve  : {
      }
  }
];

@NgModule({
  declarations: [
    ComerciosComponent,
    ModalEventComComponent
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
    ModalEventComComponent
  ]
})
export class ComerciosModule { }
