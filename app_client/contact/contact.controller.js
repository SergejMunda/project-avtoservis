(function() {
    function contactCtrl(audit) {
        var vm = this;
        vm.msg = '';
        vm.error = '';
        vm.text = '';

        audit.log('contact');
        vm.sendMessage = function() {
            audit.sendMessage(vm.text).then(
                function succes(response) {
                    vm.msg = 'Message send successfully';
                },
                function error(response) {
                    vm.msg = 'Failed to send message.';
                }
            );
        };
    }
    contactCtrl.$inject = ['audit'];
    /* global angular */
    angular.module('autoService').controller('contactCtrl', contactCtrl);
})();
