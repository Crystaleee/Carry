(function() {
    'use strict';

    angular
        .module('app')
        .controller('RecordController', RecordController);

    RecordController.$inject = ['$scope', 'UserService', '$rootScope'];

    function RecordController($scope, UserService, $rootScope) {

        $scope.init = function(record) {
            $scope.foodOptions = [
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
                "rope skipping",
                "squash",
                "tennis",
                "volleyball"
            ];
            if (record == undefined || record == null) { // if there's no reocrd to edit
                $scope.record = {
                    date: null,
                    foodList: [new Food()],
                    exerciseList: [new Exercise()]
                }
            } else {
                console.log(record);
                $scope.record = record;
            }


        };

        $scope.updateRecord = function() {
            var data = createRecordData($scope.record, $scope.user.userID);
            console.log(data);

            //if there's no recordID, upload new record
            if (data.recordID == undefined || data.recordID == null) {
                UserService.UploadRecord(data, function(result) {
                    console.log(result);
                    if (result.resultCode == 1) {

                        $scope.changeSelection("timeline");
                    }
                });
            } else { // else update existing record
                UserService.UpdateRecord(data, function(response) {
                    var result = $.parseJSON(response);
                    console.log(result);
                    if (result.resultCode == 1) {
                        $rootScope.recordToEdit = undefined;
                        $scope.changeSelection("timeline");
                    }
                });
            }
            //for test
            // $rootScope.recordToEdit = undefined;
            // $scope.changeSelection("timeline");
        };

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
