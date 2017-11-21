(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'AuthenticationService', '$rootScope'];

    function HomeController($scope, AuthenticationService, $rootScope) {

        (function initController() {
<<<<<<< HEAD
            loadCurrentUser();
        })();

        function loadCurrentUser() {
            $scope.user = $rootScope.globals.currentUser;
=======
            loadUserProfile();
            $scope.selection = "timeline";
        })();

        function loadUserProfile() {
            UserService.LoadUserProfile(function(response) {
                var result = $.parseJSON(response);
                console.log(result);
                if (result.resultMessage.resultCode == 1) {
                    var user = $scope.user;
                    user.height = result.resultMessage.height;
                    user.weight = result.resultMessage.weight;
                    user.age = result.resultMessage.age;
                    user.username = result.resultMessage.username;
                    user.sex = result.resultMessage.sex;

                    $scope.changeSelection("timeline");
                }
            });
            // $scope.user = $rootScope.globals.currentUser;
        }

        $scope.logout = function() {
            AuthenticationService.ClearCredentials();
            $location.path('/login');
>>>>>>> b03c4bbc6c4147021ce0052d7755564c28b8c335
        }

        // $scope.logout = function() {
        //     AuthenticationService.ClearCredentials();
        // }
    }

})();
