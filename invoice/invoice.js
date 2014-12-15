(function() {

    angular
        .module('app.invoice', [])
        .controller('invoiceCtrl', invoiceCtrl);

    function invoiceCtrl($scope, $firebase, FireBaseRoot) {

        $scope.invoicedMonth = new Date();
        
        $scope.SelectProject = function () {
        	var month = $scope.invoicedMonth.getMonth() + 1;
        	var year = $scope.invoicedMonth.getFullYear();

			var ref = new Firebase(FireBaseRoot);
	  		var projectSync = $firebase(ref.child("invoices")
	  			.child(year)
	  			.child(month));
	  		$scope.projects = projectSync.$asArray();
		}

        activate();

        function activate() {
        	$scope.SelectProject();
        }

        $scope.updateEvolution = function(updatedProj, evolution) {
        	var month = $scope.invoicedMonth.getMonth() + 1;
        	var year = $scope.invoicedMonth.getFullYear();
		    var projectRef = new Firebase(FireBaseRoot + "invoices/" + year +'/' + month + '/' + updatedProj.title)
		    projectRef.transaction(function(project) {
		        project.evolution = parseFloat(evolution);
		        return project;
		    });
		};

		$scope.updateCorrection = function(updatedProj, correction) {
		    var month = $scope.invoicedMonth.getMonth() + 1;
        	var year = $scope.invoicedMonth.getFullYear();
		    var projectRef = new Firebase(FireBaseRoot + "invoices/" + year +'/' + month + '/' + updatedProj.title)
		    projectRef.transaction(function(project) {
		        project.correction = parseFloat(correction);
		        return project;
		    });
		};

		$scope.total = function(propertyName){
			var total = 0;
			angular.forEach($scope.projects, function (project) {
				total += parseFloat(project[propertyName]);
			});
			return Math.round(total *100) /100;
		}

		

    }

})();