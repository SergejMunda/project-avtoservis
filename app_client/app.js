(function() {
    //specification of the router provider.
    function provider($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'services/services.view.html',
                controller: 'servicesCtrl',
                controllerAs: 'vm'
            })
            .when('/services', {
                templateUrl: 'services/services.view.html',
                controller: 'servicesCtrl',
                controllerAs: 'vm'
            })
            .when('/inventory', {
                templateUrl: 'inventory/inventory.view.html',
                controller: 'inventoryCtrl',
                controllerAs: 'vm'
            })
            .when('/inventory/form', {
                templateUrl: 'inventoryForm/inventoryForm.view.html',
                controller: 'inventoryFormCtrl',
                controllerAs: 'vm'
            })
            .when('/login', {
                templateUrl: 'auth/login/login.view.html',
                controller: 'loginCtrl',
                controllerAs: 'vm'
            })
            .when('/registration', {
                templateUrl: '/auth/registration/registration.view.html',
                controller: 'registrationCtrl',
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
        .module('autoService', ['ngRoute', 'ui.bootstrap'])
        .config(['$routeProvider', '$locationProvider', provider]);
})();
