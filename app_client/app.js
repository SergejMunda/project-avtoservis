(function() {
    //specification of the router provider.
    function provider($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'services/services.view.html',
                controller: 'serviceCtrl',
                controllerAs: 'vm'
            })
            .when('/services', {
                templateUrl: 'services/services.view.html',
                controller: 'servicesCtrl',
                controllerAs: 'vm'
            })
            .when('/services/form', {
                templateUrl: 'serviceForm/serviceForm.view.html',
                controller: 'serviceFormCtrl',
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: '/' });

        //Remove #:
        //1.We will use the $locationProvider module and set html5Mode to true.
        //2. then remove all preceding # for relative routes (i.e. '#/comments'
        //to '/comments')
        //3. put base in html head tag, like: `base(href='/')`
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('');
    }

    /* global angular */
    angular
        .module('autoService', ['ngRoute'])
        .config(['$routeProvider', '$locationProvider', provider]);
})();
