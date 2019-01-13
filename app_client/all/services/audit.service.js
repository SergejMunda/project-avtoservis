(function() {
    function audit($http, authentication) {
        var log = function(page) {
            data = {
                time: Date.now(),
                user: authentication.logedin()
                    ? JSON.stringify(authentication.currUser())
                    : 'Guest',
                page: page
            };
            return $http.post('/api/audit', data);
        };

        var sendMessage = function(message) {
            return $http.post('/api/bot', { text: message });
        };
        return {
            log: log,
            sendMessage: sendMessage
        };
    }
    audit.$inject = ['$http', 'authentication'];

    /* global angular*/
    angular.module('autoService').service('audit', audit);
})();
