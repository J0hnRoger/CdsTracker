(function() {
    'use strict';

    angular
        .module('app.timetracker', ['firebase'])
        .controller('timetrackerCtrl', timetrackerCtrl);

    function timetrackerCtrl($firebase) {
        var vm = this;
        vm.title = 'timetrackerCtrl';

        vm.task = "ma tache"
        activate();

        function activate() {

        }
    }
})();