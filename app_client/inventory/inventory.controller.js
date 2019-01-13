(function() {
    function inventoryCtrl(inventoryData, $uibModal, audit) {
        var vm = this;
        vm.title = 'Inventory';
        vm.msg = 'Searching inventory data...';
        vm.deleteInventory = function(id, index) {
            inventoryData.inventoryDelete(id).then(
                function success(response) {
                    vm.msg = 'Item deleted successfully';
                    setTimeout(function() {
                        vm.msg = '';
                    }, 3000);
                    vm.data.inventory.splice(index, 1);
                },
                function error(response) {
                    vm.msg = 'Failed to delete';
                    console.log(response.e);
                }
            );
        };

        vm.inventoryFormModal = function(data) {
            $uibModal
                .open({
                    templateUrl: '/inventoryForm/inventoryForm.view.html',
                    controller: 'inventoryFormCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        inventoryDetails: function() {
                            return data;
                        }
                    }
                })
                .result.then(
                    function(podatki) {
                        if (typeof podatki != 'undefined') {
                            if (!podatki.update) {
                                vm.msg = 'Item added successfully';
                                setTimeout(function() {
                                    vm.msg = '';
                                }, 3000);
                                vm.data.inventory.push(podatki.data);
                            } else {
                                vm.msg = 'Item updated successfully';
                                setTimeout(function() {
                                    vm.msg = '';
                                }, 3000);
                            }
                        }
                    },
                    function(napaka) {
                        //cath and release
                    }
                );
        };
        vm.goToNextPage = function() {
            inventoryData.inventory(vm.data.nextPage).then(
                function success(response) {
                    vm.msg = response.data.docs.length > 0 ? '' : 'No data in inventory.';
                    vm.data = {
                        inventory: response.data.docs,
                        nextPage: response.data.nextPage,
                        prevPage: response.data.prevPage
                    };
                },
                function error(response) {
                    vm.msg = 'An error occured when fetching data from inventory.';
                    console.log(response.e);
                }
            );
        };
        vm.goToPrevPage = function() {
            inventoryData.inventory(vm.data.prevPage).then(
                function success(response) {
                    vm.msg = response.data.docs.length > 0 ? '' : 'No data in inventory.';
                    vm.data = {
                        inventory: response.data.docs,
                        nextPage: response.data.nextPage,
                        prevPage: response.data.prevPage
                    };
                },
                function error(response) {
                    vm.msg = 'An error occured when fetching data from inventory.';
                    console.log(response.e);
                }
            );
        };

        inventoryData.inventory().then(
            function success(response) {
                console.log(response);
                vm.msg = response.data.docs.length > 0 ? '' : 'No data in inventory.';
                vm.data = {
                    inventory: response.data.docs,
                    nextPage: response.data.nextPage,
                    prevPage: response.data.prevPage
                };
            },
            function error(response) {
                vm.msg = 'An error occured when fetching data from inventory.';
                console.log(response.e);
            }
        );
        audit.log('inventory');
    }
    inventoryCtrl.$inject = ['inventoryData', '$uibModal', 'audit'];

    /* global angular */
    angular.module('autoService').controller('inventoryCtrl', inventoryCtrl);
})();
