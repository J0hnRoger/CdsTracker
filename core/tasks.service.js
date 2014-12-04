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
            getTasksByWeek : getTasksByWeek,
            getWeeksTasks : getWeeksTasks,
            updateTask : updateTask

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
	  		var sync = $firebase(ref);

        	return sync.$asObject().$loaded();
        }

        function getTasksByWeek (startDay) {
            
            var deferred = $q.defer();
            var dayStart = startDay;
            var days = [{ name : "Lundi", tasks : []}, { name : "Mardi", tasks : []}, { name : "Mercredi", tasks : []}, { name : "Jeudi", tasks : []}, { name : "Vendredi", tasks : []}];

            var weekCalls = [];
            angular.forEach(days, function (day, index){
                day.start = startDay;
                startDay += DayLength;

                var promise = getTasksByDay(day);
                weekCalls.push(promise);
            });
            
            $q.all(weekCalls)
                .then(function (tasksByDay) {
                    angular.forEach(tasksByDay, function(day, index) {
                        var timeSpent = 0;
                        day.forEach(function (task) {
                            timeSpent += task.duration;
                            
                        });
                        days[index].tasks = day;
                        days[index].timeSpent = timeSpent;
                    });
                    deferred.resolve(days);
                });
            return deferred.promise;
           
            // getTasksByDay(tuesday)
            // .then(function (data) {
            //     var timeSpent = 0;
            //     data.forEach(function (task) {
            //         timeSpent += task.duration;
            //     });
            //     week.push({
            //         name : "Mardi",
            //         tasks : data,
            //         timeSpent : timeSpent
            //     });
            // });
            // getTasksByDay(wednesday)
            // .then(function (data) {

            //     var timeSpent = 0;
            //     data.forEach(function (task) {
            //         timeSpent += task.duration;
            //     });
            //     week.push({
            //         name : "Mercredi",
            //         tasks : data,
            //         timeSpent : timeSpent
            //     });
            // });
            // getTasksByDay(thursday)
            // .then(function (data) {

            //     var timeSpent = 0;
            //     data.forEach(function (task) {
            //         timeSpent += task.duration;
            //     });

            //     week.push({
            //         name : "Jeudi",
            //         tasks : data,
            //         timeSpent : timeSpent
            //     });
            // });
            // getTasksByDay(friday)
            // .then(function (data) {

            //     var timeSpent = 0;
            //     data.forEach(function (task) {
            //         timeSpent += task.duration;
            //     });

            //     week.push({
            //         name : "Vendredi",
            //         tasks : data,
            //         timeSpent : timeSpent
            //     });
            // });

            // return week;
    	}

        //ToDo - Récupérer le nom des jours à partir du noeud "day"
        function getWeeksTasks (monday) {
            var deferred = $q.defer();
            var dayStart = monday;
            var days = [{ name : "Lundi", tasks : []}, { name : "Mardi", tasks : []}, { name : "Mercredi", tasks : []}, { name : "Jeudi", tasks : []}, { name : "Vendredi", tasks : []}];

            var weekCalls = [];
            angular.forEach(days, function (day, index){
                var promise = getTasksByDay(monday);
                monday.setDate(monday.getDate() + 1);
                weekCalls.push(promise);
            });
            
            $q.all(weekCalls)
                .then(function (tasksByDay) {
                    angular.forEach(tasksByDay, function(day, index) {
                        var timeSpent = 0;
                        day.forEach(function (task) {
                            timeSpent += task.duration;
                        });
                        days[index].tasks = day;
                        days[index].timeSpent = timeSpent;
                    });
                    deferred.resolve(days);
                });
            return deferred.promise;
        }

        function updateTask(task, description) {
            var url = dateService.getTasksUrl(new Date(task.startDate)) + "/" + task.startDate;
            var taskRef = new Firebase(url + "/description");
            var tasksSync = $firebase(taskRef);
            tasksSync.$set(description);

        }
    }
})();