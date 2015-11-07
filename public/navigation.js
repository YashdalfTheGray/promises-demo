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
                { name: 'Simple Promise', state: 'simple-promise' },
                { name: 'Then-Catch-Finally', state: 'then-catch-finally' },
            ];
        }
    ]
);