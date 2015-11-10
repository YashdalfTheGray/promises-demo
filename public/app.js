/* global angular */
/* global _ */

angular.module('promisesDemo', 
    [
        'ui.router',
        'ngAnimate',
        'ngMaterial',
        'firebase',
        'gist'
    ]
)
.config(
    [
        '$urlRouterProvider', '$stateProvider', '$mdThemingProvider',
        function($urlRouterProvider, $stateProvider, $mdThemingProvider) {
            "use strict";

            $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/home.tpl.html',
                controller: 'HomeCtrl as ctrl'
            })
            .state('simple-handling', {
                url: '/simple',
                templateUrl: 'simplePromise/simplePromise.tpl.html',
                controller: 'SimplePromiseCtrl as ctrl'
            })
            .state('promise-api', {
                url: '/promise-api',
                templateUrl: 'promiseApiMethods/promiseApiMethods.tpl.html',
                controller: 'PromiseApiMethodsCtrl as ctrl'
            })
            .state('chaining', {
                url: '/chaining',
                templateUrl: 'chaining/chaining.tpl.html',
                controller: 'ChainingCtrl as ctrl'
            })
            .state('when', {
                url: '/when',
                templateUrl: 'wrappingAsync/wrappingAsync.tpl.html',
                controller: 'WrappingAsyncCtrl as ctrl'
            })
            .state('resolve-all', {
                url: '/resolve-all',
                templateUrl: 'multipleResolutions/multipleResolutions.tpl.html',
                controller: 'MultipleResolutionsCtrl as ctrl'
            })
            .state('notify', {
                url: '/notify',
                templateUrl: 'notify/notify.tpl.html',
                controller: 'NotifyCtrl as ctrl'
            });
            $urlRouterProvider.otherwise('/');

            $mdThemingProvider.theme('default')
                .primaryPalette('blue-grey')
                .accentPalette('amber',{
                    'default': 'A400',
                    'hue-1': 'A700'
                })
                .warnPalette('red');
        }
    ]
);
