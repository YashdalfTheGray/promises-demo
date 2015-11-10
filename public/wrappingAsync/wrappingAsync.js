/* global angular */

angular.module('promisesDemo')
.controller('WrappingAsyncCtrl',
    [
        '$q', '$timeout', '$scope', '$mdToast',
        function($q, $timeout, $scope, $mdToast) {
            "use strict";

            var vm = this;

            vm.promiseInProgress = false;

            function asyncFunction() {
                vm.promise = $timeout(function() {
                    return 'This is delayed resolution.';
                }, 1000);
                return vm.promise;
            }

            function syncFunction() {
                return 'This is immediate resolution.';
            }

            vm.immediateResolve = function() {
                vm.promiseInProgress = true;
                $q.when(syncFunction()).then(function(result) {
                    vm.promiseInProgress = false;
                    $mdToast.show(
                        $mdToast.simple()
                        .content(result)
                        .position('top right')
                        .hideDelay(3000)
                    );
                });
            };

            vm.delayedResolve = function() {
                vm.promiseInProgress = true;
                $q.when(asyncFunction()).then(function(result) {
                    vm.promiseInProgress = false;
                    $mdToast.show(
                        $mdToast.simple()
                        .content(result)
                        .position('top right')
                        .hideDelay(3000)
                    );
                });
            };

            $scope.$on('$destroy', function() {
                $timeout.cancel(vm.promise);
            });
        }
    ]
);