(function() {
    function frontPageCtrl() {
        var vm = this;
        vm.title = 'Welcome';
        vm.msg = 'Loading FrontPage';
        vm.error = '';


    }

    /* global angular */
    angular.module('autoService').controller('frontPageCtrl', frontPageCtrl);
})();
