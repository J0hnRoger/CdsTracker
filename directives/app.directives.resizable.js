(function() {

    angular
        .module('app.directives.resizable', [])
        .directive('heightify', heightify);

  	function heightify() {
	    return {
	    	link : function (scope, element) {
	        	//Un jour = 28800s = 800px 
        		var height = scope.task.duration * 800 / 28800;
	        	element.height(height);
		    }
		}
	}

})();