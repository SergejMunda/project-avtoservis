(function() {
    function dbPageCtrl(dbData, $uibModal) {
        var vm = this;
        vm.title = 'Welcome';
        vm.msg = 'Loading dbPage';
        vm.error = '';
    
        vm.deleteAll = function(){
            dbData.dbDelete().then(
                function succes(response){
                    vm.msg = 'Db deleted sucessfully';
                    setTimeout(function(){
                        vm.msg='';
                        
                    },3000);
                    },
                    function error(response){
                        vm.msg = 'Failed to delete';
                        console.log(response.e);
                    }
                );
                
        };
        dbData.db().then(
            function success(response){
                console.log(response);
                vm.msg = response.data.docs.length > 0 ? '' : 'No data in db';
                vm.data = {
                    db : response.data.docs
                };
            },
            function error(response){
                vm.msg = 'An error occured when fetching data from db';
                console.log(response.e);
            }
        );
    }

    
    dbPageCtrl.$inject = ['dbData','$uibModal'];
    /* global angular */
    angular.module('autoService').controller('dbPageCtrl', dbPageCtrl);
})();
