(function() {
    'use strict';

    angular
        .module('app.service.date', [])
        .factory('dateService', factory);

    /* @ngInject */
	    function factory() {

        var service = {
            getFirstWeekDayTime : getFirstWeekDayTime,
            getDayBeggining : getDayBeggining,
            getTimeStampFromDecimal : getTimeStampFromDecimal
        };

        return service;

        ////////////////

        function getDayBeggining(){
        	var curr = new Date();
        	curr.setHours(0)
        	curr.setMinutes(0)
        	curr.setSeconds(0);
        	return curr;
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
    }
})();