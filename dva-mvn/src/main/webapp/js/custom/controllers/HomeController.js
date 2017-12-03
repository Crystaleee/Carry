// HomeController
(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$location', '$scope', 'AuthenticationService', 'UserService', '$rootScope'];

    function HomeController($location, $scope, AuthenticationService, UserService, $rootScope) {

        (function initController() {
            loadUserProfile();
            $scope.selection = "timeline";
        })();

        function loadUserProfile() {
            var user = $scope.user = {};
            user.userID = user.usernameUpdate = $rootScope.globals.currentUser.userID;

            UserService.LoadUserProfile(function(result) {
                console.log(result);
                if (result.resultMessage.resultCode == 1) {
                    user.height = user.heightUpdate = result.height;
                    user.weight = user.weightUpdate = result.weight;
                    //date need convertion
                    user.birthday = result.birthday;
                    user.birthdayUpdate = new Date(result.birthday + "Z");
                    user.name = user.nameUpdate = result.name;
                    user.sex = user.sexUpdate = result.sex;
                }
            });
        }

        $scope.logout = function() {
            AuthenticationService.ClearCredentials();
            $location.path('/login');
        }

        $scope.changeSelection = function(select) {
            $scope.selection = select;
        }
    }

})();
