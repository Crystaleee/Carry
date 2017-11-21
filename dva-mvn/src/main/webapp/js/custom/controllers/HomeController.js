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
            // UserService.LoadUserProfile(function(response) {
            //     var result = $.parseJSON(response);
            //     console.log(result);
            //     if (result.resultMessage.resultCode == 1) {
            //         var user = $scope.user;
            //         user.height = result.resultMessage.height;
            //         user.weight = result.resultMessage.weight;
            //         user.age = result.resultMessage.age;
            //         user.username = result.resultMessage.username;
            //         user.sex = result.resultMessage.sex;
            //
            //         $scope.changeSelection("timeline");
            //     }
            // });
            $scope.user = $rootScope.globals.currentUser;
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
