(function() {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope'];

    function AuthenticationService($http, $cookies, $rootScope) {
        var service = {};
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        //set cookie
        function SetCredentials(userID) {

            $rootScope.globals = {
                currentUser: {
                    userID: userID,
                }
            };

            // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 7);
            $cookies.putObject('globals', $rootScope.globals, {
                expires: cookieExp
            });
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookies.remove('globals');
        }

    }

})();
