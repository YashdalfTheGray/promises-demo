/* global angular */

angular.module('promisesDemo')
.controller('ChainingCtrl',
    [
        '$timeout', '$scope', 'clearInputSvc',
        function($timeout, $scope, clearInputSvc) {
            "use strict";

            var vm = this;
            vm.receivedMessages = [];
            vm.messages = [];
            vm.delays = [];
            vm.timeoutInProgress = false;

            vm.setTimeout = function(messages, delays) {
                vm.timeoutInProgress = true;
                vm.receivedMessages = [];
                vm.promise1 = $timeout(function() {
                    return messages[0];
                }, delays[0] * 1000);

                vm.promise1.then(function(result) {
                    vm.receivedMessages.push(result);
                    vm.promise2 = $timeout(function() {
                        return messages[1];
                    }, delays[1] * 1000);

                    return vm.promise2;
                }).then(function(result) {
                    vm.receivedMessages.push(result);
                    vm.timeoutInProgress = false;
                }).catch(function(error) {
                    console.log(error);
                    vm.timeoutInProgress = false;
                });

                clearInputSvc(['message1-input', 'delay1-input', 'message2-input', 'delay2-input']);
            };

            $scope.$on('$destroy', function() {
                $timeout.cancel(vm.promise1);
                $timeout.cancel(vm.promise2);
            });
        }
    ]
)