(function() {
    'use strict';

    angular
        .module('app.service.projects', [])
        .factory('projectsService', factory);

    /* @ngInject */
    function factory($firebase, FireBaseRoot, $q) {
        var service = {
        	workInProgress : getCurrentProject,
            projects : false
        };
        return service;

        ////////////////

        function getCurrentProject() {
        	var deffered = $q.defer();

        	var projectName;

        	var ref = new Firebase(FireBaseRoot);
            var sync = $firebase(ref.child("activeProject"));
            ref.on("value", function (dataSnapshot) {
                projectName = dataSnapshot.val().activeProject;
                deffered.resolve(projectName);
            });
            return deffered.promise;
            
        }
    }
})();