import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import * as shape from 'd3-shape';

import { fuseAnimations } from '@fuse/animations';

import { ProjectDashboardService } from 'app/main/apps/dashboards/project/project.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

//fechas
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { ThemePalette } from '@angular/material/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { dashboardCabModel } from 'app/main/models/dashboardModel.model';
const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
// fin fechas

@Component({
    selector: 'project-dashboard',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    //fechas
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
    ]
})
export class ProjectDashboardComponent implements OnInit {

    //formulario busqueda
    busquedaForm: FormGroup;

    comercioId = '';
    cantTotal = 0;
    montoTotal = 0;
    moneda = '';

    projects: any[];
    projectsData: dashboardCabModel[] =[];
    selectedProject: any;

    widgets: any;
    widget5: any = {};
    widget55: any = {};
    widget6: any = {};
    widget7: any = {};
    widget8: any = {};
    widget9: any = {};
    widget11: any = {};

    dateNow = Date.now();

    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = false;
    rotateXAxisTicks = false;
    showXAxisLabel = true;
    xAxisLabel = '';
    showYAxisLabel = true;
    yAxisLabel = '';

    colorScheme = {
        domain: ['#3949ab', '#3949ab', '#3949ab', '#3949ab']
      };

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {ProjectDashboardService} _projectDashboardService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _projectDashboardService: ProjectDashboardService,
        private formBuilder: FormBuilder
    ) {
        /**
         * Widget 5
         */
        // this.widget5 = {
        //     currentRange: '',
        //     xAxis: true,
        //     yAxis: true,
        //     gradient: false,
        //     legend: false,
        //     showXAxisLabel: false,
        //     xAxisLabel: 'Days',
        //     showYAxisLabel: false,
        //     yAxisLabel: 'Cantidad',
        //     scheme: {
        //         domain: ['#3949ab', '#C6ECFD', '#C7B42C', '#AAAAAA']
        //     },
        //     onSelect: (ev) => {
        //         console.log(ev);
        //     },
        //     supporting: {
        //         currentRange: '',
        //         xAxis: false,
        //         yAxis: false,
        //         gradient: false,
        //         legend: false,
        //         showXAxisLabel: false,
        //         xAxisLabel: 'Days',
        //         showYAxisLabel: false,
        //         yAxisLabel: 'Isues',
        //         scheme: {
        //             domain: ['#3949ab', '#C6ECFD', '#C7B42C', '#AAAAAA']
        //         },
        //         curve: shape.curveBasis
        //     }
        // };

        /**
       * Widget 5
       */
      //linear-gradient(to right,rgb(78, 44, 209) 0%, rgb(2, 184, 237) 100%);
        this.widget55 = {
            currentRange: 'TW',
            xAxis: true,
            yAxis: true,
            gradient: false,
            legend: false,
            showXAxisLabel: false,
            xAxisLabel: 'Days',
            showYAxisLabel: false,
            yAxisLabel: 'Isues',
            scheme: {
                domain: ['#3949ab', '#C6ECFD', '#C7B42C', '#AAAAAA']
            },
            onSelect: (ev) => {
                console.log(ev);
            },
            supporting: {
                currentRange: '',
                xAxis: false,
                yAxis: false,
                gradient: false,
                legend: false,
                showXAxisLabel: false,
                xAxisLabel: 'Days',
                showYAxisLabel: false,
                yAxisLabel: 'Isues',
                scheme: {
                    domain: ['#3949ab', '#C6ECFD', '#C7B42C', '#AAAAAA']
                },
                curve: shape.curveBasis
            }
        };

        /**
         * 
         * Widget 6
         */
        this.widget6 = {
            currentRange: 'TW',
            legend: false,
            explodeSlices: false,
            labels: true,
            doughnut: true,
            gradient: false,
            scheme: {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63']
            },
            onSelect: (ev) => {
                console.log(ev);
            }
        };

        /**
         * Widget 7
         */
        this.widget7 = {
            currentRange: 'T'
        };

        /**
         * Widget 8
         */
        this.widget8 = {
            legend: false,
            explodeSlices: false,
            labels: true,
            doughnut: false,
            gradient: false,
            scheme: {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63', '#ffc107']
            },
            onSelect: (ev) => {
                console.log(ev);
            }
        };

        /**
         * Widget 9
         */
        this.widget9 = {
            currentRange: 'TW',
            xAxis: false,
            yAxis: false,
            gradient: false,
            legend: false,
            showXAxisLabel: false,
            xAxisLabel: 'Days',
            showYAxisLabel: false,
            yAxisLabel: 'Isues',
            scheme: {
                domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
            },
            curve: shape.curveBasis
        };

        setInterval(() => {
            this.dateNow = Date.now();
        }, 1000);

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        //formulario
        //this.projectsData = new dashboardCabModel[];
        //this.projectsData[0].cantidad=[];
        //this.projectsData[0].monto=[];
        this.initBuscador();
        //this.obtenerComercios();
        this.grabarUsuario();


        this.projects = this._projectDashboardService.projects;
        this.selectedProject = this.projects[0];
        this.widgets = this._projectDashboardService.widgets;

        /**
         * Widget 11
         */
        this.widget11.onContactsChanged = new BehaviorSubject({});
        this.widget11.onContactsChanged.next(this.widgets.widget11.table.rows);
        this.widget11.dataSource = new FilesDataSource(this.widget11);
    }

    //Iniciualizando Forms
    initBuscador() {
        this.busquedaForm = this.formBuilder.group({
            fechaIni: new FormControl(moment(new Date(), 'DD MM').format('YYYY-MM-DD')),
            fechaFin: new FormControl(moment(new Date(), 'DD MM').format('YYYY-MM-DD')),
            comercioId:new FormControl('')
        });
    }

    onSelect(event) {
        //console.log(event);
      }

    //Obtener Datos
  obtenerComercios() {
    Swal.fire({
      title: 'Espere por favor  ...',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    this._projectDashboardService.obtenerProjectData([])
      .subscribe(
        (data) => {
            

          console.log('comercio');
          console.log(data);
          this.projectsData = data;
          Swal.close();

        });
   
  }

    //Acciones
    grabarUsuario() {

          Swal.fire({
      title: 'Espere por favor  ...',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    //timeout

    let dataCargada = '';
    let datacargada2 = [];


        if (dataCargada == '' || dataCargada == null) {
          //alert('no hay nada' );
          setTimeout(() => {
            let comercioId = localStorage.getItem('comercioId');
            console.log(comercioId);
            this.comercioId =  comercioId;

                if(this.comercioId == '' ){
                  console.log('no hay data');
                  dataCargada = '';
                  this.grabarUsuario();
                }else{

                    console.log('este es el comercio', this.comercioId)
                    let jsonsend = {
                        fechaIni: moment(this.busquedaForm.get('fechaIni').value).format("YYYY-MM-DD"),
                        fechaFin: moment(this.busquedaForm.get('fechaFin').value).format("YYYY-MM-DD"),
                        comercioId : this.comercioId
                    }
                    console.log(jsonsend);
            
                    this._projectDashboardService.obtenerProjectData(jsonsend)
                    .subscribe(
                      (data) => {

                        console.log('comercio');
                        console.log(data['cantTotal']);
                        this.projectsData = data;
                        this.montoTotal = data['montoTotal'];
                        this.cantTotal = data['cantTotal'];
                        this.moneda = data['moneda'];
                        Swal.close();
              
                      });
                }
          }, 1000);
        }
    //timeout









        // let jsonsend = {
        //     fechaIni: moment(this.busquedaForm.get('fechaIni').value).format("YYYY-MM-DD"),
        //     fechaFin: moment(this.busquedaForm.get('fechaFin').value).format("YYYY-MM-DD")
        // }
        // console.log(jsonsend);

        // this._projectDashboardService.obtenerProjectData(jsonsend)
        // .subscribe(
        //   (data) => {
              
  
        //     console.log('comercio');
        //     console.log(data);
        //     this.projectsData = data;
        //     Swal.close();
  
        //   });
    }
    
    convertir(number){
        let nuevoValor = parseFloat(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        return nuevoValor;
      }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param _widget11
     */
    constructor(private _widget11) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this._widget11.onContactsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }
}

