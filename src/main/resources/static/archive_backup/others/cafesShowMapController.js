coffeeIn.controller('CafesShowMapController', ['$scope', 'AllCafes', 'NgMap', function($scope, AllCafes, NgMap) {
    
	var cafe;
	$scope.addresses = [];
	
	$scope.allCafes = AllCafes.query();
	
	NgMap.getMap("map").then(function(map) {
		$scope.map = map;
    });
	
	$scope.showInfoWindow = function (event, coordinate, name) {
		var infowindow = new google.maps.InfoWindow();
		var center = new google.maps.LatLng(coordinate[0],coordinate[1]);

        infowindow.setContent(
            '<h3>' + name + '</h3>');

        infowindow.setPosition(center);
        infowindow.open($scope.map);
     };
    
}]);
