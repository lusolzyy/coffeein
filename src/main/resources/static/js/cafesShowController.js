coffeeIn.controller('CafesShowController', ['$scope', 'AllCafes', 'NgMap', function($scope, AllCafes, NgMap) {
	
	$scope.allCafes = AllCafes.query();
	$scope.allCafesSortedByDistance = [];
	$scope.allCafesShowResult = [];
	$scope.searchMode = "Search By";
	$scope.keyWord;
	$scope.map;
	$scope.mapCafes = [];
	$scope.mapCafe;
	$scope.pictureCafe;
	$scope.position;
	$scope.filePrefix = "files/";
	var milesConvertion = 0.000621371;
	var options = {
			enableHighAccuracy: true
	};
	
	NgMap.getMap().then(function(map) {
		$scope.map = map;
	});
	
	navigator.geolocation.getCurrentPosition(function(pos) {
		$scope.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
		$scope.lat = $scope.position.lat();
		$scope.lng = $scope.position.lng();
		
		sortByDistance();
		setMarkers($scope.map);
		}, 
        function(error) {                    
            alert('Unable to get location: ' + error.message);
        }, options
	);
	
	$scope.showDetail = function(cafe) {
		$scope.mapCafe = cafe;
		$scope.map.hideInfoWindow('info');
		$scope.map.hideInfoWindow('info-picture');
		$scope.map.showInfoWindow('info', $scope.mapCafe.id);
	};
	
	$scope.showDetailPictureClick = function(cafe) {
		$scope.pictureCafe = cafe;
		$scope.map.hideInfoWindow('info');
		$scope.map.hideInfoWindow('info-picture');
		$scope.map.showInfoWindow('info-picture', $scope.pictureCafe.cafeId);
	};
	
	$scope.markerClick = function(e, cafe) {
		$scope.showDetail(cafe);
		$scope.centerMap(cafe);
	};
	
	$scope.pictureClick = function(cafe) {
		$scope.centerMap(cafe);
		$scope.showDetailPictureClick(cafe);
	};
	
	$scope.centerMap = function (cafe) {
		var center = new google.maps.LatLng(cafe.coordinate[0], cafe.coordinate[1]);
		$scope.map.setCenter(center);
	};
	
	function setMarkers(map) {
		$scope.allCafes.$promise.then(function(cafes) {
			for (i = 0; i < cafes.length; i++) {
				var mapCafe = {
						id: cafes[i].cafeId,
						name: cafes[i].cafeName,
						coordinate: cafes[i].coordinate,
						address: cafes[i].cafeAddress
				}
				$scope.mapCafes.push(mapCafe);
			}
		});
	};
	
	$scope.searchModeClick = function (mode) {
		$scope.searchMode = mode;
	};
	
	$scope.search = function () {
		//filter by cafe name and address
		//the program will not return a single cafe which matches the search key words
		//but it will return all cafes except that the cafes which match the key words will display on the top
		//which means those cafes will be moved to the front of the list
		//the array will copy from the original array to maintain the distance order in case there are several different search
		//we must make sure the new result of the new search will maintain the original order
		//except the matching elements
		
		var count = 0;
		
		if ($scope.searchMode == "Search By") {
			alert("Please choose a search mode!");
		} else if ($scope.searchMode == "Cafe Name") {
			//first sort the cafes by distance which will render a default order list
			//then we could modify the order based on the search key word
			//and let the list to display the correct order

			$scope.allCafesShowResult = $scope.allCafesSortedByDistance.slice();
			
			for (i = 0; i < $scope.allCafesShowResult.length; i++) {
				if ($scope.allCafesShowResult[i].cafeName.toLowerCase().includes($scope.keyWord.toLowerCase())) {
					var tempCafe = $scope.allCafesShowResult[i];
					$scope.allCafesShowResult.splice(i, 1);
					$scope.allCafesShowResult.splice(count, 0, tempCafe);
					count++;
				}
			}
			
		} else if ($scope.searchMode == "Cafe Address") {
			$scope.allCafesShowResult = $scope.allCafesSortedByDistance.slice();
			
			for (i = 0; i < $scope.allCafesShowResult.length; i++) {
				if ($scope.allCafesShowResult[i].cafeAddress.toLowerCase().includes($scope.keyWord.toLowerCase())) {
					var tempCafe = $scope.allCafesShowResult[i];
					$scope.allCafesShowResult.splice(i, 1);
					$scope.allCafesShowResult.splice(count, 0, tempCafe);
					count++;
				}
			}
			
		} else {
			alert("Wrong Argument!");
		}
	};
	
	function calculateDistance (cordCurrent, cordCafe) {
	    return google.maps.geometry.spherical.computeDistanceBetween(cordCurrent, cordCafe);
	};
	
	function sortByDistance () {
		$scope.allCafes.$promise.then(function(cafes) {
			for (i = 0; i < cafes.length; i++) {
				var cafePosition = new google.maps.LatLng(cafes[i].coordinate[0], cafes[i].coordinate[1]);
				cafes[i].distanceToCurrentPosition = Math.round(calculateDistance($scope.position, cafePosition) * milesConvertion * 100) / 100;
				$scope.allCafesSortedByDistance.push(cafes[i]);
			}
			$scope.allCafesSortedByDistance.sort((o1, o2) => o1.distanceToCurrentPosition - o2.distanceToCurrentPosition);
			//copy the array value to a new array which will display the result by search key
			$scope.allCafesShowResult = $scope.allCafesSortedByDistance.slice();
		});
	};

}]);