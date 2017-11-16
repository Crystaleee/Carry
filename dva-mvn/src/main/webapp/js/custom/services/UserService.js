(function() {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];

    function UserService($http) {
        var service = {};

        service.CheckUsername = CheckUsername;
        service.CheckEmail = CheckEmail;
        service.Signup = Signup;
        service.UpdateProfile = UpdateProfile;
        service.LoadCurrentUser = LoadCurrentUser;

        return service;

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
            console.log(form.serializeArray());
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
            console.log(form.serializeArray());
            $.ajax({
                type: "post",
                url: "/dva-mvn/UserInformation/updateProfile.do",
                dataType: "text",
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

        function LoadCurrentUser(callback) {
            $.ajax({
                type: "GET",
                url: "/dva-mvn/UserInformation/loadUser.do",
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

        function Create(user) {
            return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
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
