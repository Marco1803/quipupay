import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from 'app/main/apps/admin/usuarios/usuarios.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FuseSharedModule } from '@fuse/shared.module';
import { CarganominaComponent } from './carganomina.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

const routes: Routes = [
  {
      path     : '**',
      component: CarganominaComponent,
      resolve  : {

      }
  }
];

@NgModule({
  declarations: [
    CarganominaComponent

  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule ,
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
    MatProgressBarModule
  ],
  providers : [],

})
export class CargaNominaModule { }