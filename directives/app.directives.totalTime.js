(function() {
    'use strict';

    angular
        .module('app.directives.totalDay', [])
        .directive('totalTime', totalTime)
        .directive('decimalPassedTime', decimalPassedTime);

    //$timeout for prevent  "$digest already in progress" error
    function totalTime ($filter, $timeout) {
        var directive = {
            scope : {
                tasks : "="
            },
            link: linkFunction,
            restrict : 'A'
        };

        function linkFunction(scope, element, attrs){
            
            scope.$watch('tasks', function(){
                var total = 0;
                angular.forEach(scope.tasks, function(task){
                    total += parseInt(task.duration);
                });

                $timeout(function() {
                    element.empty().append($filter('friendlyHour')(total));
                }, 0);
            }, true);
        }

        return directive;
    }


    //$timeout for prevent  "$digest already in progress" error
    function decimalPassedTime ($filter, $timeout) {
        var directive = {
            scope : {
                tasks : "=",
                time : "="
            },
            link: linkFunction,
            restrict : 'E'
        };

        function linkFunction(scope, element, attrs){
            
            scope.$watch('tasks', function(){
                var total = 0;
                angular.forEach(scope.tasks, function(task){
                    total += parseInt(task.duration);
                });

                $timeout(function() {
                    element.empty().append($filter('passedTime')(scope.time, total));
                }, 0);
            }, true);
        }

        return directive;
    }
})();