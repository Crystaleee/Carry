(function() {
    'use strict';

    angular
        .module('app')
        .controller('UpdateProfileController', UpdateProfileController);

    UpdateProfileController.$inject = ['$location', '$scope', 'AuthenticationService', 'UserService', '$rootScope'];

    function UpdateProfileController($location, $scope, AuthenticationService, UserService, $rootScope) {

        $scope.updateProfile = function() {
            var form = $('#update-form');
            UserService.UpdateProfile(form, function(response) {
                var result = $.parseJSON(response);
                console.log(result);
                if (result.resultMessage.resultCode == 1) {
                    var user = $scope.user;
                    user.height = user.newHeight;
                    user.weight = user.newWeight;
                    user.age = user.newAge;
                    user.username = user.newUsername;
                    user.sex = user.newSex;

                    $scope.changeSelection("timeline");
                }
            });
            //just for development
            var user = $scope.user;
            user.height = user.newHeight;
            user.weight = user.newWeight;
            user.age = user.newAge;
            user.username = user.newUsername;
            user.sex = user.newSex;

            $scope.changeSelection("timeline");

        }
    }

})();
