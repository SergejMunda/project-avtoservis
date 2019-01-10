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

        return {
            services: data,
            serviceDelete: serviceDelete,
            addNew: addNew
        };
    }
    serviceData.$inject = ['$http'];

    /* global angular */
    angular.module('autoService').service('serviceData', serviceData);
})();
