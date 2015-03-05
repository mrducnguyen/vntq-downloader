/**
 * @license VNThuQuan downloader
 * (c) 2015 mrducnguyen - http://ducn.co
 * License: MIT
 */

'use strict';

/**
 * @doc module
 * @name Application
 * @description The application module is just a main entry point of the application, declaring dependencies on other modules
 */
angular.module('vntqApp', ['vntqControllers', 'vntqDirectives', 'vntqServices', 'vntqFilters'])
    .config(['$sceDelegateProvider', function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist(appConfig.trustedSites);
        // moved to services module
        // $httpProvider.defaults.withCredentials = true;
        // $httpProvider.defaults.cache = false;
        // $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
    }]);

