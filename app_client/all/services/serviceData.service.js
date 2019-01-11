(function() {
    function serviceData($http) {
        var data = function() {
            return $http.get('/api/services');
        };
        var serviceDelete = function(id) {
            return $http.delete('/api/services/' + id);
        };
        var addNew = function(data) {
            return $http.post('/api/services', data);
        };
        var update = function(id, data) {
            console.log('test');
            return $http.put('/api/services/' + id, data);
        };

        return {
            services: data,
            serviceDelete: serviceDelete,
            addNew: addNew,
            update: update
        };
    }
    serviceData.$inject = ['$http'];

    /* global angular */
    angular.module('autoService').service('serviceData', serviceData);
})();
