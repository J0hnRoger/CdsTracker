(function() {
    'use strict';

    angular
        .module('app.service.date', [])
        .factory('dateService', factory);

    /* @ngInject */
	    function factory(FireBaseRoot) {
            var taskPrefixe = "tasks"
        var service = {
            getFirstWeekDayTime : getFirstWeekDayTime,
            getDayBeggining : getDayBeggining,
            getTimeStampFromDecimal : getTimeStampFromDecimal,
            getTasksUrl : getTasksUrl,
            getMonday : getMonday
        };

        return service;

        ////////////////

        function getDayBeggining(day){
        	day.setHours(0);
        	day.setMinutes(0);
        	day.setSeconds(0);
        	return day;
        }

        function getFirstWeekDayTime(){
        	var curr = getDayBeggining();

        	var currDay = curr.getDay();
        	//one day = 24 * 60 * 60 * 1000 = 86 400 000; 
        	return curr.getTime() - ( (currDay - 1) * 86400000);
        }

        function getTimeStampFromDecimal(strDecimal, totalTime){
            var decimal = +strDecimal;
            return totalTime * decimal;
        }

        function getTasksUrl (date) {
            if (!day instanceof Date)
                return;
         
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();

            return FireBaseRoot + taskPrefixe + "/" + year + "/" + month + "/" + day + "/";
        }

        function getMonday (now) {
             if (!now instanceof Date)
                return;
            var curr = getDayBeggining(now).getDay() - 1;
          
            return new Date(now.setDate(now.getDate() - curr));
        }
    }
})();