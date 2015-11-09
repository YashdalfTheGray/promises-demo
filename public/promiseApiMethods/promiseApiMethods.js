/* global angular */

angular.module('promisesDemo')
.controller('PromiseApiMethodsCtrl',
    [
        '$timeout', '$q', '$scope', '$mdToast', 'clearInputSvc',
        function($timeout, $q, $scope, $mdToast, clearInputSvc) {
            "use strict";

            var vm = this;

            vm.codeBlocksRun = [];
            vm.timeoutInProgress = false;

            function timeoutPromiseWrapper(resolution, message, delay) {
                var def = $q.defer();

                vm.promise = $timeout(function() {
                    return message;
                }, delay * 1000).then(function(result) {
                    if (resolution === 'fulfill') {
                        def.resolve(result);
                    }
                    else if (resolution === 'reject') {
                        def.reject(result);
                    }
                });

                return def.promise;
            }

            vm.setTimeout = function(resolution, message, delay) {
                vm.codeBlocksRun = [];
                vm.timeoutInProgress = true;
                timeoutPromiseWrapper(resolution, message, delay)
                .then(function(result) {
                    vm.codeBlocksRun.push('then');
                    $mdToast.show(
                        $mdToast.simple()
                        .content(result)
                        .position('top right')
                        .hideDelay(3000)
                    );
                }).catch(function(result) {
                    vm.codeBlocksRun.push('catch');
                    $mdToast.show(
                        $mdToast.simple()
                        .content(result)
                        .position('top right')
                        .hideDelay(3000)
                    );
                }).finally(function() {
                    vm.codeBlocksRun.push('finally');
                    vm.timeoutInProgress = false;
                });

                clearInputSvc(['message-input', 'delay-input']);
            }

            $scope.$on('$destroy', function() {
                $timeout.cancel(vm.promise);
            });
        }
    ]
);