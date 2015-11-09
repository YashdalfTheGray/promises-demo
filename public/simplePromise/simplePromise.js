/* global angular */

angular.module('promisesDemo')
.controller('SimplePromiseCtrl',
    [
        '$timeout', '$scope', '$mdToast', 'clearInputSvc',
        function($timeout, $scope, $mdToast, clearInputSvc) {
            "use strict";

            var vm = this;

            vm.timeoutInProgress = false;

            vm.setTimeout = function(message, delay) {
                vm.timeoutPromise = $timeout(function() {
                    return message;
                }, delay * 1000).then(function(result) {
                    $mdToast.show(
                        $mdToast.simple()
                        .content(result)
                        .position('top right')
                        .hideDelay(3000)
                    );
                    vm.timeoutInProgress = false;
                });
                vm.timeoutInProgress = true;

                clearInputSvc(['message-input', 'delay-input']);
            };

            $scope.$on('$destroy', function() {
                $timeout.cancel(vm.timeoutPromise);
            });
        }
    ]
);