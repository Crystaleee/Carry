(function() {
    'use strict';

    angular
        .module('app')
        .controller('TimelineController', TimelineController);

    TimelineController.$inject = ['$location', '$scope', 'AuthenticationService', 'UserService', '$rootScope'];

    function TimelineController($location, $scope, AuthenticationService, UserService, $rootScope) {
        (function initController() {
            $rootScope.recordList = [];
            loadUserRecord();
        })();

        function loadUserRecord() {
            //for test
            var result = {
                resultMessage: {
                    resultCode: 1
                },
                recordArray: [{
                        recordID: "1",
                        date: "2017/12/01",
                        exercise_category: "running, swimming, boxing",
                        exercise_time: "30, 20, 10",
                        exercise_calorie: "1, 100, 100",
                        food_category: "apple, pork, beef",
                        food_amount: "1, 100, 100",
                        food_calorie: "1, 100, 100"
                    },
                    {
                        recordID: "2",
                        date: "2017/12/02",
                        exercise_category: "running, swimming, boxing",
                        exercise_time: "30, 20, 10",
                        exercise_calorie: "1, 100, 100",
                        food_category: "apple, pork, beef",
                        food_amount: "1, 100, 100",
                        food_calorie: "1, 100, 100"
                    }
                ]
            };
            for (var i = 0; i < result.recordArray.length; i++) {
                $rootScope.recordList.push(parseRecordData(result.recordArray[i]));
            }

            UserService.LoadUserRecord(function(response) {
                var result = $.parseJSON(response);
                console.log("load user record: ");
                console.log(result);
                if (result.resultMessage.resultCode == 1) {
                    for (var i = 0; i < result.recordArray.length; i++) {
                        $rootScope.recordList.push(parseRecordData(result.recordArray[i]));
                    }
                }
            });
        };

        $scope.editRecord = function(record) {
            $scope.changeSelection("record");
            $rootScope.recordToEdit = record;
        };

        $scope.deleteRecord = function(record) {
            console.log("delete recordID: " + record.recordID);
            $scope.recordList = $scope.recordList.filter(function(ele) {
                return ele.recordID !== record.recordID;
            });
            // UserService.DeleteRecord(record.recordID, function(response) {
            //     var result = $.parseJSON(response);
            //     console.log(result);
            //     if (result.resultMessage.resultCode == 1) {
            //         $scope.recordList = $scope.recordList.filter(function(ele) {
            //             return ele.recordID !== record.recordID;
            //         });
            //     }
            // });
        };

        // return a random number between [1, bound]
        $scope.random = function(bound) {
            return Math.floor((Math.random() * bound) + 1);
        }

    }

})();
