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
                if (result.resultCode == 1) {
                    var user = $scope.user;
                    user.height = user.heightUpdate;
                    user.weight = user.weightUpdate;
                    user.age = user.ageUpdate;
                    user.username = user.usernameUpdate;
                    user.sex = user.sexUpdate;

                    $scope.changeSelection("timeline");
                }
            });
            //just for development
            var user = $scope.user;
            user.height = user.heightUpdate;
            user.weight = user.weightUpdate;
            user.age = user.ageUpdate;
            user.username = user.usernameUpdate;
            user.sex = user.sexUpdate;

            $scope.changeSelection("timeline");

        }
    }

})();
