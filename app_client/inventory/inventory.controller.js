(function(){
    function inventoryCtrl(inventoryData){
        var vm = this;
        vm.title = 'Inventory';
        vm.msg = 'Searching inventory data...';
        inventoryData.inventory().then(
            function success(response){
                console.log(response);
                vm.msg = response.data.length > 0 ? '' : 'No data in inventory.';
                vm.data = { inventory: response.data };
            },
            function error(response){
                vm.msg = 'An error occured when fetching data from inventory.';
                console.log(response.e);
            }
        );
    }
    inventoryCtrl.$inject = ['inventoryData'];
    
    /* global angular */
    angular.module('autoService').controller('inventoryCtrl',inventoryCtrl );
})();