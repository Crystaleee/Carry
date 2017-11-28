(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$scope', 'AuthenticationService', 'UserService'];

    function LoginController($location, $scope, AuthenticationService, UserService) {
        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();

            $scope.kaptcha = "/dva-mvn/kaptcha/getKaptcha.do"

            $scope.loginData = {
                userId: null,
                password: null,
                rememberme: true,
                kaptcha: null
            };
        })();

        $scope.login = function() {
            // AuthenticationService.SetCredentials($scope.loginData.userId);
            // $location.path('/');
            UserService.Login($scope.loginData.userId, $scope.loginData.password, $scope.loginData.rememberme, $scope.loginData.kaptcha, function(response) {
                var result = $.parseJSON(response);
                console.log(result);
                if (result.resultCode == 1) {
                    AuthenticationService.SetCredentials($scope.loginData.userId);
                    $location.path('/');

                } else {
                    alert(result.resultTips);
                    console.log("error");
                }
            });
        }

        $scope.changeKaptcha = function(node) {
            $scope.kaptcha = "/dva-mvn/kaptcha/getKaptcha.do?time=" + new Date().getTime();
        };
    }

})();
