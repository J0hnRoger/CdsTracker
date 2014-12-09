(function() {

    angular
        .module('app.service.underscore', [])
        .factory('_', factory);

    function factory() {
        return window._;;
    }
})();