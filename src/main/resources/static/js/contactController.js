coffeeIn.controller('ContactController', ['$scope', '$http', '$location', function($scope, $http, $location) {
	
	$scope.contact = {
			name: "",
			email: "",
			message: ""
	};
	
	$scope.sendmessage = function () {
		$http.post('/sendmessage', $scope.contact)
	    .then(function (response) {
	    		$scope.PostDataResponse = response.data;
	    		alert("Thank you for your contribution!");
	    		$location.path('/');
	    });
	};
}]);