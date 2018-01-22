var coffeeIn = angular.module('coffeeIn', ['ngRoute', 'ngResource', 'LocalStorageModule', 'ngMap', 'ngFileUpload']);

//ROUTES
coffeeIn.config(function ($routeProvider, $locationProvider) {
    
    $routeProvider
    
    .when('/', {
    		templateUrl: '../pages/homeView.html',
    		controller: 'HomeController',
    		controllerAs: 'vm'
    })
    
    .when('/cafe/add', {
    		templateUrl: '../pages/cafeAddView.html',
        controller: 'CafeAddController',
        authenticated: true
    })
    
    .when('/cafes', {
        templateUrl: '../pages/cafesShowView.html',
        controller: 'CafesShowController'
    })
    
    .when('/whatsnew', {
        controller: 'WhatsNewController',
        templateUrl: '../pages/whatsnewView.html',
        controllerAs: 'vm'
     })
     
	.when('/about', {
        controller: 'AboutController',
        templateUrl: '../pages/aboutView.html',
        controllerAs: 'vm'
     })
     
     .when('/uploadpictures', {
        controller: 'UploadPicturesController',
        templateUrl: '../pages/uploadPicturesView.html',
        controllerAs: 'vm',
        authenticated: true
     })
     
     .when('/cafe/edit', {
        controller: 'EditCafeController',
        templateUrl: '../pages/editCafeView.html',
        controllerAs: 'vm',
        authenticated: true
     })
     
     .when('/cafe/:cafeId', {
        controller: 'SingleCafeController',
        templateUrl: '../pages/singleCafeView.html',
        controllerAs: 'vm'
     })
     
	.when('/test', {
        controller: 'TestController',
        templateUrl: '../pages/testView.html',
        controllerAs: 'vm'
    })
    
    .when('/login', {
        controller: 'LoginController',
        templateUrl: '../pages/loginView.html',
        controllerAs: 'vm'
    })
    
    .when('/contact', {
        controller: 'ContactController',
        templateUrl: '../pages/contactView.html',
        controllerAs: 'vm'
    })
            
    .when('/register', {
        controller: 'RegisterController',
        templateUrl: '../pages/registerView.html',
        controllerAs: 'vm'
    })
    
    .otherwise({ redirectTo: '/' });
    
//    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');
});

coffeeIn.run(["$rootScope", "$location", "authFact", function($rootScope, $location, authFact) {
	$rootScope.$on('$routeChangeStart', function(event, next, current) {
		
		if (next.$$route.authenticated) {
			var userAuth = authFact.getAccessToken();

			if (!userAuth) {
				alert("You need to login to access this page!");
				$location.path('/login');
			}
		}
	});
}]);

window.fbAsyncInit = function() {
	FB.init({
		appId            : '248776235654763', //test
//		appId            : '1559117644175190', //production
		autoLogAppEvents : true,
		xfbml            : true,
		version          : 'v2.10'
	});
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "https://connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk')
);