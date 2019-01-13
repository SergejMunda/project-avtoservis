(function() {
    function contactCtrl(authentication) {
        var vm = this;
        vm.title = 'Welcome';
        vm.msg = 'Loading Contact';
        vm.error = '';

        vm.logedin = function() {
            return authentication.logedin();
        };

    }
    frontPage.$inject = ['authentication'];

    /* global angular */
    angular.module('autoService').controller('contactCtrl', contactCtrl);
})();
