/*
* main file
*/

require.config({
    baseUrl: '',
    waitSeconds: 200, // large for slow network...
    urlArgs: "bust=" + (new Date()).getTime(), // no cache
    paths: {
        jquery: '../libs/jquery/dist/jquery.min',
        // bootstrap: '../libs/bootstrap/dist/js/bootstrap.min',
        // bootstrapSelect: '../libs/bootstrap-select/dist/js/bootstrap-select.min',
        // angular: '../libs/angular/angular.min',
        // angularRoute: '../libs/angular-route/angular-route.min',
        // angularAnimate: '../libs/angular-animate/angular-animate.min',

        appConfig: 'js/conf/app-config',

        appModules: 'js/app.min',
        appMain : 'js/app-main'
    },
    shim: {
        'jquery' : {
            exports: 'jquery'
        },
        // 'bootstrap' : {
        //     deps: ['jquery']
        // },

        // 'bootstrapSelect' : {
        //     deps: ['bootstrap']
        // },

        // // just need to make sure boostrap select is loaded before angular....
        // 'angular': {
        //     deps: ['bootstrapSelect']
        // },

        // 'angularRoute' : {
        //     deps: ['angular']
        // },

        // 'angularAnimate' : {
        //     deps: ['angular']
        // },

        'appModules': {
            deps:['appConfig', 'jquery']//, 'angularRoute', 'angularAnimate']
        },

        'appMain' : {
            deps: ['appModules']
        }
    }
});

if (window.console) {
    window.console.log = function () {}; // remove all console log
}

requirejs(['appMain']);