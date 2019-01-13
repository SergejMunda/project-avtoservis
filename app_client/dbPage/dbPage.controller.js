(function() {
    function dbPageCtrl() {
        var vm = this;
        vm.title = 'Welcome';
        vm.msg = 'Loading dbPage';
        vm.error = '';


    }

    /* global angular */
    angular.module('autoService').controller('dbPageCtrl', dbPageCtrl);
})();
