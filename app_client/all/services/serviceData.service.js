(function() {
    function serviceData($http) {
        var data = function() {
            return $http.get('/api/services');
        };

        return {
            services: data
        };
    }
    serviceData.$inject = ['$http'];

    /* global angular */
    angular.module('autoService').service('serviceData', serviceData);
})();
