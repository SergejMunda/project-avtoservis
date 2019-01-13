(function() {
    function frontPageCtrl(authentication) {
        var vm = this;
        vm.title = 'Welcome';
        vm.msg = 'Loading FrontPage';
        vm.error = '';

        vm.logedin = function() {
            return authentication.logedin();
        };

    }
    frontPage.$inject = ['authentication'];

    /* global angular */
    angular.module('autoService').controller('frontPageCtrl', frontPageCtrl);
})();
