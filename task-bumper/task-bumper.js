(function() {

    angular
        .module('app.taskBumper', [])
        .controller('taskBumperCtrl', taskBumperCtrl);

    function taskBumperCtrl($scope, $window, $firebase, FireBaseRoot) {
        
        $scope.title = 'taskBumperCtrl';
        $scope.projects = [];
    	$scope.start = 0;
        
        activate();

        function activate() {
        	
        	angular.element($window).bind('resize', function() {
        		$scope.height = $window.innerHeight;
        	});
            
        	//Get All Projects
    	   	var ref = new Firebase(FireBaseRoot);
	  		var projectSync = $firebase(ref.child('projects'));

	        var projects = projectSync.$asObject();
	        projects.$loaded();

        	$scope.projects = projects;

        	$scope.record = function(project) {
                //ToDo reset all IsActiveProjects
        		var now = new Date().getTime();
        		if (project.isActive){
        			var s = Math.floor((Date.now() - $scope.start) / 1000);

        			var newTask = {
        				project :  { title : project.title, color : project.color },
        				startDate : now,
        				duration : s
        			};

    				tasksSync = $firebase(ref.child('tasks'));
    				var task = JSON.parse(angular.toJson(newTask));
                    ref.child('tasks').push(task).setPriority(now);

        			project.isActive = false;

        			$scope.start = 0;
        		}
        		else{
        			$scope.start = Date.now();
        			project.isActive = true;
                    ref.child("activeProject").set(project.title);
        		}
        		projectSync.$asArray().$save(parseInt(project.$id));
        	}
        }
    }

})();