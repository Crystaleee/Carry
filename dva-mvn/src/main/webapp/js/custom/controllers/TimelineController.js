(function() {
    'use strict';

    angular
        .module('app')
        .controller('TimelineController', TimelineController);

    TimelineController.$inject = ['$location', '$scope', 'AuthenticationService', 'UserService', '$rootScope'];

    function TimelineController($location, $scope, AuthenticationService, UserService, $rootScope) {
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
