coffeeIn.controller('RegisterController', ['$scope', '$http', '$location', function($scope, $http, $location) {
	
	$scope.user = {
			username: "",
			email: "",
			password: "",
			firstName: "",
			lastName: "",
			favoriteFlavor: [],
			isOwner: "0",
			ownerApproved: "0",
			cafeId: "",
			cafeName: ""
	};
	
	$scope.plainPassword = "";
	
	$scope.register = function () {
		//hash the password
		$scope.user.password = sha256($scope.plainPassword);
		$http.post('/users/add', $scope.user)
	    .then(function (response) {
	    		$scope.PostDataResponse = response.data;
	    		alert("Register new user successfully!!!");
	    		$location.path('/');
	    });
	};
}]);