(function() {
    'use strict';

    angular
        .module('app.filters', [
        ])
        .filter('friendlyHour', friendlyHour)
        .filter('invoicedTime', invoicedTime)
        .filter('passedTime', passedTime)
        .filter('minutesTime', minutesTime);

    function friendlyHour (){
        return function (time) {
            time = parseInt(time);
            var h = Math.floor(time / 3600);
            var m = Math.floor((time % 3600) / 60);
            return h + "h" + (m >= 10 ? m : '0' + m);
        }
    }

    function invoicedTime() {
        return function (s) {
            //one invoiced day is 7h 
            var invoicedDay = 25200;
            return Math.round(s / invoicedDay * 100) / 100;
        };
    }

    function passedTime() {
        return function (s, totalSeconds) {
            return Math.round(s / totalSeconds * 100) / 100;
        };
    }

    function minutesTime(){
        return function(s){
            return Math.floor(s / 60);
        };
    }

})();