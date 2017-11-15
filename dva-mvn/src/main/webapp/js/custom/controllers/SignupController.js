(function() {
    'use strict';

    angular
        .module('app')
        .controller('SignupController', SignupController)
        .filter('split', split);

    function split() {
        return function(input, splitChar, splitIndex) {
            // do some bounds checking here to ensure it has that index
            return input.split(splitChar)[splitIndex];
        }
    }

    SignupController.$inject = ['$location', '$scope', 'UserService'];

    function SignupController($location, $scope, UserService) {
        (function initController() {

            $scope.step = 1;
            $scope.sex = "male";
            $scope.email = "";

        })();

        $scope.checkUsername = function() {
            if ($scope.userId == undefined) return;
            UserService.CheckUsername($scope.userId, function(response) {
                var result = $.parseJSON(response);
                console.log(result);
                if (result.resultCode == 1) {
                    //set input userId as valid
                    $scope.form.userId.$setValidity(result.resultTips, true);

                } else {
                    //set input userId as invalid
                    $scope.form.userId.$setValidity(result.resultTips, false);
                    console.log("error");
                }
            });
        }

        $scope.checkEmail = function() {
            if ($scope.email == undefined) return;
            UserService.CheckEmail($scope.email, function(response) {
                var result = $.parseJSON(response);
                console.log(result);
                if (result.resultCode == 1) {
                    //set input email as valid
                    $scope.form.email.$setValidity(result.resultTips, true);

                } else {
                    //set input email as invalid
                    $scope.form.email.$setValidity(result.resultTips, false);
                    console.log("error");
                }
            });
        }

        $scope.signup = function() {
            var form = $('.registration-form');
            UserService.Signup(form, function(response) {
                var result = $.parseJSON(response);
                console.log(result);
                if (result.resultMessage.resultCode == 1) {
                    $scope.step = 3;
                }
            });
        }
    }

})();
