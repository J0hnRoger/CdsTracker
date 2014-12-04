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
            var week = tasksService.getWeeksTasks(monday)
                    .then(function (week) {                    
                        $scope.week = week;
                });
        }

        $scope.updateTaskTime = function(task, time){
            //task.duration =  dateService.getTimeStampFromDecimal(time, day.timeSpent);
           //updateTask(task, description);
            //day.tasks.$save();
        }

         $scope.updateTaskDescription = function(task, description){
            //task.duration =  dateService.getTimeStampFromDecimal(time, day.timeSpent);
            tasksService.updateTask(task, description);
            //day.tasks.$save();
        }

    }
})();