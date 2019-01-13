(function() {
    function serviceTypeData($http, authentication) {
        var data = function(page) {
            if (!page) {
                return $http.get('/api/serviceTypes', {
                    headers: {
                        Authorization: 'Bearer ' + authentication.returnToken()
                    }
                });
            } else {
                return $http.get('/api/serviceTypes?page=' + page, {
                    headers: {
                        Authorization: 'Bearer ' + authentication.returnToken()
                    }
                });
            }
        };
        var serviceDelete = function(id) {
            return $http.delete('/api/serviceTypes/' + id, {
                headers: {
                    Authorization: 'Bearer ' + authentication.returnToken()
                }
            });
        };
        var addNew = function(data) {
            return $http.post('/api/serviceTypes', data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.returnToken()
                }
            });
        };
        var update = function(id, data) {
            return $http.put('/api/serviceTypes/' + id, data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.returnToken()
                }
            });
        };

        return {
            serviceTypes: data,
            serviceDelete: serviceDelete,
            addNew: addNew,
            update: update
        };
    }
    serviceTypeData.$inject = ['$http', 'authentication'];

    /* global angular */
    angular.module('autoService').service('serviceTypeData', serviceTypeData);
})();
