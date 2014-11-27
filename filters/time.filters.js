(function() {
    'use strict';

    angular
        .module('app.filters', [
        ])
        .filter('timeInSec', timeInSec);


    function timeInSec (){
    	return function (s) {
		  	var h = Math.floor(s / 3600);
	        var m = Math.floor(s % 3600 / 60);
	        var s = Math.floor(s) - h * 3600 - m * 60;
        	return witho(h) + ":" + witho(m) + ":" + witho(s);
    	};
    }    

})();