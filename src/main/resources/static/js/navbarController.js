coffeeIn.controller('NavbarController', ['$scope', 'authFact', function($scope, authFact) {
	if (authFact.getAccessToken() == null) {
		$scope.loginOrLogout = "Login";
	} else {
		$scope.loginOrLogout = "Logout";
	}
}]);