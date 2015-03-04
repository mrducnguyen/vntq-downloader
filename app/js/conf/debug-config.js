/*
*   requirejs config file
*/

require.config({
    baseUrl: '',
    waitSeconds: 200, // large for slow network...
    urlArgs: "bust=" + (new Date()).getTime(), // no cache
    paths: {

        //other libraries
        jquery: '../libs/jquery/dist/jquery',

        //angular
        angular: '../libs/angular/angular',

        //FileSaver
        fileSaver: '../libs/FileSaver/FileSaver',

        // Application Angular modules
        //
        appModules: 'js/modules/app',
        filters: 'js/modules/filters',
        services: 'js/modules/services',
        directives: 'js/modules/directives',
        controllers: 'js/modules/controllers',

        // Application codes: Configurations, helpers...
        appMain: 'js/app-main',
        appConfig: 'js/conf/app-config',
        helpers: 'js/modules/helpers',
        loadCss: 'js/modules/load-css'
    },

    shim: {
        'jquery' : {
            exports: 'jquery'
        },

        'angular' : {
            deps: ['jquery']
        },

        'services': {
            deps: ['appConfig', 'angular']
        },

        'directives': {
            deps: ['angular']
        },

        'filters': {
            deps: ['angular', 'helpers']
        },

        'controllers': {
            deps: ['filters', 'fileSaver']
        },

        'helpers': {
            deps: ['appConfig']
        },

        'loadCss': {
            deps: ['helpers']
        },

        'appModules': {
            deps: ['appConfig', 'services', 'filters', 'directives', 'controllers', 'loadCss']
        },

        'appMain' : {
            deps: ['appModules']
        }
    }
});

requirejs(['appMain']);