(function() {
    'use strict';

    angular
        .module('app.directives.totalDay', [])
        .directive('totalTime', totalTime);

    function totalTime () {
        var directive = {
            link: link,
            restrict : 'A',
            transclude : true,
            template : "<span>{{timeSpent}}</span>"
        };

        return directive;
    }
})();