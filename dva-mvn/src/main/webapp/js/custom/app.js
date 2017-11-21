(function() {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: '/dva-mvn/html/views/home.html',
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: '/dva-mvn/html/views/login.html',
            })

            .when('/signup', {
                controller: 'SignupController',
                templateUrl: '/dva-mvn/html/views/signup.html',
            })

            .otherwise({
                redirectTo: '/login'
            });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore'];

    function run($rootScope, $location, $cookieStore) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};

        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/signup']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();
