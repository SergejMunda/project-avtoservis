(function() {
    function serviceCtrl(serviceData, $uibModal) {
        var vm = this;
        vm.title = 'Services';
        vm.msg = 'Searching sevices...';
        vm.error = '';

        vm.deleteService = function(id, index) {
            serviceData.serviceDelete(id).then(
                function succes(response) {
                    vm.data.services.splice(index, 1);
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
                                vm.msg = 'Service added successfully';
                                setTimeout(function() {
                                    vm.msg = '';
                                }, 3000);
                                vm.data.services.push(podatki.data);
                            } else {
                                vm.msg = 'Service updated successfully';
                                setTimeout(function() {
                                    vm.msg = '';
                                }, 3000);
                            }
                        }
                    },
                    function(napaka) {
                        vm.msg = 'Napaka: ' + napaka;
                        // Ulovi dogodek in ne naredi ničesar
                    }
                );
        };
        vm.goToNextPage = function() {
            serviceData.services(vm.data.nextPage).then(
                function success(response) {
                    vm.msg = response.data.docs.length > 0 ? '' : 'No data in services.';
                    vm.data = {
                        services: response.data.docs,
                        nextPage: response.data.nextPage,
                        prevPage: response.data.prevPage
                    };
                },
                function error(response) {
                    vm.msg = 'An error occured when fetching data from services.';
                    console.log(response.e);
                }
            );
        };
        vm.goToPrevPage = function() {
            serviceData.services(vm.data.prevPage).then(
                function success(response) {
                    vm.msg = response.data.docs.length > 0 ? '' : 'No data in services.';
                    vm.data = {
                        services: response.data.docs,
                        nextPage: response.data.nextPage,
                        prevPage: response.data.prevPage
                    };
                },
                function error(response) {
                    vm.msg = 'An error occured when fetching data from services.';
                    console.log(response.e);
                }
            );
        };

        serviceData.services().then(
            function succes(response) {
                vm.msg = response.data.docs.length > 0 ? '' : 'No services.';
                vm.data = {
                    services: response.data.docs,
                    nextPage: response.data.nextPage,
                    prevPage: response.data.prevPage
                };
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
