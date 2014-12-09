// Auto focus field
angular.module('app.directives.input', [])
.directive('autofocus', function () {
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
})
.directive('autocomplete', function () {
    return {
        restrict: 'A',
        scope: {
            focus : '=',
            autocompleteconfig: '=',
            task : '=', 
            projects : '='
        },
        link: function (scope, elem) {

            scope.$watch('focus', function(value){
                if(value){
                    elem[0].focus();
                }
            })

            elem.autocomplete({
                source: function (request, response) {
                    var array = [];
                    angular.forEach(scope.projects, function (project) {
                        var name = project.title;
                        if(fuzzy(name, request.term)){
                            array.push({label: name, value: name});
                        }
                    });
                    response(array);
                },
                select: function (event, ui) {
                    if(ui.item.label){
                        scope.task.project = scope.projects.$getRecord(ui.item.label);
                    }
                },
                minLength : 0
            });
            function fuzzy(value, search){
            var regexp = '\\b(.*)';
                for(var i in search){
                    regexp += '('+search[i]+')(.*)';
                }
                regexp += '\\b';
                return value.match(new RegExp(regexp,'i'));
            }

        }
    };
});