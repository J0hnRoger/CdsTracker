(function() {

    angular
        .module('app.taskBumper', [])
        .controller('taskBumperCtrl', taskBumperCtrl);

    function taskBumperCtrl($scope, $window, $firebase, FireBaseRoot, dateService) {
        
        $scope.title = 'taskBumperCtrl';
        $scope.projects = [];
    	$scope.start = 0;
        
        activate();

        function activate() {
        	
        	angular.element($window).bind('resize', function() {
        		$scope.height = $window.innerHeight;
        	});
            
        	//Get All Projects
    	   	var projectRef = new Firebase(FireBaseRoot);
	  		var projectSync = $firebase(projectRef.child('projects'));

	        var projects = projectSync.$asObject();
	        projects.$loaded();

        	$scope.projects = projects;

        	$scope.record = function(project) {
                //ToDo reset all IsActiveProjects
        		var now = new Date().getTime();
        		if (project.isActive){
        			var s = Math.floor((Date.now() - $scope.start) / 1000);

        			var task = {
        				project :  { title : project.title, color : project.color },
        				startDate : now,
        				duration : s
        			};
                    var serializedTask = JSON.parse(angular.toJson(task));

                    var url = dateService.getTasksUrl(new Date()) + "/" + now;
                    var taskRef = new Firebase(url);
                    tasksSync = $firebase(taskRef);
                    tasksSync.$set(serializedTask);

        			$scope.start = 0;
                    project.isActive = false;
        		}
        		else{
        			$scope.start = Date.now();
        			project.isActive = true;
                    projectRef.child("activeProject").set(project.title);
        		}
        		projectSync.$asArray().$save(parseInt(project.$id));
        	}
        }
    }

})();