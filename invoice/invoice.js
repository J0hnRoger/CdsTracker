(function() {

    angular
        .module('app.invoice', [])
        .controller('invoiceCtrl', invoiceCtrl);

    function invoiceCtrl($scope, $firebase, FireBaseUrl) {

        activate();

        function activate() {
        	//Get Projects
			var ref = new Firebase(FireBaseUrl);
	  		var projectSync = $firebase(ref.child("projects"));
	  		$scope.projects = projectSync.$asArray();
        }

        $scope.updateEvolution = function(updatedProj, evolution) {
		    var projectRef = new Firebase(FireBaseUrl + "/projects/" + updatedProj.title);

		    projectRef.transaction(function(project) {
		        project.evolution = evolution;
		        return project;
		    });
		};

		$scope.updateCorrection = function(updatedProj, correction) {
		    var projectRef = new Firebase(FireBaseUrl + "/projects/" + updatedProj.title);
		    projectRef.transaction(function(project) {
		        project.correction = correction;
		        return project;
		    });
		};

		$scope.total = function(propertyName){
			var total = 0;
			angular.forEach($scope.projects, function (project) {
				total += parseFloat(project[propertyName]);
			});
			return total;
		}

    }

})();