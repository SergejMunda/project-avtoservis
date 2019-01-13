(function() {
    function serviceTypeCtrl(serviceTypeData, audit) {
        var vm = this;
        vm.title = 'serviceType';
        vm.msg = 'Searching sevices...';
        vm.error = '';

        vm.post = { type: '' };

        vm.deleteService = function(id, index) {
            serviceTypeData.serviceDelete(id).then(
                function succes(response) {
                    vm.data.serviceType.splice(index, 1);
                    vm.msg = 'Service deleted successfully';
                    setTimeout(function() {
                        vm.msg = '';
                    }, 3000);
                },
                function error(response) {
                    vm.msg = 'Delete failed.';
                    setTimeout(function() {
                        vm.msg = '';
                    }, 3000);
                    console.log(response.e);
                }
            );
        };

        vm.add = function(data) {
            serviceTypeData.addNew(vm.post).then(
                function succes(response) {
                    vm.data.serviceType.push(response.data);
                    vm.post = { type: '' };
                },
                function error(response) {
                    vm.msg = 'Delete failed.';
                    setTimeout(function() {
                        vm.msg = '';
                    }, 3000);
                    console.log(response.e);
                }
            );
        };

        serviceTypeData.serviceTypes().then(
            function succes(response) {
                vm.msg = response.data.length > 0 ? '' : 'No serviceType.';
                vm.data = {
                    serviceType: response.data
                };
            },
            function error(response) {
                vm.msg = 'Error while fetching serviceType.';
                console.log(response.e);
            }
        );

        audit.log('serviceType');
    }
    serviceTypeCtrl.$inject = ['serviceTypeData', 'audit'];

    /* global angular */
    angular.module('autoService').controller('serviceTypeCtrl', serviceTypeCtrl);
})();
