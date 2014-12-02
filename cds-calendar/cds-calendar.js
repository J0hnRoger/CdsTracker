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
            var firstDayOfTheWeek = dateService.getFirstWeekDayTime();

            projectsService.workInProgress().then(function(projectName){
                $scope.IWorkingOn = projectName;
            });

            var currDay = firstDayOfTheWeek;
            var week = tasksService.getTasksByWeek(currDay)
                    .then(function (week) {                    
                        $scope.week = week;
            });
        }

        $scope.updateTaskTime = function(task, day, time){
            task.duration =  dateService.getTimeStampFromDecimal(time, day.timeSpent);
            day.tasks.$save();
        }
    }
})();