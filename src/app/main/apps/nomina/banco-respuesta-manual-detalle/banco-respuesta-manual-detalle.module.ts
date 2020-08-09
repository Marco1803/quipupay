import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
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
import { BancoRespuestaManualDetalleService } from './banco-respuesta-manual-detalle.service';
import { BancoRespuestaManualDetalleComponent } from './banco-respuesta-manual-detalle.component';
import { MatListModule } from '@angular/material/list';

const routes: Routes = [
  {
    path     : '**',
    component: BancoRespuestaManualDetalleComponent,
    resolve  : {
    }
  }
];

@NgModule({
  declarations: [
    BancoRespuestaManualDetalleComponent
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
    MatListModule,
    MatSortModule
  ]
})
export class BancoRespuestaManualDetalleModule { }
