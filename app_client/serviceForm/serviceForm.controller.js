(function() {
    function serviceFormCtrl(serviceData, $uibModalInstance) {
        var vm = this;
        vm.title = 'Services';
        vm.msg = 'Searching sevices...';

        vm.data = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            time: '',
            type: ''
        };

        vm.modalnoOkno = {
            preklici: function() {
                $uibModalInstance.close();
            }
        };

        vm.saveData = function() {
            serviceData.addNew(vm.data).then(
                function succes(response) {
                    console.log(response);
                    $uibModalInstance.close(response.data);
                },
                function error(response) {
                    vm.msg = 'Delete failed.';
                    console.log(response.e);
                }
            );
        };
    }
    serviceFormCtrl.$inject = ['serviceData', '$uibModalInstance'];

    /* global angular */
    angular.module('autoService').controller('serviceFormCtrl', serviceFormCtrl);
})();
