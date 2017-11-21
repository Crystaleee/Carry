(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'AuthenticationService', '$rootScope'];

    function HomeController($scope, AuthenticationService, $rootScope) {

        (function initController() {
            loadCurrentUser();
        })();

        function loadCurrentUser() {
            $scope.user = $rootScope.globals.currentUser;
        }

        // $scope.logout = function() {
        //     AuthenticationService.ClearCredentials();
        // }
    }

})();
