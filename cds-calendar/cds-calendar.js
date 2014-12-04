(function() {
    'use strict';

    angular
        .module('app.cdsCalendar', [])
        .controller('cdsCalendarCtrl', cdsCalendarCtrl);

    /* @ngInject */
    function cdsCalendarCtrl($scope, tasksService, dateService, projectsService, $firebase, FireBaseRoot) {
        
        $scope.title = 'cdsCalendarCtrl';
        $scope.loading = true;
       
        activate();

        function activate() {

            projectsService.workInProgress().then(function(projectName){
                $scope.IWorkingOn = projectName;
            });

            
            var day = dateService.getFirstWeekDayTime();
            var week = tasksService.getTasksByWeek(day)
                    .then(function (week) {                    
                        $scope.week = week;
                });
        }

        $scope.updateTaskTime = function(task, day, time){
            //task.duration =  dateService.getTimeStampFromDecimal(time, day.timeSpent);
            day.tasks[task.id].$priority = task.$priority;
            //day.tasks.$save();
        }
    }
})();