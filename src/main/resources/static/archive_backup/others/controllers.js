//CONTROLLERS
coffeeIn.controller('addCafeController', ['$scope', '$http', function($scope, $http) {
    
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
			cafeSocialContacts: {
				phoneNumber: "",
				facebook: "",
				twitter: "",
				instagram: "",
				website: ""
			},
			cafeRoasters: []
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
	    		
	    		$http.post('/cafes/add', $scope.cafe)
	    	    .then(function (response) {

	    	    		$scope.PostDataResponse = response.data;

	    	    });
	    });
		
	};
}]);

coffeeIn.controller('showCafeController', ['$scope', 'AllCafes', function($scope, AllCafes) {
    
    $scope.allCafes = AllCafes.query();
    
}]);

coffeeIn.controller('showCafeMapController', function($scope, AllCafes, NgMap) {
    
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
});

coffeeIn.controller('loginRegisterController', function($scope, $http, $location) {
	$(function() {

	    $('#login-form-link').click(function(e) {
			$("#login-form").delay(100).fadeIn(100);
	 		$("#register-form").fadeOut(100);
			$('#register-form-link').removeClass('active');
			$(this).addClass('active');
			e.preventDefault();
		});
		$('#register-form-link').click(function(e) {
			$("#register-form").delay(100).fadeIn(100);
	 		$("#login-form").fadeOut(100);
			$('#login-form-link').removeClass('active');
			$(this).addClass('active');
			e.preventDefault();
		});

	});
	
	//login
	$scope.inputLogin = "";
	$scope.loginPassword = "";
	
	$scope.login = function () {
		
		var shaObj = new jsSHA("SHA-256", "TEXT");
		var text = $scope.loginPassword;
		shaObj.update(text);
		$scope.passwordHash = shaObj.getHash("HEX");
		
		var url = "/login/" + $scope.inputLogin + "/password/" + $scope.passwordHash;
		
		$http.get(url)
		.then(function (response) {
			alert(response.data.returnMessage);
		});
		
	};
	
	//register
	$scope.plainPassword = "";
	
	$scope.user = {
			userName: "",
			email: "",
			passwordHash: "",
			firstName: "",
			lastName: "",
			favoriteFlavor: [],
			isOwner: "0",
			ownerApproved: "0",
			cafeId: "",
			cafeName: ""
	};
	
	$scope.addUser = function () {
		
		var shaObj = new jsSHA("SHA-256", "TEXT");
		var text = $scope.plainPassword;
		shaObj.update(text);
		$scope.user.passwordHash = shaObj.getHash("HEX");
		
		$http.post('/users/add', $scope.user)
	    .then(function (response) {
	    		$scope.PostDataResponse = response.data;
	    		alert("Registration is successful!!!");
	    		//redirect to home page view
	    		$location.path("/");
	    });
	};
	
	$scope.passwordVisible = false;
	$scope.inputType = "password";
	
	$scope.$watch("passwordVisible", function(newValue, oldValue) {
		if (newValue == true) {
			$scope.inputType = "text";
		} else {
			$scope.inputType = "password";
		}
	});
	

});