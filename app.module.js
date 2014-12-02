(function() {
    'use strict';

    angular
        .module('app', [
		/*Angular dependencies*/
			'ngRoute',
            'app.directives.timer',
            'app.directives.resizable',
            'app.directives.input',
            'firebase',
            'ui.bootstrap',
		/*Features dependencies*/
            'app.timetracker',
            'app.taskBumper',
            'app.invoice'
        ])
        .config(routing)
        .constant('FireBaseUrl', 'https://dazzling-inferno-3649.firebaseio.com/');

    function routing($routeProvider) {
    	$routeProvider.when('/', 
    	{
    		templateUrl:"task-bumper/task-bumper.html",
    		controller : "taskBumperCtrl"
    	})
        .when('/invoice/',
        {
            templateUrl:"invoice/invoice.html",
            controller : "invoiceCtrl"
        });
    }

})();