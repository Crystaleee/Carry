(function() {
    'use strict';

    angular
        .module('app')
        .controller('TimelineController', TimelineController);

    TimelineController.$inject = ['$location', '$scope', 'AuthenticationService', 'UserService', '$rootScope'];

    function TimelineController($location, $scope, AuthenticationService, UserService, $rootScope) {
        (function initController() {
            loadUserRecord();
            // $rootScope.recordList = [{
            //         date: new Date("2017-11-01"),
            //         foodList: [{
            //                 food_category: "Apple",
            //                 food_amount: "1",
            //                 food_calorie: "100"
            //             },
            //             {
            //                 food_category: "Apple",
            //                 food_amount: "1",
            //                 food_calorie: "100"
            //             }
            //         ],
            //         exerciseList: [{
            //                 exercise_category: "Run",
            //                 exercise_time: "30",
            //                 exercise_calorie: "300"
            //             },
            //             {
            //                 exercise_category: "Run",
            //                 exercise_time: "30",
            //                 exercise_calorie: "300"
            //             }
            //         ]
            //     },
            //     {
            //         date: new Date("2017-11-02"),
            //         foodList: [{
            //                 food_category: "Apple",
            //                 food_amount: "1",
            //                 food_calorie: "100"
            //             },
            //             {
            //                 food_category: "Apple",
            //                 food_amount: "1",
            //                 food_calorie: "100"
            //             }
            //         ],
            //         exerciseList: [{
            //                 exercise_category: "Run",
            //                 exercise_time: "30",
            //                 exercise_calorie: "300"
            //             },
            //             {
            //                 exercise_category: "Run",
            //                 exercise_time: "30",
            //                 exercise_calorie: "300"
            //             }
            //         ]
            //     },
            //     {
            //         date: new Date("2017-11-03"),
            //         foodList: [{
            //                 food_category: "Apple",
            //                 food_amount: "1",
            //                 food_calorie: "100"
            //             },
            //             {
            //                 food_category: "Apple",
            //                 food_amount: "1",
            //                 food_calorie: "100"
            //             }
            //         ],
            //         exerciseList: [{
            //                 exercise_category: "Run",
            //                 exercise_time: "30",
            //                 exercise_calorie: "300"
            //             },
            //             {
            //                 exercise_category: "Run",
            //                 exercise_time: "30",
            //                 exercise_calorie: "300"
            //             }
            //         ]
            //     },
            //     {
            //         date: new Date("2017-11-04"),
            //         foodList: [{
            //                 food_category: "Apple",
            //                 food_amount: "1",
            //                 food_calorie: "100"
            //             },
            //             {
            //                 food_category: "Apple",
            //                 food_amount: "1",
            //                 food_calorie: "100"
            //             },
            //             {
            //                 food_category: "Apple",
            //                 food_amount: "1",
            //                 food_calorie: "100"
            //             },
            //             {
            //                 food_category: "Apple",
            //                 food_amount: "1",
            //                 food_calorie: "100"
            //             },
            //             {
            //                 food_category: "Apple",
            //                 food_amount: "1",
            //                 food_calorie: "100"
            //             },
            //             {
            //                 food_category: "Apple",
            //                 food_amount: "1",
            //                 food_calorie: "100"
            //             },
            //             {
            //                 food_category: "Apple",
            //                 food_amount: "1",
            //                 food_calorie: "100"
            //             },
            //             {
            //                 food_category: "Apple",
            //                 food_amount: "1",
            //                 food_calorie: "100"
            //             },
            //             {
            //                 food_category: "Apple",
            //                 food_amount: "1",
            //                 food_calorie: "100"
            //             },
            //             {
            //                 food_category: "Apple",
            //                 food_amount: "1",
            //                 food_calorie: "100"
            //             }
            //         ],
            //         exerciseList: [{
            //                 exercise_category: "Run",
            //                 exercise_time: "30",
            //                 exercise_calorie: "300"
            //             },
            //             {
            //                 exercise_category: "Run",
            //                 exercise_time: "30",
            //                 exercise_calorie: "300"
            //             }
            //         ]
            //     },
            //     {
            //         date: new Date("2017-11-05"),
            //         foodList: [{
            //                 food_category: "Apple",
            //                 food_amount: "1",
            //                 food_calorie: "100"
            //             },
            //             {
            //                 food_category: "Apple",
            //                 food_amount: "1",
            //                 food_calorie: "100"
            //             }
            //         ],
            //         exerciseList: [{
            //                 exercise_category: "Run",
            //                 exercise_time: "30",
            //                 exercise_calorie: "300"
            //             },
            //             {
            //                 exercise_category: "Run",
            //                 exercise_time: "30",
            //                 exercise_calorie: "300"
            //             }
            //         ]
            //     },
            //     {
            //         date: new Date("2017-11-06"),
            //         foodList: [{
            //                 food_category: "Apple",
            //                 food_amount: "1",
            //                 food_calorie: "100"
            //             },
            //             {
            //                 food_category: "Apple",
            //                 food_amount: "1",
            //                 food_calorie: "100"
            //             }
            //         ],
            //         exerciseList: [{
            //                 exercise_category: "Run",
            //                 exercise_time: "30",
            //                 exercise_calorie: "300"
            //             },
            //             {
            //                 exercise_category: "Run",
            //                 exercise_time: "30",
            //                 exercise_calorie: "300"
            //             }
            //         ]
            //     }
            //
            //
            // ]
            console.log("rootScope.recordList:")
            console.log($rootScope.recordList);
        })();

        function loadUserRecord() {
            UserService.LoadUserRecord(function(result) {
                console.log("user record from server:");
                console.log(result);
                if (result.resultMessage.resultCode == 1) {
                    $rootScope.recordList = parseRecordData(result);
                }
            });
        };

        $scope.editRecord = function(record) {
            $scope.changeSelection("record");
            $rootScope.recordToEdit = record;
        };

        $scope.deleteRecord = function(date) {
            console.log("delete record date: " + formatDate(date));
            // $rootScope.recordList = $rootScope.recordList.filter(function(ele) {
            //     return ele.date !== date;
            // });
            UserService.DeleteRecord(formatDate(date), function(result) {

                console.log(result);
                if (result.resultMessage.resultCode == 1) {
                    $rootScope.showalert("Your record is deleted successfully!", "success");
                    $rootScope.recordList = $rootScope.recordList.filter(function(ele) {
                        return ele.date !== date;
                    });
                }
            });
        };

    }

})();
