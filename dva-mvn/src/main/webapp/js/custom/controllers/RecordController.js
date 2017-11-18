(function() {
    'use strict';

    angular
        .module('app')
        .controller('RecordController', RecordController);

    RecordController.$inject = ['$location', '$scope', 'AuthenticationService'];

    function RecordController($location, $scope, AuthenticationService) {
        (function initController() {
            loadUserRecord();
        })();

        function loadUserRecord() {
            UserService.LoadUserRecord(function(response) {
                var result = $.parseJSON(response);
                console.log(result);
                if (result.resultMessage.resultCode == 1) {

                }
            });
        }
    }

})();
