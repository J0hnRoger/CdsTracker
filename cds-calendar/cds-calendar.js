(function() {
    'use strict';

    angular
        .module('app.cdsCalendar', [])
        .controller('cdsCalendarCtrl', cdsCalendarCtrl);

    /* @ngInject */
    function cdsCalendarCtrl($scope, dateService, tasksService, projectsService, $firebase, FireBaseRoot) {
        
        $scope.loading = true;
       
        activate();

        function activate() {

            projectsService.workInProgress().then(function(projectName){
                $scope.IWorkingOn = projectName;
            });
            
            var monday = dateService.getMonday(new Date());
            tasksService.getWeeksTasks(monday)
                    .then(function (week) {                    
                        $scope.week = week;
                });

        }

        $scope.update = function(task, $event){
           tasksService.updateTask(task);
        }

        $scope.remove = function (task) {
            tasksService.remove(task);
        }

        $scope.add = function(task) {

        }
    }
})();