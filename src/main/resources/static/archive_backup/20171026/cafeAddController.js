function getFileData(myFile) {
	var scope = angular.element(document.getElementById("form")).scope();
    scope.$apply(function () {
    		scope.getFileName(myFile);
    });
}

var fileName;

//CONTROLLERS
coffeeIn.controller('CafeAddController', ['$scope', '$http', function($scope, $http) {
	$scope.fileName;
	
	$scope.cafe = {
			cafeName: "",
			cafeAddress: "",
			coordinate: [],
			cafeHours: {
				sunday: {
					isOpen: "0",
					openTime: "",
					closeTime: ""
				},
				monday: {
					isOpen: "0",
					openTime: "",
					closeTime: ""
				},
				tuesday: {
					isOpen: "0",
					openTime: "",
					closeTime: ""
				},
				wednesday: {
					isOpen: "0",
					openTime: "",
					closeTime: ""
				},
				thursday: {
					isOpen: "0",
					openTime: "",
					closeTime: ""
				},
				friday: {
					isOpen: "0",
					openTime: "",
					closeTime: ""
				},
				saturday: {
					isOpen: "0",
					openTime: "",
					closeTime: ""
				}
			},
			cafePicture: "",
			cafeSocialContacts: {
				phoneNumber: "",
				facebook: "",
				twitter: "",
				instagram: "",
				website: ""
			},
			cafeRoasters: [],
			distanceToCurrentPosition: 0
	};
	
	$scope.openTime = "Please choose a time";
	$scope.closeTime = "Please choose a time";
	
	$scope.roasters = {
		roasterA: false,
		roasterB: false,
		roasterC: false
	};
	
	$scope.openTimeClick = function (time) {
		$scope.openTime = time;
	};
	
	$scope.closeTimeClick = function (time) {
		$scope.closeTime = time;
	};
	
	$scope.addCafe = function () {
		//Get the coordinates for the address
		var unformattedAddress = $scope.cafe.cafeAddress;
		var address = unformattedAddress.replace(" ", "+");
		var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyC-cTkBk0xfWRfoX60Ui0pIfD6XQtNEraU";
		
		if ($scope.roasters.roasterA) {
			$scope.cafe.cafeRoasters.push("roasterA");
		}
		if ($scope.roasters.roasterB) {
			$scope.cafe.cafeRoasters.push("roasterB");
		}
		if ($scope.roasters.roasterC) {
			$scope.cafe.cafeRoasters.push("roasterC");
		}
		
		if ($scope.cafe.cafeHours.sunday.isOpen == "1") {
			$scope.cafe.cafeHours.sunday.openTime = $scope.openTime;
			$scope.cafe.cafeHours.sunday.closeTime = $scope.closeTime;
		}
		if ($scope.cafe.cafeHours.monday.isOpen == "1") {
			$scope.cafe.cafeHours.monday.openTime = $scope.openTime;
			$scope.cafe.cafeHours.monday.closeTime = $scope.closeTime;
		}
		if ($scope.cafe.cafeHours.tuesday.isOpen == "1") {
			$scope.cafe.cafeHours.tuesday.openTime = $scope.openTime;
			$scope.cafe.cafeHours.tuesday.closeTime = $scope.closeTime;
		}
		if ($scope.cafe.cafeHours.wednesday.isOpen == "1") {
			$scope.cafe.cafeHours.wednesday.openTime = $scope.openTime;
			$scope.cafe.cafeHours.wednesday.closeTime = $scope.closeTime;
		}
		if ($scope.cafe.cafeHours.thursday.isOpen == "1") {
			$scope.cafe.cafeHours.thursday.openTime = $scope.openTime;
			$scope.cafe.cafeHours.thursday.closeTime = $scope.closeTime;
		}
		if ($scope.cafe.cafeHours.friday.isOpen == "1") {
			$scope.cafe.cafeHours.friday.openTime = $scope.openTime;
			$scope.cafe.cafeHours.friday.closeTime = $scope.closeTime;
		}
		if ($scope.cafe.cafeHours.saturday.isOpen == "1") {
			$scope.cafe.cafeHours.saturday.openTime = $scope.openTime;
			$scope.cafe.cafeHours.saturday.closeTime = $scope.closeTime;
		}
		
		$http.get(url)
	    .then(function (response) {
	    		$scope.cafe.coordinate.push(response.data.results[0].geometry.location.lat);
	    		$scope.cafe.coordinate.push(response.data.results[0].geometry.location.lng);
	    		
	    		$scope.cafe.cafePicture = fileName;
	    		
	    		
	    		$http.post('/cafes/add', $scope.cafe)
	    	    .then(function (response) {

	    	    		$scope.PostDataResponse = response.data;

	    	    });
	    });
	};
	
	var fileList = document.querySelector("#file-list");
    (function() {
        fetch("/files").then(function(response) {
            response.json().then(function(data) {
//                if (Array.isArray(data) && data.length) {
//                    for (var i=0;i<data.length;i++) {
//                        var li = document.createElement("li");
//                        var name = data[i];
//                        li.innerHTML = "<a href='/files/"+name+"'>"+name+"</a>";
//                        fileList.appendChild(li);
//                    }
//                }
            });
        })
    })();
    
    $scope.getFileName = function (myFile) {
    		var file = myFile.files[0];  
    		fileName = file.name;
    };
    
}]);