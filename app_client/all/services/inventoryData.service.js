(function(){
    function inventoryData($http){
        var data = function(){
            return $http.get('/api/inventory');
        };
        var addNew = function(data){
            return $http.post('api/inventory/', data);
        };
        var inventoryDelete = function(id){
          return $http.delete('api/inventory/' + id);  
        };
        return {
            inventory: data,
            inventoryDelete: inventoryDelete,
            addNew: addNew
        };
    }
    inventoryData.$inject = ['$http'];
    
    /* global angular*/
    angular.module('autoService').service('inventoryData', inventoryData);
})();