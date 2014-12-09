(function() {
    'use strict';

    angular
        .module('app.service.tasks', [])
        .factory('tasksService', factory);

    /* @ngInject */
    function factory($firebase, FireBaseRoot, $q, DayLength, dateService) {

    	var projects = [];

        var service = {
            getTasksByDay: getTasksByDay,
            getWeeksTasks : getWeeksTasks,
            getTask : getTask,
            add : add,
            updateTask : updateTask,
            remove : remove
        };
        return service;

        ////////////////

        function getAllTasks(){
            var ref = new Firebase(FireBaseRoot);
            var sync = $firebase(ref.child('tasks').orderByPriority());
            return sync.$asArray().$loaded();
        }
        
        function getTasksByDay(day) {
            var url = dateService.getTasksUrl(day);
	   		var ref = new Firebase(url);
	  		var sync = $firebase(ref.child("tasks"));

        	return sync;
        }

        function getTask(startdate) {
            var url = dateService.getTasksUrl(new Date(parseInt(startdate)));
            var ref = new Firebase(url + "/tasks/" + startdate);
            var sync = $firebase(ref);
            return sync;
        }

        //ToDo - Récupérer le nom des jours à partir du noeud "day"
        function getWeeksTasks (monday) {
            var deferred = $q.defer();
            var dayStart = monday;
            var days = [{ name : "Lundi" , tasks : []}, { name : "Mardi", tasks : []}, { name : "Mercredi", tasks : []}, { name : "Jeudi", tasks : []}, { name : "Vendredi", tasks : []}];

            var weekCalls = [];
            angular.forEach(days, function (day, index){
                var promise = getTasksByDay(monday);
                day.startDate = monday.getTime();
                monday.setDate(monday.getDate() + 1);
                weekCalls.push(promise);
            });
            
            $q.all(weekCalls)
                .then(function (tasksByDay) {
                    angular.forEach(tasksByDay, function(day, index) {
                        days[index].tasks = day.$asArray();
                    });
                    deferred.resolve(days);
                });
            return deferred.promise;
        }

        function updateTask(task) {
            var url = dateService.getTasksUrl(new Date(parseInt(task.startDate))) + "tasks/" + task.startDate;
            var taskRef = new Firebase(url);
            var tasksSync = $firebase(taskRef);
            tasksSync.$update(task);
        }

        function remove (task) {
            var url = dateService.getTasksUrl(new Date(parseInt(task.startDate))) + "tasks/" + task.startDate;
            var taskRef = new Firebase(url);
            taskRef.remove();
        }

        function add (task, day, onCompleted){
            var url = dateService.getTasksUrl(new Date(task.startDate)) + "tasks/" + task.startDate;
            var taskRef = new Firebase(url);
            taskRef.set(task, onCompleted);
        }
    }
})();