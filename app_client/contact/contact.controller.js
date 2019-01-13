(function() {
    function contactCtrl() {
        var vm = this;
        vm.title = 'Welcome';
        vm.msg = 'Loading Contact';
        vm.error = '';


    }

    /* global angular */
    angular.module('autoService').controller('contactCtrl', contactCtrl);
})();
