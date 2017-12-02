(function() {
    'use strict';

    angular
        .module('app')
        .controller('RecordController', RecordController);

    RecordController.$inject = ['$location', '$scope', 'AuthenticationService', 'UserService'];

    function RecordController($location, $scope, AuthenticationService, UserService) {
        (function initController() {
            $scope.foodList = [new Food()];
            $scope.exerciseList = [new Exercise()];

            $scope.foodOptions = [
                "pork",
                "beef",
                "chicken"
            ];
            $scope.exerciseOptions = [
                "running",
                "swimming",
                "dancing"
            ];
        })();

        $scope.addFood = function() {
            $scope.foodList.push(new Food());
        }

        $scope.addExercise = function() {
            $scope.exerciseList.push(new Exercise());
        }
        // food class
        function Food() {
            this.food_category = null;
            this.food_amount = null;
        }

        // food class
        function Exercise() {
            this.exercise_category = null;
            this.exercise_time = null;
        }

        // datetimepicker
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
