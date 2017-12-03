(function() {
    'use strict';

    angular
        .module('app')
        .controller('TimelineController', TimelineController);

    TimelineController.$inject = ['$location', '$scope', 'AuthenticationService', 'UserService', '$rootScope'];

    function TimelineController($location, $scope, AuthenticationService, UserService, $rootScope) {
        (function initController() {
            $scope.recordList = [];
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
                $scope.recordList.push(parseRecordData(result.recordArray[i]));
            }

            UserService.LoadUserRecord(function(response) {
                var result = $.parseJSON(response);
                console.log(result);
                if (result.resultMessage.resultCode == 1) {
                    for (var i = 0; i < result.recordArray.length; i++) {
                        $scope.recordList.push(parseRecordData(result.recordArray[i]));
                    }
                }
            });
        };

        $scope.editRecord = function(record) {
            $scope.changeSelection("record");
            $rootScope.recordToEdit = record;
        };

    }

})();
