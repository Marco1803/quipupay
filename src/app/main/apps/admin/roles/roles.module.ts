import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ModalEventRolComponent } from './modal-event-rol/modal-event-rol.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FuseSharedModule } from '../../../../../@fuse/shared.module';
import { ModalEventRolMenuComponent } from './modal-event-rol-menu/modal-event-rol-menu.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MaterialModule } from 'app/layout/materialComponent/material.module';
import { FuseSidebarModule, FuseWidgetModule } from '@fuse/components';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  {
      path     : '**',
      component: RolesComponent,
      resolve  : {
      }
  }
];

@NgModule({
  declarations: [
    RolesComponent,
    ModalEventRolComponent,
    ModalEventRolMenuComponent
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
    MatTableModule,
    MatToolbarModule,
    FuseSharedModule,
    MatCheckboxModule,

    MaterialModule,
    NgxChartsModule,
    FuseSidebarModule,
    FuseWidgetModule,
    FlexLayoutModule
  ],
  providers : [],
  entryComponents: [
    ModalEventRolComponent,
    ModalEventRolMenuComponent
  ]
})
export class RolesModule { }
