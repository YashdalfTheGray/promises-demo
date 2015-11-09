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
