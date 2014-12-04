(function() {
    'use strict';

    angular
        .module('app.service.tasks', [])
        .factory('tasksService', factory);

    /* @ngInject */
    function factory($firebase, FireBaseRoot, $q, DayLength) {

    	var projects = [];

        var service = {
            getTasksByDay: getTasksByDay,
            getTasksByWeek : getTasksByWeek
        };
        return service;

        ////////////////

        function getAllTasks(){
            //Get All Projects
            var ref = new Firebase(FireBaseRoot);
            var sync = $firebase(ref.child('tasks').orderByPriority());
            return sync.$asArray().$loaded();
        }
        
        function getTasksByDay(day) {
           
	   		var dayEnd = day.start + DayLength;
	   		var ref = new Firebase(FireBaseRoot + "/tasks");
	  		var sync = $firebase(ref.orderByPriority().startAt(day.start).endAt(dayEnd));

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
    }
})();