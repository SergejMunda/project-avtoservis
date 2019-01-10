(function(){
    function inventoryData($http){
        var data = function(){
            return $http.get('/api/inventory');
        };
        
        function add($http){
            var addItem = function(name,description,quantity){
                return $http({
                    method : 'POST',
                    url : 'items',
                    data : {
                        name : name,
                        description: description,
                        quantity: quantity
                    }
                });
            };
        }
        
        
        return {
            inventory: data
        };
    }
    inventoryData.$inject = ['$http'];
    
    /* global angular*/
    angular.module('autoService').service('inventoryData', inventoryData);
})();