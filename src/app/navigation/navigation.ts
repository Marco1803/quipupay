import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    // {
    //     id       : 'applications',
    //     title    : 'Applications',
    //     translate: 'NAV.APPLICATIONS',
    //     type     : 'group',
    //     children : [
    //         {
    //             id       : 'sample',
    //             title    : 'Sample',
    //             translate: 'NAV.SAMPLE.TITLE',
    //             type     : 'item',
    //             icon     : 'email',
    //             url      : '/sample',
    //             badge    : {
    //                 title    : '25',
    //                 translate: 'NAV.SAMPLE.BADGE',
    //                 bg       : '#F44336',
    //                 fg       : '#FFFFFF'
    //             }
    //         }
    //     ]
    // }
    {
        id       : '',
        title    : '',
        translate: '',
        type     : 'group',
        icon     : 'apps',
        children : [
            {
                id       : 'dashboards',
                title    : 'Dashboards',
                translate: 'NAV.DASHBOARDS',
                type     : 'collapsable',
                icon     : 'dashboard',
                children : [
                    {
                        id   : 'analytics',
                        title: 'Analytics',
                        type : 'item',
                        url  : '/apps/dashboards/analytics'
                    },
                    {
                        id   : 'project',
                        title: 'Project',
                        type : 'item',
                        url  : '/apps/dashboards/project'
                    }
                ]
            },
            {
                id       : 'Admin',
                title    : 'Admin',
                translate: 'NAV.ADMIN',
                type     : 'collapsable',
                icon     : 'dashboard',
                children : [
                    {
                        id   : 'Usuarios',
                        title: 'Lista de Usuarios',
                        type : 'item',
                        url  : '/apps/admin/usuarios'
                    },
                    {
                        id   : 'Comercios',
                        title: 'Lista de Comercios',
                        type : 'item',
                        url  : '/apps/admin/comercios'
                    }
                ]
            }
        ]
    }
];
