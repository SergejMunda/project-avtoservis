(function() {
    var naviga = function(authentication) {
        var vm = this;
        vm.logedin = function() {
            return authentication.logedin();
        };
        return {
            restrict: 'EA',
            templateUrl: '/all/directives/nav/nav.template.html'
        };
    };
    naviga.$inject = ['authentication'];
    /* global angular */
    angular.module('autoService').directive('naviga', naviga);
})();
