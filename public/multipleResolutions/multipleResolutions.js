/* global angular */

angular.module('promisesDemo')
.controller('MultipleResolutionsCtrl',
    [
        '$timeout', '$q', '$scope', 'clearInputSvc',
        function($timeout, $q, $scope, clearInputSvc) {
            "use strict";

            var vm = this;

            vm.timeoutInProgress = false;
            vm.promises = [];
            vm.delays = [];
            vm.messages = [];

            vm.setTimeout = function(delays) {
                vm.timeoutInProgress = true;
                vm.messages = [];
                _.forEach(delays, function(d, key) {
                    var promise = $timeout(function() {
                        return 'This is message number ' + (key + 1).toString() + '.';
                    }, d * 1000);
                    vm.promises.push(promise);
                });

                $q.all(vm.promises).then(function(result) {
                    vm.timeoutInProgress = false;
                    vm.delays = [];
                    vm.promises = [];
                    vm.messages = result;
                });

                clearInputSvc(['delay1-input', 'delay2-input', 'delay3-input', 'delay4-input']);
            }

            $scope.$on('$destroy', function() {
                _.forEach(vm.promises, function(p) {
                    $timeout.cancel(p);
                });
            });
        }
    ]
)