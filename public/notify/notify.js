/* global angular */

angular.module('promisesDemo')
.controller('NotifyCtrl',
    [
        '$q', '$timeout', '$scope', 'clearInputSvc',
        function($q, $timeout, $scope, clearInputSvc) {
            "use strict";

            var vm = this;

            vm.promiseInProgress = false;
            vm.notifyPromises = [];
            vm.progressValue = 0;

            function notifyFunction(message, delay) {
                var def = $q.defer();
                var notification = 0;

                for (var i = 0; i < 10; i++) {
                    var notifyPromise = $timeout(function() {
                        def.notify(notification++);
                    }, i * (delay / 10.0));
                    vm.notifyPromises.push(notifyPromise);
                }

                vm.promsise = $timeout(function() {
                    def.resolve(message);
                }, delay);

                return def.promise;
            }

            vm.setTimeout = function(message, delay) {
                vm.promiseInProgress = true;
                vm.notifyProgress = 0;
                vm.returnMessage = '';

                notifyFunction(message, delay * 1000).then(function(result) {
                    vm.returnMessage = result;
                }).catch(function(error) {
                    console.log(error);
                }).finally(function() {
                    vm.promiseInProgress = false;
                    vm.notifyPromises = [];
                }, function(notify) {
                    vm.progressValue = notify;
                });

                clearInputSvc(['message-input', 'delay-input']);
            };

            $scope.$on('$destroy', function() {
                _.forEach(vm.notifyPromises, function(p) {
                    $timeout.cancel(p);
                });
                $timeout.cancel(vm.promise);
            });
        }
    ]
)