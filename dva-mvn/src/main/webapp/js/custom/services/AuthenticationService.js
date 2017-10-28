(function() {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope'];

    function AuthenticationService($http, $cookies, $rootScope) {
        var service = {};
        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(userId, password, rememberme, kaptcha, callback) {
            $.ajax({
                type: "post",
                url: "/dva-mvn/user/login.do",
                dataType: "text",
                data: {
                    userId: userId,
                    password: password,
                    rememberme: rememberme,
                    kaptcha: kaptcha
                },
                success: function(data) {
                    callback(data);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.readyState +
                        XMLHttpRequest.status +
                        XMLHttpRequest.responseText);
                    console.log("error");
                    console.log(textStatus);
                }
            });
        }

        //set cookie
        function SetCredentials(username) {

            $rootScope.globals = {
                currentUser: {
                    username: username,
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
