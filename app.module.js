(function() {
    'use strict';

    angular
        .module('app', [
		/*Angular dependencies*/
			'ngRoute',
            'app.directives.timer',
            'app.directives.resizable',
            'firebase',
		/*Features dependencies*/
            'app.timetracker',
            'app.taskBumper'
        ])
        .config(routing)
        .constant('FireBasUrl', 'https://dazzling-inferno-3649.firebaseio.com/');

    function routing($routeProvider) {
    	$routeProvider.when('/', 
    	{
    		templateUrl:"task-bumper/task-bumper.html",
    		controller : "taskBumperCtrl"
    	});
    }

})();