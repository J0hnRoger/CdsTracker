(function() {

    angular
        .module('app.taskBumper', [])
        .controller('taskBumperCtrl', taskBumperCtrl);

    function taskBumperCtrl($scope, $window, $firebase, FireBasUrl) {
        $scope.title = 'taskBumperCtrl';

        var ref = new Firebase(FireBasUrl);
  		var sync = $firebase(ref);
        
        var projects = sync.$asArray();
        $scope.projects = projects;

    	$scope.start = 0;
        
        activate();

        function activate() {
        	
        	angular.element($window).bind('resize', function() {
        		$scope.height = $window.innerHeight;
        	});

        	$scope.record = function(project) {
        		if (project.isActive){
        			var s = Math.floor((Date.now() - $scope.start) / 1000);
        			project.elapsedTime += s;
        			project.isActive = false;
        			projects.$save(project);
        			$scope.start = 0;
        		}
        		else{
        			$scope.start = Date.now();
        			project.isActive = true;
        		}
        	}
        }
    }
})();