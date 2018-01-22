coffeeIn.controller('LoginController', ['$scope', 'authFact', '$location', 'localStorageService', '$window', 'SingleUser', function($scope, authFact, $location, localStorageService, $window, SingleUser) {
	$scope.loginInput;
	$scope.password;
	$scope.hashedPassword;
	
	var returnUsername;
	var returnPassword;
	
	$scope.login = function() {
		//hash the password and then check the validation
		$scope.hashedPassword = sha256($scope.password);
		var loginReturnData = SingleUser.query({login: $scope.loginInput, password: $scope.hashedPassword});
		
		loginReturnData.$promise.then(function(returnData) {
			returnUsername = returnData.returnUser.username;
			returnPassword = returnData.returnUser.password;
			if (returnData.returnCode ==  "200") {
				var text = returnUsername + returnPassword;
				var accessToken = sha256(text);
				
				authFact.setAccessToken(accessToken);
				alert("Login successfully!");
			       
				$location.path('/');
				//to refresh the login and logout button in the navbar
				$window.location.reload();
				
			} else {
				alert("Login fail, please check username or password!");
			}
		});
	};
	
	if (authFact.getAccessToken() == null) {
		$scope.isLoggedIn = false;
		$scope.logInHeader = "Log In";
	} else {
		$scope.isLoggedIn = true;
		$scope.logInHeader = "Log Out";
	}
	
	$scope.FBLogin = function() {
		FB.login(function(response) {
		    if (response.authResponse) {
		     console.log('Welcome!  Fetching your information.... ');
		     FB.api('/me', function(response) {
		       console.log('Good to see you, ' + response.name + '.');
		       
		       var accessToken = FB.getAuthResponse().accessToken;
		       authFact.setAccessToken(accessToken);
		       
		       //set the user is using facebook to login
		       localStorageService.set('fblogin', 1);
		       
		       alert("Login successfully!");
		       
		       $location.path('/');
		       $scope.$apply();
		       //to refresh the login and logout button in the navbar
		       $window.location.reload();
		     });
		    } else {
		     console.log('User cancelled login or did not fully authorize.');
		    }
		});
	};
	
	$scope.Logout = function() {
		if (authFact.getAccessToken() == null) {
			alert("Please login first!");
		} else {
			//check if the user user facebook to login
			if (localStorageService.get('fblogin')) {
				FB.logout(function(response) {
					  // user is now logged out
				});
				localStorageService.remove('fblogin');
			}
			
			//reset the accessToken
			authFact.removeAccessToken();
			alert("You have logged out!");
			$location.path('/');
			//to refresh the login and logout button in the navbar
			$window.location.reload();
		}
	};
}]);
