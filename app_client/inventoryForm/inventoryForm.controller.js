(function() {
    function inventoryFormCtrl(inventoryData, $uibModalInstance, inventoryDetails) {
        var vm = this;
        vm.title = 'Inventory';
        vm.msg = 'Searching inventory...';

        vm.data = inventoryDetails
            ? inventoryDetails
            : {
                  itemName: '',
                  description: '',
                  quantity: ''
              };

        vm.modalnoOkno = {
            preklici: function() {
                $uibModalInstance.close();
            }
        };

        vm.saveData = function() {
            console.log(vm.data);
            if (vm.data._id === undefined) {
                inventoryData.addNew(vm.data).then(
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
                inventoryData.update(vm.data._id, vm.data).then(
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
    }
    inventoryFormCtrl.$inject = ['inventoryData', '$uibModalInstance', 'inventoryDetails'];

    /* global angular */
    angular.module('autoService').controller('inventoryFormCtrl', inventoryFormCtrl);
})();
