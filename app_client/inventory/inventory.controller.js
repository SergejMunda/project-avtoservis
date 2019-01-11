(function(){
    function inventoryCtrl(inventoryData){
        var vm = this;
        vm.title = 'Inventory';
        vm.msg = 'Searching inventory data...';
        vm.deleteInventory = function(id, index){
            inventoryData.inventoryDelete(id).then(
                function success(response){
                    vm.data.inventory.splice(index,1);
                },
                function error(response){
                    vm.msg= 'Failed to delete';
                    console.log(response.e);
                }
            );
        };
        
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