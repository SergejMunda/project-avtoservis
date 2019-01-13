(function() {
    function loginCtrl(authentication, $location) {
        var vm = this;

        vm.loginData = {
            mail: '',
            pass: ''
        };
        vm.error = '';

        // vm.firstToDisplay = $location.search().page || '/';

        vm.sendContent = function() {
            vm.error = '';
            if (!vm.loginData.mail || !vm.loginData.pass) {
                vm.error = 'All data required.';
                return false;
            } else {
                vm.login();
            }
        };

        vm.login = function() {
            vm.error = '';
            console.log(vm.loginData);
            authentication.login(vm.loginData).then(
                function(success) {
                    console.log('dela', success);

                    $location.path('/inventory');
                },
                function(error) {
                    vm.error = error.data;
                }
            );
        };
    }
    loginCtrl.$inject = ['authentication', '$location'];

    /* global angular */
    angular.module('autoService').controller('loginCtrl', loginCtrl);
})();