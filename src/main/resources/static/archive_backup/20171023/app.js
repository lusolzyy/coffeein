var coffeeIn = angular.module('coffeeIn', ['ngRoute', 'ngResource', 'ngCookies', 'ngMap']);


//ROUTES
coffeeIn.config(function ($routeProvider, $locationProvider) {
    
    $routeProvider
    
//    .when('/', {
//        templateUrl: 'homeView.html',
//        controller: 'HomeController'
//    })
    .when('/', {
    		templateUrl: 'homeView.html',
    		controller: 'HomeController',
    		controllerAs: 'vm'
    })
    
    .when('/cafe/add', {
        templateUrl: 'cafeAddView.html',
        controller: 'CafeAddController'
    })
    
    .when('/cafes', {
        templateUrl: 'cafesShowView.html',
        controller: 'CafesShowController'
    })
    
//    .when('/cafes/map', {
//        templateUrl: 'cafesShowMapView.html',
//        controller: 'CafesShowMapController',
//        controllerAs: 'vm'
//    })

    .when('/whatsnew', {
        controller: 'WhatsNewController',
        templateUrl: 'whatsnewView.html',
        controllerAs: 'vm'
     })
     
	.when('/about', {
        controller: 'HomeController',
        templateUrl: 'aboutView.html',
        controllerAs: 'vm'
     })
            
    .when('/login', {
        controller: 'LoginController',
        templateUrl: 'login.view.html',
        controllerAs: 'vm'
    })
            
    .when('/register', {
        controller: 'RegisterController',
        templateUrl: 'register.view.html',
        controllerAs: 'vm'
    });
    
//    .otherwise({ redirectTo: '/' });
    
//    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');
    
});

coffeeIn.run(function ($rootScope, $location, $cookies, $http) {
	// keep user logged in after page refresh
//    $rootScope.globals = $cookies.getObject('globals') || {};
//    if ($rootScope.globals.currentUser) {
//        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
//    }
//
//    $rootScope.$on('$locationChangeStart', function (event, next, current) {
//        // redirect to login page if not logged in and trying to access a restricted page
//        var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
//        var loggedIn = $rootScope.globals.currentUser;
//        if (restrictedPage && !loggedIn) {
////            $location.path('/login');
//        	$location.path('/');
//        }
//    });
});
//
//    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
//    function run($rootScope, $location, $cookies, $http) {
//        // keep user logged in after page refresh
//        $rootScope.globals = $cookies.getObject('globals') || {};
//        if ($rootScope.globals.currentUser) {
//            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
//        }
//
//        $rootScope.$on('$locationChangeStart', function (event, next, current) {
//            // redirect to login page if not logged in and trying to access a restricted page
//            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
//            var loggedIn = $rootScope.globals.currentUser;
//            if (restrictedPage && !loggedIn) {
//                $location.path('/login');
//            }
//        });
//    }
