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
                    user.birthday = user.birthdayUpdate;
                    user.username = user.usernameUpdate;
                    user.sex = user.sexUpdate;

                    $scope.changeSelection("timeline");
                }
            });


            // //just for development
            // var user = $scope.user;
            // user.height = user.heightUpdate;
            // user.weight = user.weightUpdate;
            // user.birthday = user.birthdayUpdate;
            // user.username = user.usernameUpdate;
            // user.sex = user.sexUpdate;
            //
            // $scope.changeSelection("timeline");

        }

        $scope.clear = function() {
            $scope.user.birthdayUpdate = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: false
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

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

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [{
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }
    }

})();
