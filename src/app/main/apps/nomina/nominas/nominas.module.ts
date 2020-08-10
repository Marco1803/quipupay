import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NominasComponent } from './nominas.component';
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
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { DetalleNominaComponent } from '../detalle-nomina/detalle-nomina.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseWidgetModule, FuseSidebarModule } from '@fuse/components';
import { MaterialModule } from 'app/layout/materialComponent/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  {
      path     : '**',
      component: NominasComponent,
      resolve  : {
      }
  }
];

@NgModule({
  declarations: [
    NominasComponent
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
    MatChipsModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,

    MaterialModule,
    NgxChartsModule,
    FuseSidebarModule,
    FuseWidgetModule,
    FlexLayoutModule,
  ]
})
export class NominasModule { }
