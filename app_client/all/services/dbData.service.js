(function(){
    function dbData($http){
        var data = function(page){
            return $http.get('/api/db');
            
        };
        var dbDelete = function(){
            return $http.delete('/api/db');
        };
        var dbAdd = function(data){
            return $http.post('/api/db',data);
        };
        
        return {
            db: data,
            dbDelete :dbDelete,
            dbAdd: dbAdd
        };
    }
    dbData.$inject = ['$http'];
    
    /* global angular */
    angular.module('autoService').service('dbData',dbData);
})();