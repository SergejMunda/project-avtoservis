(function() {
    function audit($http, authentication) {
        var log = function(page) {
            console.log('test');
            data = {
                time: Date.now(),
                user: authentication.logedin()
                    ? JSON.stringify(authentication.currUser())
                    : 'Guest',
                page: page
            };
            return $http.post('/api/audit', data);
        };

        return {
            log: log
        };
    }
    audit.$inject = ['$http', 'authentication'];

    /* global angular*/
    angular.module('autoService').service('audit', audit);
})();
