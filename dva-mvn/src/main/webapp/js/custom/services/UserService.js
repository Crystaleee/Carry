(function() {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];

    function UserService($http) {
        var service = {};

        service.Login = Login;
        service.CheckUsername = CheckUsername;
        service.CheckEmail = CheckEmail;
        service.Signup = Signup;
        service.UpdateProfile = UpdateProfile;
        service.LoadUserProfile = LoadUserProfile;
        service.LoadUserRecord = LoadUserRecord;

        return service;

        function Login(userId, password, rememberme, kaptcha, callback) {
            $.ajax({
                type: "post",
                url: "/dva-mvn/user/login.do",
                dataType: "text",
                async: false,
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

        function CheckUsername(userId, callback) {
            $.ajax({
                type: "post",
                url: "/dva-mvn/signUp/userNameValidate.do",
                dataType: "text",
                async: false,
                data: {
                    userId: userId,
                },
                success: function(data) {
                    callback(data);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    handleError(XMLHttpRequest, textStatus, errorThrown);
                }
            });
        }

        function CheckEmail(email, callback) {
            $.ajax({
                type: "post",
                url: "/dva-mvn/signUp/emailValidate.do",
                dataType: "text",
                async: false,
                data: {
                    email: email,
                },
                success: function(data) {
                    callback(data);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    handleError(XMLHttpRequest, textStatus, errorThrown);
                }
            });
        }



        function Signup(form, callback) {
            console.log(objectifyForm(form.serializeArray()));
            $.ajax({
                url: '/dva-mvn/signUp/signUp.do',
                type: 'post',
                dataType: 'text',
                async: false,
                data: objectifyForm(form.serializeArray()),
                success: function(data) {
                    callback(data);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    handleError(XMLHttpRequest, textStatus, errorThrown);
                }
            });
        }

        function UpdateProfile(form, callback) {
            console.log(objectifyForm(form.serializeArray()));
            $.ajax({
                type: "post",
                url: "/dva-mvn/user/updateProfile.do",
                dataType: "text",
                async: false,
                data: objectifyForm(form.serializeArray()),
                success: function(data) {
                    callback(data);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    handleError(XMLHttpRequest, textStatus, errorThrown);
                }

            });
        }

        function LoadUserProfile(callback) {
            $.ajax({
                type: "GET",
                url: "/dva-mvn/user/loadUserProfile.do",
                async: false,
                success: function(data) {
                    callback(data);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    handleError(XMLHttpRequest, textStatus, errorThrown);
                }

            });
        }

        function LoadUserRecord(callback) {
            $.ajax({
                type: "GET",
                url: "/dva-mvn/user/loadUserRecord.do",
                async: false,
                success: function(data) {
                    callback(data);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    handleError(XMLHttpRequest, textStatus, errorThrown);
                }

            });
        }

        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        // $http({
        //     method: "POST",
        //     url: '/dva-mvn/signUp/signUp.do',
        //     data: form
        //
        // }).then(function mySuccess(response) {
        //     console.log(response);
        //     callback(response);
        // }, function myError(response) {
        //
        // });

        function handleError(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.readyState +
                XMLHttpRequest.status +
                XMLHttpRequest.responseText);
            console.log("error");
            console.log(textStatus);
        }
    }

})();
