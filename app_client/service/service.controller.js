(function() {
    function serviceCtrl(serviceData) {
        var vm = this;
        vm.title = 'Services';
        vm.msg = 'Searching sevices...';
        // vm.data.services = [
        //     { firstName: 'rere', lastName: 'sad', email: 'asd@asd.sad', phoneNumber: '213123' }
        // ];
        serviceData.services().then(
            function succes(response) {
                console.log(response);
                vm.msg = response.data.length > 0 ? '' : 'No services.';
                vm.data = { services: response.data };
            },
            function error(response) {
                vm.msg = 'Error while fetching services.';
                console.log(response.e);
            }
        );
    }
    serviceCtrl.$inject = ['serviceData'];

    /* global angular */
    angular.module('autoService').controller('serviceCtrl', serviceCtrl);
})();
