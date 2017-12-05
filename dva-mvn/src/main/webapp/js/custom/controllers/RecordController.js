(function() {
    'use strict';

    angular
        .module('app')
        .controller('RecordController', RecordController);

    RecordController.$inject = ['$scope', 'UserService', '$rootScope'];

    function RecordController($scope, UserService, $rootScope) {
        (function initController() {
            $scope.foodOptions = [
                "Sushi",
                "Egg",
                "Pork",
                "Steak",
                "Chicken",
                "Broccoli",
                "Carrot",
                "Mushroom",
                "Apple",
                "Banana",
                "Watermelon",
                "Coca"
            ];
            $scope.exerciseOptions = [
                "Swimming",
                "Basketball",
                "Fitness",
                "Soccer",
                "Jogging",
                "Bicycling",
                "Rope skipping",
                "Squash",
                "Tennis",
                "Volleyball"
            ];
            if ($rootScope.recordToEdit == undefined || $rootScope.recordToEdit == null) { // if there's no reocrd to edit
                $scope.record = {
                    date: null,
                    foodList: [new Food()],
                    exerciseList: [new Exercise()]
                }
            } else {
                console.log($rootScope.recordToEdit);
                $scope.record = $rootScope.recordToEdit;
            }
        })();

        $scope.updateRecord = function() {
            var data = createRecordData($scope.record, $scope.user.userID);
            console.log("update/upload record:")
            console.log(data);

            //if there's no record to edit, upload new record
            if ($rootScope.recordToEdit == undefined || $rootScope.recordToEdit == null) {
                UserService.UploadRecord(data, function(result) {
                    console.log(result);
                    if (result.resultMessage.resultCode == 1) {
                        $rootScope.showalert("Your fitness is recorded successfully!", "success");
                        $scope.changeSelection("timeline");
                    } else {
                        $rootScope.showalert(result.resultTips, "success");
                    }
                });
            } else { // else update existing record
                UserService.UpdateRecord(data, function(result) {
                    console.log(result);
                    if (result.resultCode == 1) {
                        $rootScope.recordToEdit = undefined;
                        $rootScope.showalert("Your record is updated successfully!", "success");
                        $scope.changeSelection("timeline");
                    } else {
                        $rootScope.showalert(result.resultTips, "success");
                    }
                });
            }
            //for test
            // $rootScope.recordToEdit = undefined;
            // $scope.changeSelection("timeline");
        };

        $scope.cancelRecord = function() {
            $scope.changeSelection('timeline');
            $rootScope.recordToEdit = undefined;
        }

        $scope.addFood = function() {
            $scope.record.foodList.push(new Food());
        };

        $scope.addExercise = function() {
            $scope.record.exerciseList.push(new Exercise());
        };

        $scope.deleteFood = function(index) {
            $scope.record.foodList.splice(index, 1);
        };

        $scope.deleteExercise = function(index) {
            $scope.record.exerciseList.splice(index, 1);
        };

        /*  datetimepicker */
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
