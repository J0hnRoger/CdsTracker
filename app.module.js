(function() {
    'use strict';

    angular
        .module('app', [
		/*Angular dependencies*/
			'ngRoute',
            'app.directives.timer',
            'app.directives.resizable',
            'app.service.tasks',
            'app.service.date',
            'app.service.projects',
            'app.filters',
            'firebase',
		/*Features dependencies*/
            'app.taskBumper',
            'app.cdsCalendar'
        ])
        .config(routing)
        .constant('FireBaseRoot', 'https://dazzling-inferno-3649.firebaseio.com/')
        .constant('DayLength', 86400000);

    function routing($routeProvider) {
    	$routeProvider.when('/', 
    	{
    		templateUrl:"task-bumper/task-bumper.html",
    		controller : "taskBumperCtrl"
    	})
        .when('/calendar/', {
            templateUrl:"cds-calendar/cds-calendar.html",
            controller : "cdsCalendarCtrl"
        })
        ;
    }
})();