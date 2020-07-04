import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Navigation } from 'app/main/models/navigation.model';
import { NavigationService } from '../../../../../navigation/navigation.service';
import {BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { RolesService } from '../roles.service';
import { CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { ThemePalette } from '@angular/material/core';

export interface Task {
  completed: boolean;
}

@Component({
  selector: 'app-modal-event-rol-menu',
  templateUrl: './modal-event-rol-menu.component.html',
  styleUrls: ['./modal-event-rol-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ModalEventRolMenuComponent implements OnInit {

  action: string;
  dialogTitle: string;
  menuForm: FormGroup;
  listaMenu: Navigation[] = []
  menuDataSource: MenuDataSource;
  columnasTablaMenu: string[] = [
    'varios'
  ]; 

  allComplete: boolean = false;

  constructor(
    public matDialogRef: MatDialogRef<ModalEventRolMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: Navigation,
    private formBuilder: FormBuilder,
    public _navigateService: NavigationService
  ) {
    this.menuDataSource = new MenuDataSource(this._navigateService);
    if (_data.id === undefined) {
      this.dialogTitle = 'Accesos';
      this.action = 'Guardar';
    } else {
      this.dialogTitle = 'Accesos';
      this.action = 'Modificar';
      this.showMenu();
    }
  }

  ngOnInit(): void {
    this.cargarAlmacenes();
  }

  cargarAlmacenes() {
    this.menuDataSource.cargarAlmacenes();
  }

  ngOnDestroy(): void {
  }

  showMenu() {
    this._navigateService.obtenerMenu()
    .subscribe(
      (data : any[]) => { 
        data.forEach((value) => { value.completo = false; });
        this.listaMenu = data;
        console.log( this.listaMenu)
      });
  }
  
  updateAllComplete(id) {
   // this.allComplete = this.listaMenu.find(obj => obj.id === id) != null && this.listaMenu.find(obj => obj.id === id).children.every(t => t.completo);
  }

  someComplete(id): boolean {
    /* if (this.listaMenu.find(obj => obj.id === id).children == null) {
      return false;
    }
    return t his.listaMenu.find(obj => obj.id === id).children.filter(t => t.completo).length > 0 && !this.allComplete;
  */
 return true;
}

  setAll(id,completed: boolean) {
   /*  this.allComplete = completed;
    if (this.listaMenu.find(obj => obj.id === id).children == null) {
      return;
    }
    this.listaMenu.find(obj => obj.id === id).children.forEach(t => t.completo = completed); */
    return true;
  }
}

export class MenuDataSource  implements DataSource<Navigation> {

  private plantaSubject = new BehaviorSubject<Navigation[]>([]);
  private cargandoSubject = new BehaviorSubject<boolean> (false);
  public cargando = this.cargandoSubject.asObservable();
  public totalRegistros = 0;

  constructor(private _navigationService: NavigationService) { }

  connect(collectionViewer: CollectionViewer): Observable<Navigation[]> {
      return this.plantaSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer) {
      this.plantaSubject.complete();
      this.cargandoSubject.complete();
  }

  cargarAlmacenes() {
      this.cargandoSubject.next(true);
      this._navigationService.obtenerMenu()
      .pipe(
          catchError(() => of([])),
          finalize(() => this.cargandoSubject.next(false))
      )
      .subscribe((menuNav: Navigation[]) => {
        console.log(menuNav);
          this.plantaSubject.next(menuNav);
      });
  }
}
