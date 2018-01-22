(function () {
    'use strict';
 
    angular
        .module('coffeeIn', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);
 
    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })
 
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })
 
            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })
 
            .otherwise({ redirectTo: '/login' });
    }
 
    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }
 
})();



//$routeProvider
//            .when('/cafes/add', {
//				templateUrl: 'pages/cafeAdd.html',
//				controller: 'addCafeController',
//				controllerAs: 'vm'
//            })
// 			.when('/cafes', {
//				templateUrl: 'pages/showCafes.html',
//				controller: 'showCafeController',
//				controllerAs: 'vm'
//			})
//			.when('/cafesInMap', {
//				templateUrl: 'pages/cafeMap.html',
//				controller: 'showCafeMapController',
//				controllerAs: 'vm'
//			})
//			.when('/loginRegister', {
//				templateUrl: 'pages/loginRegister.html',
//				controller: 'loginRegisterController',
//				controllerAs: 'vm'
//			})