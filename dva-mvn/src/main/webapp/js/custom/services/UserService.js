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
        service.UploadRecord = UploadRecord;
        service.UpdateRecord = UpdateRecord;
        service.TimeSlot = TimeSlot;

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
                    handleError(XMLHttpRequest, textStatus, errorThrown);
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
                data: form.serializeArray(),
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
                url: "/dva-mvn/UserInformation/loadUserRecord.do",
                async: false,
                success: function(data) {
                    callback(data);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    handleError(XMLHttpRequest, textStatus, errorThrown);
                }

            });
        }

        function UploadRecord(record, callback) {
            $.ajax({
                type: "POST",
                url: "/dva-mvn/UserInformation/uploadRecord.do",
                date: record,
                success: function(data) {
                    callback(data);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    handleError(XMLHttpRequest, textStatus, errorThrown);
                }

            });
        }

        function UpdateRecord(record, callback) {
            $.ajax({
                type: "POST",
                url: "/dva-mvn/UserInformation/updateRecord.do",
                date: record,
                success: function(data) {
                    callback(data);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    handleError(XMLHttpRequest, textStatus, errorThrown);
                }

            });
        }

        function TimeSlot(form, callback) {
            $.ajax({
                type: "POST",
                url: "/dva-mvn/UserInformation/timeslotRecord.do",
                async: false,
                success: function(data) {
                    callback(data);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    handleError(XMLHttpRequest, textStatus, errorThrown);
                }

            });
        }

        function handleError(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.readyState +
                XMLHttpRequest.status +
                XMLHttpRequest.responseText);
            console.log("error");
            console.log(textStatus);
        }
    }

})();
