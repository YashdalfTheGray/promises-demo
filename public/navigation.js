/* global angular */

angular.module('promisesDemo')
.controller('ToolbarCtrl',
    [
        '$state', '$mdSidenav',
        function($state, $mdSidenav) {
            "use strict";

            var vm = this;

            vm.isHome = function() {
                return $state.is('home');
            };

            vm.showNav = function() {
                $mdSidenav('demo').toggle();
            };
        }
    ]
)
.controller('SidebarCtrl',
    [
        '$state', '$mdSidenav',
        function($state, $mdSidenav) {
            "use strict";

            var vm = this;

            vm.goTo = function goToState(state) {
                $state.go(state);
                if(!$mdSidenav('demo').isLockedOpen()) {
                    $mdSidenav('demo').close();
                }
            };

            vm.demos = [
                { name: 'Simple Promise Handling', state: 'simple-promise' },
                { name: 'Promise Syntax', state: 'promise-syntax' },
                { name: 'Then-Catch-Finally', state: 'then-catch-finally' },
                { name: 'Chaining Promises' , state: 'chaining' },
                { name: 'Wrapping other Async Operations', state: 'when' },
                { name: 'Waiting for multiple resolutions', state: 'resolve-all' },
                { name: 'Notify', state: 'notify' }
            ];
        }
    ]
);