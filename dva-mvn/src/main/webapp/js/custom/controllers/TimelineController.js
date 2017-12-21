(function() {
    'use strict';

    angular
        .module('app')
        .controller('TimelineController', TimelineController);

    TimelineController.$inject = ['$location', '$scope', 'AuthenticationService', 'UserService', '$rootScope'];

    function TimelineController($location, $scope, AuthenticationService, UserService, $rootScope) {
        (function initController() {
            loadUserRecord();
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
                        return ele.date != date;
                    });
                    console.log("after filting:");
                    console.log($rootScope.recordList);
                }
            });
        };

    }

})();
