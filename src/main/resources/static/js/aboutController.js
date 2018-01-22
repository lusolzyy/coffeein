coffeeIn.controller('AboutController', ['$scope', 'AllCafes', function($scope, AllCafes) {
	$scope.allCafes = AllCafes.query();
	$(document).ready(function() {
		  //Set the carousel options
		  $('#quote-carousel').carousel({
		    pause: true,
		    interval: 10000,
		  });
		});
}]);