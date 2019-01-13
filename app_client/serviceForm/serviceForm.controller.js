(function() {
    function serviceFormCtrl(
        serviceData,
        $uibModalInstance,
        serviceDetails,
        audit,
        serviceTypeData
    ) {
        var vm = this;
        vm.title = 'Services';
        vm.msg = 'Searching sevices...';

        vm.data =
            serviceDetails === undefined
                ? {
                      firstName: '',
                      lastName: '',
                      email: '',
                      phoneNumber: '',
                      time: '',
                      type: ''
                  }
                : serviceDetails;

        vm.modalnoOkno = {
            preklici: function() {
                $uibModalInstance.close();
            }
        };

        vm.saveData = function() {
            console.log(vm.data);
            if (vm.data._id === undefined) {
                serviceData.addNew(vm.data).then(
                    function succes(response) {
                        console.log(response);
                        $uibModalInstance.close({ data: response.data, update: false });
                    },
                    function error(response) {
                        vm.msg = 'Delete failed.';
                        console.log(response.e);
                    }
                );
            } else {
                serviceData.update(vm.data._id, vm.data).then(
                    function succes(response) {
                        console.log(response);
                        $uibModalInstance.close({ data: response.data, update: true });
                    },
                    function error(response) {
                        vm.msg = 'Delete failed.';
                        console.log(response.e);
                    }
                );
            }
        };
        serviceTypeData.serviceTypes().then(
            function succes(response) {
                vm.msg = response.data.length > 0 ? '' : 'No serviceType.';
                vm.data = {
                    serviceTypes: response.data
                };
            },
            function error(response) {
                vm.msg = 'Error while fetching serviceType.';
                console.log(response.e);
            }
        );

        audit.log('serviceForm');
    }
    serviceFormCtrl.$inject = [
        'serviceData',
        '$uibModalInstance',
        'serviceDetails',
        'audit',
        'serviceTypeData'
    ];

    /* global angular */
    angular.module('autoService').controller('serviceFormCtrl', serviceFormCtrl);
})();
