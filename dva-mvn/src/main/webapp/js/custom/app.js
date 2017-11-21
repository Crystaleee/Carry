(function() {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies', 'ngAnimate'])
        .config(config)
        .run(run)
        .filter('randomize', function() {
            return function(input, scope) {
                if (input != null && input != undefined && input > 1) {
                    return Math.floor((Math.random() * input) + 1);
                }
            }
        });

    // route configuration
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

    //user restriction of accessing pages
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

            //redirect to home page if already logged in nd trying to access login/signup page
            if (!restrictedPage && loggedIn) {
                $location.path('/');
            }
        });
    }

})();
