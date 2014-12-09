(function() {
    'use strict';

    angular
        .module('app.cdsCalendar', [])
        .controller('cdsCalendarCtrl', cdsCalendarCtrl);

    /* @ngInject */
    function cdsCalendarCtrl($scope, dateService, tasksService, projectsService, $firebase, FireBaseRoot, _ , toaster) {
        
        $scope.loading = true;
       
        activate();

        function activate() {

            projectsService.workInProgress().then(function(projectName){
                $scope.IWorkingOn = projectName;
            });
            
            var projects = [];
            projectsService.getProjects().then(function(data){
                $scope.projects = data;
            });

            var monday = dateService.getMonday(new Date());
            tasksService.getWeeksTasks(monday)
                .then(function (week) {
                    $scope.week = week;
                });
        }


        $scope.update = function(task, $event){
           //tasksService.updateTask(task);
        }

        $scope.save = function (task, day ) {
          var taskRef = tasksService.getTask(task.$id);
          task.project = _.omit(task.project, ['$$hashKey', '$id', '$priority'])
          taskRef.$set(_.omit(task, ['$$hashKey', '$id', '$priority'])).then(function () {
          }).then(function () {
            toaster.pop('success', "Yeah", "Tâche sauvegardée");
          }, function (err) {
            toaster.pop('error', "Oh no..", err);
          });
        };

        $scope.remove = function (task, day) {
            day.tasks.$remove(task)
                .then(function(){
                toaster.pop("error", "Bim!", "tache supprimée")
            });
        }

        $scope.add = function(day) {
            var key = new Date().getTime();
            var defaultTask = { 
                    duration : 3600,
                    startDate : day.startDate,
                    project : { title : "Default", color : "grey"},
            };

            tasksService.add(defaultTask, day, function(ref){
                toaster.pop('success', 'Owh, nice', "Tâche créée");
            });
        }

        $scope.getTotal = function (day) {
            var timeSpent = 0; 
            angular.forEach(day.tasks, function(task){
                timeSpent += task.duration;
            })
            return timeSpent;
        }

        // Custom autocomplete for projects name
        $scope.projectsAutoComplete = {
            source: function (request, response) {
                var array = [];
                angular.forEach($scope.projects, function (project) {
                    var name = project.title;
                    if(fuzzy(name, request.term)){
                        array.push({label: name, value: name});
                    }
                });
                response(array);

                function fuzzy(value, search){
                var regexp = '\\b(.*)';
                    for(var i in search){
                        regexp += '('+search[i]+')(.*)';
                    }
                    regexp += '\\b';
                    return value.match(new RegExp(regexp,'i'));
                }
            },
            minLength: 0,
            select: function (event, ui) {
                if(ui.item.label){
                    elem.trigger('input');
                }
                return false;
            }
        };
    }
})();