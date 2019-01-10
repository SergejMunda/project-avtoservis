(function() {
    function inventoryCtrl(inventoryData) {
        var vm = this;
        vm.title = 'Inventory';
        vm.msg = 'Searching inventory...';
        
        vm.addItem =  function () {
            if (vm.item != null && vm.item.name) {
                inventoryData.addItem(vm.item.name, vm.item.description, vm.item.quantity)
                .then (function success(response){
                    vm.msg = 'Item added!';
                },
                function error(response){
                    vm.msg = 'Error adding item!';
                });
            }
            else {
                vm.msg = 'Please enter data.';
            }
        };
    }
    inventoryCtrl.$inject = ['inventoryData'];

    /* global angular */
    angular.module('autoService').controller('inventoryFormCtrl', inventoryCtrl);
})();