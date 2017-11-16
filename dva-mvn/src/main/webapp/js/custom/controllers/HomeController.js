(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$location', '$scope', 'AuthenticationService', 'UserService', '$rootScope'];

    function HomeController($location, $scope, AuthenticationService, UserService, $rootScope) {

        (function initController() {
            loadCurrentUser();
            $scope.selection = "timeline";
        })();

        function loadCurrentUser() {
            //$scope.user = UserService.LoadCurrentUser();
            $scope.user = $rootScope.globals.currentUser;

            var user = $scope.user;
            user.newUsername = user.username;
            user.newAge = user.age;
            user.newHeight = user.height;
            user.newWeight = user.weight;
            user.newSex = user.sex;
        }

        $scope.logout = function() {
            AuthenticationService.ClearCredentials();
            $location.path('/login');
        }

        // $scope.$watch('user.weight', function(newValue, oldValue) {
        //     var user = $scope.user;
        //     var bmi = newValue / (user.height * user.height);
        //     user.bmi = (bmi > 0) ? bmi : "Please update";
        // });

        $scope.changeSelection = function(select) {
            $scope.selection = select;
        }
    }

})();
