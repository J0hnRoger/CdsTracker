// Auto focus field
angular.module('app.directives.input', []).directive('autofocus', function () {
    return {
        scope: {
            autofocus: '='
        },
        link: function (scope, element) {
            scope.$watch('autofocus', function(value){
                if(value){
                    element[0].focus();
                }
            })
        }
    };
});