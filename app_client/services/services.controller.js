(function() {
    function serviceCtrl(serviceData, $uibModal) {
        var vm = this;
        vm.title = 'Services';
        vm.msg = 'Searching sevices...';
        // vm.data.services = [
        //     { firstName: 'rere', lastName: 'sad', email: 'asd@asd.sad', phoneNumber: '213123' }
        // ];
        vm.deleteService = function(id, index) {
            serviceData.serviceDelete(id).then(
                function succes(response) {
                    vm.data.services.splice(index, 1);
                },
                function error(response) {
                    vm.msg = 'Delete failed.';
                    console.log(response.e);
                }
            );
        };

        vm.serviceFormModal = function(data) {
            $uibModal
                .open({
                    templateUrl: '/serviceForm/serviceForm.view.html',
                    controller: 'serviceFormCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        serviceDetails: function() {
                            return data;
                        }
                    }
                })
                .result.then(
                    function(podatki) {
                        if (typeof podatki != 'undefined') {
                            if (!podatki.update) {
                                vm.data.services.push(podatki.data);
                            }
                        }
                    },
                    function(napaka) {
                        // Ulovi dogodek in ne naredi ničesar
                    }
                );
        };

        serviceData.services().then(
            function succes(response) {
                vm.msg = response.data.length > 0 ? '' : 'No services.';
                vm.data = { services: response.data };
            },
            function error(response) {
                vm.msg = 'Error while fetching services.';
                console.log(response.e);
            }
        );
    }
    serviceCtrl.$inject = ['serviceData', '$uibModal'];

    /* global angular */
    angular.module('autoService').controller('servicesCtrl', serviceCtrl);
})();
