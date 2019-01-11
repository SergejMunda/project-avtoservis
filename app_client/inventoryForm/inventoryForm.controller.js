(function() {
    function inventoryCtrl(inventoryData) {
        var vm = this;
        vm.title = 'Inventory';
        vm.msg = 'Searching inventory...';
        
        vm.data = {
            name: '',
            description: '',
            quantity: ''
        };
        
        vm.saveData = function(){
            inventoryData.addNew(vm.data).then(
                function succes(response){
                    console.log(response);
                }, 
                function error(response){
                    vm.msg = "Delete failed.";
                    console.log(response.e);
                }
            );
        };
    }
    inventoryCtrl.$inject = ['inventoryData'];

    /* global angular */
    angular.module('autoService').controller('inventoryFormCtrl', inventoryCtrl);
})();