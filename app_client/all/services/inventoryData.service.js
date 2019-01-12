(function() {
    function inventoryData($http, authentication) {
        var data = function(page) {
            console.log(page);
            if (!page) {
                return $http.get('/api/inventory', {
                    headers: {
                        Authorization: 'Bearer ' + authentication.returnToken()
                    }
                });
            } else {
                return $http.get('/api/inventory?page=' + page, {
                    headers: {
                        Authorization: 'Bearer ' + authentication.returnToken()
                    }
                });
            }
        };
        var addNew = function(data) {
            return $http.post('/api/inventory', data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.returnToken()
                }
            });
        };
        var update = function(id, data) {
            console.log('test');
            return $http.put('/api/inventory/' + id, data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.returnToken()
                }
            });
        };
        var inventoryDelete = function(id) {
            return $http.delete('/api/inventory/' + id, {
                headers: {
                    Authorization: 'Bearer ' + authentication.returnToken()
                }
            });
        };

        return {
            inventory: data,
            inventoryDelete: inventoryDelete,
            addNew: addNew,
            update: update
        };
    }
    inventoryData.$inject = ['$http', 'authentication'];

    /* global angular*/
    angular.module('autoService').service('inventoryData', inventoryData);
})();
