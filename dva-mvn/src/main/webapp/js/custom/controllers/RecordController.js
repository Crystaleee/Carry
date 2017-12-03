(function() {
    'use strict';

    angular
        .module('app')
        .controller('RecordController', RecordController);

    RecordController.$inject = ['$location', '$scope', 'AuthenticationService', 'UserService'];

    function RecordController($location, $scope, AuthenticationService, UserService) {
        (function initController() {
            $scope.record = {
                date: null,
                foodList: [new Food()],
                exerciseList: [new Exercise()]
            }
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

        $scope.uploadRecord = function() {
            var data = createRecordData();
            console.log(data);

            UserService.UploadRecord(data, function(response) {
                var result = $.parseJSON(response);
                console.log(result);
                if (result.resultCode == 1) {
                    var user = $scope.user;
                    user.height = user.heightUpdate;
                    user.weight = user.weightUpdate;
                    user.birthday = formatDate($scope.user.birthdayUpdate); //convert to string
                    user.username = user.usernameUpdate;
                    user.sex = user.sexUpdate;

                    $scope.changeSelection("timeline");
                }
            });
        }

        /** data format
        {
             userID: "mingzi",
             date: "2017/12/01",
             exercise_category: "running, swimming, boxing",
             exercise_time: "30, 20, 10",
             food_category: "apple, pork, beef",
             food_amount: "1, 100, 100"
        }*/
        function createRecordData() {
            var data = {};
            var foodList = $scope.record.foodList;
            var exerciseList = $scope.record.exerciseList;
            data.userID = $scope.user.userID;
            data.date = formatDate($scope.record.date);
            if (foodList[0] != undefined) {
                data.food_category = foodList[0].food_category;
                data.food_amount = foodList[0].food_amount;
            }
            if (exerciseList[0] != undefined) {
                data.exercise_category = exerciseList[0].exercise_category;
                data.exercise_time = exerciseList[0].exercise_time;
            }

            for (var i = 1; i < foodList.length; i++) {
                data.food_category += "," + foodList[i].food_category;
                data.food_amount += "," + foodList[i].food_amount;
            }
            for (var i = 1; i < exerciseList.length; i++) {
                data.exercise_category += "," + exerciseList[i].exercise_category;
                data.exercise_time += "," + exerciseList[i].exercise_time;
            }
            return data;
        }

        $scope.addFood = function() {
            $scope.record.foodList.push(new Food());
        }

        $scope.addExercise = function() {
            $scope.record.exerciseList.push(new Exercise());
        }

        $scope.deleteFood = function(index) {
            $scope.record.foodList.splice(index, 1);
        }

        $scope.deleteExercise = function(index) {
            $scope.record.exerciseList.splice(index, 1);
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
