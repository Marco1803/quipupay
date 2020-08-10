import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
//import { FilesDataSource } from '../../dashboards/project/project.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, fromEvent, BehaviorSubject, Observable, merge } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ReporteDetalleService } from './reporte-detalle.service';
import { DataSource } from '@angular/cdk/table';
import { FuseUtils } from '@fuse/utils';
import { Rol } from 'app/main/models/rol.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-reporte-detalle',
  templateUrl: './reporte-detalle.component.html',
  styleUrls: ['./reporte-detalle.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
//ff uu nnn cc iii ooo nnn aaa
export class ReporteDetalleComponent implements  OnInit, OnDestroy {

  //paginado
  public desde: number = 0;





  displayedColumns = ['id', 'nombre', 'nombre_vista', 'is_admin', 'estado', 'fechacreacion'];
  dataSource : MatTableDataSource<Rol>;

  //tabla y columnas
  //dataSource: FilesDataSource | null;
  //dataSource: any[] = [];
  // dataSource = new MatTableDataSource<Rol>();
  // displayedColumns = ['estado', 'fechacreacion', 'id', 'is_admin', 'nombre', 'nombre_vista'];
  orders: Rol[];


  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */




  // Private


      /**
     * Constructor
     *
    //   
     */
  
  constructor(
    private _ReporteDetalleService: ReporteDetalleService
  ) {
            // Set the private defaults
            //this._unsubscribeAll = new Subject();
   }

  ngOnInit(): void {
    this.obtenerRoles();
    //this.dataSource = new FilesDataSource(this._ReporteDetalleService, this.paginator, this.sort);

    // fromEvent(this.filter.nativeElement, 'keyup')
    //     .pipe(
    //         takeUntil(this._unsubscribeAll),
    //         debounceTime(150),
    //         distinctUntilChanged()
    //     )
    //     .subscribe(() => {
    //         if ( !this.dataSource )
    //         {
    //             return;
    //         }
    //         this.dataSource.filter = this.filter.nativeElement.value;
    //     });
  }

  ngOnDestroy(): void
  {
    // Unsubscribe from all subscriptions
    // this._unsubscribeAll.next();
    // this._unsubscribeAll.complete();
  }

  obtenerRoles(){
    this._ReporteDetalleService.comercios_listar()
    .subscribe(
      (data: any) => {
        this.orders = data;
        //this.dataSource = data;
        //console.log('datos')
        //console.log(this.orders)
        this.dataSource = new MatTableDataSource(this.orders);

      });
  }


}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];

// export class FilesDataSource extends DataSource<any>
// {
//     // Private
//     private _filterChange = new BehaviorSubject('');
//     private _filteredDataChange = new BehaviorSubject('');

//     /**
//      * Constructor
//      *
//      * @param {ReporteDetalleService} _ReporteDetalleService
//      * @param {MatPaginator} _matPaginator
//      * @param {MatSort} _matSort
//      */
//     constructor(
//         private _ReporteDetalleService: ReporteDetalleService,
//         private _matPaginator: MatPaginator,
//         private _matSort: MatSort
//     )
//     {
//         super();

//         this.filteredData = this._ReporteDetalleService.orders;
//     }

//     // -----------------------------------------------------------------------------------------------------
//     // @ Accessors
//     // -----------------------------------------------------------------------------------------------------

//     // Filtered data
//     get filteredData(): any
//     {
//         return this._filteredDataChange.value;
//     }

//     set filteredData(value: any)
//     {
//         this._filteredDataChange.next(value);
//     }

//     // Filter
//     get filter(): string
//     {
//         return this._filterChange.value;
//     }

//     set filter(filter: string)
//     {
//         this._filterChange.next(filter);
//     }

//     // -----------------------------------------------------------------------------------------------------
//     // @ Public methods
//     // -----------------------------------------------------------------------------------------------------

//     /**
//      * Connect function called by the table to retrieve one stream containing the data to render.
//      *
//      * @returns {Observable<any[]>}
//      */
//     connect(): Observable<any[]>
//     {
//         const displayDataChanges = [
//             this._ReporteDetalleService.onOrdersChanged,
//             this._matPaginator.page,
//             this._filterChange,
//             this._matSort.sortChange
//         ];

//         return merge(...displayDataChanges).pipe(map(() => {

//                 let data = this._ReporteDetalleService.orders;
//                 console.log(data);
//                 data = this.filterData(data);

//                 this.filteredData = [...data];

//                 data = this.sortData(data);

//                 // Grab the page's slice of data.
//                 const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
//                 return data.splice(startIndex, this._matPaginator.pageSize);
//             })
//         );

//     }

//     /**
//      * Filter data
//      *
//      * @param data
//      * @returns {any}
//      */
//     filterData(data): any
//     {
//         if ( !this.filter )
//         {
//             return data;
//         }
//         return FuseUtils.filterArrayByString(data, this.filter);
//     }

//     /**
//      * Sort data
//      *
//      * @param data
//      * @returns {any[]}
//      */
//     sortData(data): any[]
//     {
//         if ( !this._matSort.active || this._matSort.direction === '' )
//         {
//             return data;
//         }

//         return data.sort((a, b) => {
//             let propertyA: number | string = '';
//             let propertyB: number | string = '';

//             switch ( this._matSort.active )
//             {
//                 case 'comercio':
//                     [propertyA, propertyB] = [a.comercio, b.comercio];
//                     break;
//                 case 'comerciogrupoid':
//                     [propertyA, propertyB] = [a.comerciogrupoid, b.comerciogrupoid];
//                     break;
//                 case 'comercioid':
//                     [propertyA, propertyB] = [a.comercioid, b.comercioid];
//                     break;
//                 case 'estado':
//                     [propertyA, propertyB] = [a.estado, b.estado];
//                     break;
//                 case 'username':
//                     [propertyA, propertyB] = [a.username, b.username];
//                     break;
//                 case 'usuariocomercioid':
//                     [propertyA, propertyB] = [a.usuariocomercioid, b.usuariocomercioid];
//                     break;
//                 // case 'date':
//                 //     [propertyA, propertyB] = [a.date, b.date];
//                 //     break;
//             }

//             const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
//             const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

//             return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
//         });
//     }

//     /**
//      * Disconnect
//      */
//     disconnect(): void
//     {
//     }
// }
