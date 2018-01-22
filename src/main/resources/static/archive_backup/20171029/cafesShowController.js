//initMap function needs to be called async, or the function will be executed before the google maps api been loaded
function initialize() {
	var scope = angular.element(document.getElementById("map")).scope();
    scope.$apply(function () {
    		scope.initMap();
    });
}

coffeeIn.controller('CafesShowController', ['$scope', 'AllCafes', function($scope, AllCafes) {
	
	$scope.allCafes = AllCafes.query();
	
	$scope.allCafesSortedByDistance = [];
	
	$scope.allCafesShowResult = [];
	
	$scope.searchMode = "Search By";
	
	$scope.searchModeClick = function (mode) {
		$scope.searchMode = mode;
	};
	
	$scope.keyWord;
	
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
	
	var usermarker;
	var markers = [];
	var map;
	
	var currentPosition;
	var milesConvertion = 0.000621371;
	
	$scope.filePrefix = "files/";

    $scope.initMap = function() {
//	function initMap() {
    		map = new google.maps.Map(document.getElementById('map'), {
    			center: {lat: 37.3861, lng: 122.0839},
    			zoom: 15
    		});
    		
    		
//          infoWindow = new google.maps.InfoWindow;
          // Try HTML5 geolocation.
    		if (navigator.geolocation) {
    			navigator.geolocation.getCurrentPosition(function(position) {
    				var pos = {
    						lat: position.coords.latitude,
    						lng: position.coords.longitude
    				};
    				
    				currentPosition = new google.maps.LatLng(pos.lat, pos.lng);;
//              infoWindow.setPosition(pos);
//              infoWindow.setContent('Location found.');
//              infoWindow.open(map);
    				
    				sortByDistance();
    				map.setCenter(pos);
    				var littleman = 'http://maps.google.com/mapfiles/ms/micons/man.png';
              
    				usermarker = new google.maps.Marker({
    					map: map,
    					animation: google.maps.Animation.DROP,
    					position: pos,
    					icon: littleman
    				});
    				google.maps.event.addListener(usermarker,'click',function() {
    					map.setCenter(usermarker.getPosition());
    				});
    			}, function() {
    				handleLocationError(true, infoWindow, map.getCenter());
    			});
    		} else {
            // Browser doesn't support Geolocation
    			handleLocationError(false, infoWindow, map.getCenter());
    		}
    		
    		setMarkers(map);
    };

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    		infoWindow.setPosition(pos);
    		infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
	};

	function setMarkers(map) {
		var littlecoffee = 'http://maps.google.com/mapfiles/ms/micons/coffeehouse.png';
		$scope.allCafes.$promise.then(function(cafes) {
			for (i = 0; i < cafes.length; i++) {
				var location = cafes[i].coordinate;
				var contentString = '<div>' +
			    '<h1 style="text-align:center;">' +
		        cafes[i].cafeName +
		        '</h1>' +
				'<br>' +
				'<p style="text-align:center;">' +
		        cafes[i].cafeAddress +
		        '</p>' +
		        '<br>' +
		        '<h3 style="text-align:center;"><strong>' +
		        'OPEN NOW!' +
		        '</strong></h3>' +
		        '</div>';
				var locationInfowindow = new google.maps.InfoWindow({
					content: contentString
				});
				var pos = {
						lat: cafes[i].coordinate[0],
						lng: cafes[i].coordinate[1]
				};
				var marker = new google.maps.Marker({
					position: pos,
					map: map,
					animation: google.maps.Animation.DROP,
					icon: littlecoffee,
					infowindow: locationInfowindow
		    	    });
				google.maps.event.addListener(marker, 'click', function() {
					hideAllInfoWindows(map);
					this.infowindow.open(map, this);
				});
				markers.push(marker);
			}
		});
	};
	
	$scope.centerMap = function (cafe) {
		var pos = {
				lat: cafe.coordinate[0],
				lng: cafe.coordinate[1]
		};
		map.setCenter(pos);
		hideAllInfoWindows(map);
		
	};
    
	function hideAllInfoWindows(map) {
		markers.forEach(function(marker) {
			marker.infowindow.close(map, marker);
		}); 
	};

	function calculateDistance (cordCurrent, cordCafe) {
	    return google.maps.geometry.spherical.computeDistanceBetween(cordCurrent, cordCafe);
	};
	
	function sortByDistance () {
		$scope.allCafes.$promise.then(function(cafes) {
			for (i = 0; i < cafes.length; i++) {
				var cafePosition = new google.maps.LatLng(cafes[i].coordinate[0], cafes[i].coordinate[1]);
				cafes[i].distanceToCurrentPosition = Math.round(calculateDistance(currentPosition, cafePosition) * milesConvertion * 100) / 100;
				$scope.allCafesSortedByDistance.push(cafes[i]);
			}
			$scope.allCafesSortedByDistance.sort((o1, o2) => o1.distanceToCurrentPosition - o2.distanceToCurrentPosition);
			//copy the array value to a new array which will display the result by search key
			$scope.allCafesShowResult = $scope.allCafesSortedByDistance.slice();
		});
	};

}]);