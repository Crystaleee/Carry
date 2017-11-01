(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'AuthenticationService', '$rootScope'];

    function HomeController($scope, AuthenticationService, $rootScope) {

        (function initController() {
            loadCurrentUser();
            $scope.selection = "timeline";
        })();

        function loadCurrentUser() {
            $scope.user = $rootScope.globals.currentUser;

            var user = $scope.user;
            user.newUsername = user.username;
            user.newAge = user.age;
            user.newHeight = user.height;
            user.newWeight = user.weight;
            user.bf = user.height - user.weight;
        }

        // $scope.logout = function() {
        //     AuthenticationService.ClearCredentials();
        // }

        $scope.$watch('b', function(newValue) {
            $scope.a = newValue;
        });

        $scope.updateProfile = function() {
            var user = $scope.user;
            user.height = user.newHeight;
            user.weight = user.newWeight;
            user.age = user.newAge;
            user.username = user.newUsername;

            $scope.selection = "timeline";
        }

        $scope.changeSelection = function(select) {
            $scope.selection = select;
        }
    }

})();
