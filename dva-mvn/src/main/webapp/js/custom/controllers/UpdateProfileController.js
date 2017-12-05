(function() {
    'use strict';

    angular
        .module('app')
        .controller('UpdateProfileController', UpdateProfileController);

    UpdateProfileController.$inject = ['$location', '$scope', 'AuthenticationService', 'UserService'];

    function UpdateProfileController($location, $scope, AuthenticationService, UserService) {

        $scope.updateProfile = function() {
            var form = $('#update-profile-form');
            UserService.UpdateProfile(form, function(response) {
                var result = $.parseJSON(response);
                console.log(result);
                if (result.resultCode == 1) {
                    var user = $scope.user;
                    user.height = user.heightUpdate;
                    user.weight = user.weightUpdate;
                    user.birthday = formatDate($scope.user.birthdayUpdate); //convert to string
                    user.name = user.nameUpdate;
                    user.sex = user.sexUpdate;

                    $scope.showalert("Profile updated successfully!", "success");
                    $scope.changeSelection("timeline");
                }
            });

        }

        $scope.inlineOptions = {
            minDate: new Date(),
            showWeeks: false
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(),
            minDate: new Date(),
            startingDay: 1
        };

        $scope.toggleMin = function() {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();


        $scope.open = function() {
            $scope.popup.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.user.birthdayUpdate = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup = {
            opened: false
        };

    }

})();
