coffeeIn.controller('SingleCafeController', ['$scope', 'SingleCafe', '$routeParams', function($scope, SingleCafe, $routeParams) {
	
	$scope.filePrefix = "files/";
	$scope.singleCafe = SingleCafe.query({cafeId: $routeParams.cafeId});
	
}]);
