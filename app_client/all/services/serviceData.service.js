(function() {
    function serviceData($http, authentication) {
        var data = function(page) {
            if (!page) {
                return $http.get('/api/services', {
                    headers: {
                        Authorization: 'Bearer ' + authentication.returnToken()
                    }
                });
            } else {
                return $http.get('/api/services?page=' + page, {
                    headers: {
                        Authorization: 'Bearer ' + authentication.returnToken()
                    }
                });
            }
        };
        var serviceDelete = function(id) {
            return $http.delete('/api/services/' + id, {
                headers: {
                    Authorization: 'Bearer ' + authentication.returnToken()
                }
            });
        };
        var addNew = function(data) {
            return $http.post('/api/services', data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.returnToken()
                }
            });
        };
        var update = function(id, data) {
            return $http.put('/api/services/' + id, data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.returnToken()
                }
            });
        };

        return {
            services: data,
            serviceDelete: serviceDelete,
            addNew: addNew,
            update: update
        };
    }
    serviceData.$inject = ['$http', 'authentication'];

    /* global angular */
    angular.module('autoService').service('serviceData', serviceData);
})();
