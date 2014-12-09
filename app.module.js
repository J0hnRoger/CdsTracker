(function() {
    'use strict';

    angular
        .module('app', [
		/*Angular dependencies*/
			'ngRoute',
            'app.directives.timer',
            'toaster',
            'app.directives.resizable',
            'app.service.date',
            'app.service.tasks',
            'app.service.underscore',
            'app.service.projects',
            'app.filters',
            'app.directives.input',
            'app.directives.totalDay',
            'firebase',
            'ui.bootstrap',
		/*Features dependencies*/
            'app.taskBumper',
            'app.cdsCalendar',
            'app.invoice'
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
        .when('/invoice/',
        {
            templateUrl:"invoice/invoice.html",
            controller : "invoiceCtrl"
        });
    }
})();