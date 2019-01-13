(function() {
    function dbPageCtrl(dbData, $uibModal) {
        var vm = this;
        vm.title = 'Db';
        vm.msg = '';
        vm.error = '';
    
        vm.deleteAll = function(){
            dbData.dbDelete().then(
                function succes(){
                    vm.msg = 'Db deleted sucessfully';
                    setTimeout(function(){
                        vm.msg='';
                        
                    },3000);
                },
                function error(){
                    vm.msg = 'Failed to delete';
                    //console.log(response.e);
                }
            );
                
        };
        vm.loadPresets = function(){
            dbData.dbAdd().then(
                vm.msg = "Db loaded sucessfully"
                       
            );
        }
       
    }

    
    dbPageCtrl.$inject = ['dbData','$uibModal'];
    /* global angular */
    angular.module('autoService').controller('dbPageCtrl', dbPageCtrl);
})();
