(function() {
    //specification of the router provider.
    function provider($routeProvider, $locationProvider, $httpProvider) {
        $httpProvider.defaults.headers.get = { 'X-Frame-Options': 'DENY' };
        $routeProvider
            .when('/', {
                templateUrl: 'frontPage/frontPage.view.html',
                controller: 'frontPageCtrl',
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
            .when('/contact', {
                templateUrl: 'contact/contact.view.html',
                controller: 'contactCtrl',
                controllerAs: 'vm'
            })
            .when('/db', {
                templateUrl: 'dbPage/dbPage.view.html',
                controller: 'dbPageCtrl',
                controllerAs: 'vm'
            })
            .when('/serviceTypes', {
                templateUrl: 'serviceType/serviceType.view.html',
                controller: 'serviceTypeCtrl',
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
        .config(['$routeProvider', '$locationProvider', '$httpProvider', provider]);
})();
