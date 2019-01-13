(function(){
    function dbData($http){
        var data = function(){
            return $http.get('/api/db');
            
        };
        var dbDelete = function(){
            return $http.delete('/api/db');
        };
        var dbAdd = function(){
            return $http.post('/api/db');
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