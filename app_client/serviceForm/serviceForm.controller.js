(function() {
    function serviceCtrl(serviceData) {
        var vm = this;
        vm.title = 'Services';
        vm.msg = 'Searching sevices...';
        // vm.data.services = [
        //     { firstName: 'rere', lastName: 'sad', email: 'asd@asd.sad', phoneNumber: '213123' }
        // ];
    }
    serviceCtrl.$inject = ['serviceData'];

    /* global angular */
    angular.module('autoService').controller('serviceFormCtrl', serviceCtrl);
})();
