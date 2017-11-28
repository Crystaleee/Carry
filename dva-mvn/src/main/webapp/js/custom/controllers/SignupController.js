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

    SignupController.$inject = ['$scope', 'UserService'];

    function SignupController($scope, UserService) {
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
                    $scope.form.userId.$setValidity("unique", true);

                } else {
                    //set input userId as invalid
                    $scope.form.userId.$setValidity("unique", false);
                    console.log(result.resultTips);
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
                    $scope.form.email.$setValidity("unique", true);

                } else {
                    //set input email as invalid
                    $scope.form.email.$setValidity("unique", false);
                    console.log(result.resultTips);
                }
            });
        }
        $scope.clear = function() {
            $scope.dt = null;
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
            $scope.dt = new Date(year, month, day);
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

        $scope.signup = function() {
            var form = $('.registration-form');
            $scope.step = 3;
            UserService.Signup(form, function(response) {
                var result = $.parseJSON(response);
                console.log(result);
                if (result.resultMessage.resultCode != 1) {
                    $scope.step = 2;
                }
            });
        }
    }

})();
