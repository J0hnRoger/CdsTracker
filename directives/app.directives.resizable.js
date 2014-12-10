(function() {

    angular
        .module('app.directives.resizable', [])
        .directive('heightify', heightify);

  	function heightify() {
	    return {
	    	scope : {
	    		duration : "=heightify"
	    	},
	    	link : function (scope, element) {
	        	//Un jour = 28800s = 800px 
	        	scope.$watch('duration', function (){
	        		var height = scope.duration * 800 / 28800;
		        	element.height(height);
	        	});
		    }
		}
	}

})();