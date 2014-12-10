(function() {
    'use strict';

    angular
        .module('app.directives.totalDay', [])
        .directive('totalTime', totalTime);

    function totalTime ($filter) {
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
                })
                element.empty().append($filter('friendlyHour')(total));
            }, true);
        }

        return directive;
    }
})();