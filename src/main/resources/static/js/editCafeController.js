coffeeIn.controller('EditCafeController', ['$scope', 'AllCafes', 'SingleCafe', '$http', '$location', 'fileUpload', function($scope, AllCafes, SingleCafe, $http, $location, fileUpload) {

	$scope.allCafes = AllCafes.query();
	$scope.cafeSelected = "Please choose a Cafe";
	$scope.cafeSelectedId;
	$scope.cafe;
	$scope.editedCafe = {
			cafeName: "",
			cafeAddress: "",
			coordinate: [],
			cafeHours: {
				sunday: {
					isOpen: "1",
					openTime: "",
					closeTime: ""
				},
				monday: {
					isOpen: "1",
					openTime: "",
					closeTime: ""
				},
				tuesday: {
					isOpen: "1",
					openTime: "",
					closeTime: ""
				},
				wednesday: {
					isOpen: "1",
					openTime: "",
					closeTime: ""
				},
				thursday: {
					isOpen: "1",
					openTime: "",
					closeTime: ""
				},
				friday: {
					isOpen: "1",
					openTime: "",
					closeTime: ""
				},
				saturday: {
					isOpen: "1",
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
			distanceToCurrentPosition: 0,
			uploadPictures: []
	};
	
	$scope.openHours = [
	    {OpenHourID: 0, OpenHour: '00:00'},
	    {OpenHourID: 1, OpenHour: '01:00'},
	    {OpenHourID: 2, OpenHour: '02:00'},
	    {OpenHourID: 3, OpenHour: '03:00'},
	    {OpenHourID: 4, OpenHour: '04:00'},
	    {OpenHourID: 5, OpenHour: '05:00'},
	    {OpenHourID: 6, OpenHour: '06:00'},
	    {OpenHourID: 7, OpenHour: '07:00'},
	    {OpenHourID: 8, OpenHour: '08:00'},
	    {OpenHourID: 9, OpenHour: '09:00'},
	    {OpenHourID: 10, OpenHour: '10:00'},
	    {OpenHourID: 11, OpenHour: '11:00'},
	    {OpenHourID: 12, OpenHour: '12:00'},
	    {OpenHourID: 13, OpenHour: '13:00'},
	    {OpenHourID: 14, OpenHour: '14:00'},
	    {OpenHourID: 15, OpenHour: '15:00'},
	    {OpenHourID: 16, OpenHour: '16:00'},
	    {OpenHourID: 17, OpenHour: '17:00'},
	    {OpenHourID: 18, OpenHour: '18:00'},
	    {OpenHourID: 19, OpenHour: '19:00'},
	    {OpenHourID: 20, OpenHour: '20:00'},
	    {OpenHourID: 21, OpenHour: '21:00'},
	    {OpenHourID: 22, OpenHour: '22:00'},
	    {OpenHourID: 23, OpenHour: '23:00'},
	    {OpenHourID: 24, OpenHour: '24:00'}
	];
	
	$scope.closeHours = [
	    {CloseHourID: 0, CloseHour: '00:00'},
	    {CloseHourID: 1, CloseHour: '01:00'},
	    {CloseHourID: 2, CloseHour: '02:00'},
	    {CloseHourID: 3, CloseHour: '03:00'},
	    {CloseHourID: 4, CloseHour: '04:00'},
	    {CloseHourID: 5, CloseHour: '05:00'},
	    {CloseHourID: 6, CloseHour: '06:00'},
	    {CloseHourID: 7, CloseHour: '07:00'},
	    {CloseHourID: 8, CloseHour: '08:00'},
	    {CloseHourID: 9, CloseHour: '09:00'},
	    {CloseHourID: 10, CloseHour: '10:00'},
	    {CloseHourID: 11, CloseHour: '11:00'},
	    {CloseHourID: 12, CloseHour: '12:00'},
	    {CloseHourID: 13, CloseHour: '13:00'},
	    {CloseHourID: 14, CloseHour: '14:00'},
	    {CloseHourID: 15, CloseHour: '15:00'},
	    {CloseHourID: 16, CloseHour: '16:00'},
	    {CloseHourID: 17, CloseHour: '17:00'},
	    {CloseHourID: 18, CloseHour: '18:00'},
	    {CloseHourID: 19, CloseHour: '19:00'},
	    {CloseHourID: 20, CloseHour: '20:00'},
	    {CloseHourID: 21, CloseHour: '21:00'},
	    {CloseHourID: 22, CloseHour: '22:00'},
	    {CloseHourID: 23, CloseHour: '23:00'},
	    {CloseHourID: 24, CloseHour: '24:00'}
	];
	
	$scope.openHour = {
			OpenHourID: 0,
			OpenHour: '00:00'
	};
	$scope.closeHour = {
			CloseHourID: 0,
			CloseHour: '00:00'
	};
	
	$scope.cafeChange = function (cafe) {
		$scope.cafeSelected = cafe.cafeName;
		$scope.cafeSelectedId = cafe.cafeId;
		$scope.cafe = SingleCafe.query({cafeId: $scope.cafeSelectedId});
		setHours();
	}
	
	function setHours() {
		$scope.cafe.$promise.then(function(cafe) {
			$scope.openHour.OpenHour = cafe.cafeHours.sunday.openTime;
			$scope.closeHour.CloseHour = cafe.cafeHours.sunday.closeTime;
		});
	};
	
	$scope.editCafe = function (editCafeForm) {
		
		var cafeHourError = false;
		//check the validation of the cafe hours
		if ($scope.openHour.OpenHour >= $scope.closeHour.CloseHour) {
			editCafeForm.$valid = false;
			cafeHourError = true;
			alert("Open time should be earlier than Close time!");
		}
		//check the validation of the form
		if (editCafeForm.$valid) {
			if (confirm("Please make sure the ADDRESS is CORRECT!\nIncorrect address still can be submitted, but it will affect the search result!")) {
				//Get the coordinates for the address
				var unformattedAddress = $scope.cafe.cafeAddress;
				var address = unformattedAddress.replace(" ", "+");
				var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyC-cTkBk0xfWRfoX60Ui0pIfD6XQtNEraU";
				
				$scope.editedCafe.cafeId = $scope.cafe.cafeId;
				$scope.editedCafe.cafeName = $scope.cafe.cafeName;
				$scope.editedCafe.cafeAddress = $scope.cafe.cafeAddress;
				$scope.editedCafe.cafePicture = $scope.cafe.cafePicture;
				$scope.editedCafe.cafeSocialContacts.phoneNumber = $scope.cafe.cafeSocialContacts.phoneNumber;
				$scope.editedCafe.cafeSocialContacts.facebook = $scope.cafe.cafeSocialContacts.facebook;
				$scope.editedCafe.cafeSocialContacts.twitter = $scope.cafe.cafeSocialContacts.twitter;
				$scope.editedCafe.cafeSocialContacts.instagram = $scope.cafe.cafeSocialContacts.instagram;
				$scope.editedCafe.cafeSocialContacts.website = $scope.cafe.cafeSocialContacts.website;
				$scope.editedCafe.cafeRoasters = $scope.cafe.cafeRoasters;
				$scope.editedCafe.distanceToCurrentPosition = $scope.cafe.distanceToCurrentPosition;
				$scope.editedCafe.uploadPictures = $scope.cafe.uploadPictures;
				
				if ($scope.editedCafe.cafeHours.sunday.isOpen == "1") {
					$scope.editedCafe.cafeHours.sunday.openTime = $scope.openHour.OpenHour;
					$scope.editedCafe.cafeHours.sunday.closeTime = $scope.closeHour.CloseHour;
				}
				if ($scope.editedCafe.cafeHours.monday.isOpen == "1") {
					$scope.editedCafe.cafeHours.monday.openTime = $scope.openHour.OpenHour;
					$scope.editedCafe.cafeHours.monday.closeTime = $scope.closeHour.CloseHour;
				}
				if ($scope.editedCafe.cafeHours.tuesday.isOpen == "1") {
					$scope.editedCafe.cafeHours.tuesday.openTime = $scope.openHour.OpenHour;
					$scope.editedCafe.cafeHours.tuesday.closeTime = $scope.closeHour.CloseHour;
				}
				if ($scope.editedCafe.cafeHours.wednesday.isOpen == "1") {
					$scope.editedCafe.cafeHours.wednesday.openTime = $scope.openHour.OpenHour;
					$scope.editedCafe.cafeHours.wednesday.closeTime = $scope.closeHour.CloseHour;
				}
				if ($scope.editedCafe.cafeHours.thursday.isOpen == "1") {
					$scope.editedCafe.cafeHours.thursday.openTime = $scope.openHour.OpenHour;
					$scope.editedCafe.cafeHours.thursday.closeTime = $scope.closeHour.CloseHour;
				}
				if ($scope.editedCafe.cafeHours.friday.isOpen == "1") {
					$scope.editedCafe.cafeHours.friday.openTime = $scope.openHour.OpenHour;
					$scope.editedCafe.cafeHours.friday.closeTime = $scope.closeHour.CloseHour;
				}
				if ($scope.editedCafe.cafeHours.saturday.isOpen == "1") {
					$scope.editedCafe.cafeHours.saturday.openTime = $scope.openHour.OpenHour;
					$scope.editedCafe.cafeHours.saturday.closeTime = $scope.closeHour.CloseHour;
				}
				
				$http.get(url)
			    .then(function (response) {
			    		
				    	//invalid address will return status "ZERO_RESULTS"
			    		if (response.data.status === "OK") {
			    			
				    		$scope.editedCafe.coordinate.push(response.data.results[0].geometry.location.lat);
				    		$scope.editedCafe.coordinate.push(response.data.results[0].geometry.location.lng);
				    		
				    		var file = $scope.myFile;
				    		if (typeof file !== "undefined") {
				    			if (file.size > 524288) {
					    			alert("The file size exceeds the limit!")
					    		} else {
					    			var uploadUrl = "/files";
						    		fileUpload.uploadFileToUrl(file, uploadUrl);
						    		//get the picture file name
						    		$scope.editedCafe.cafePicture = $scope.myFile.name;
						    		
						    		$http.put('/cafes/update', $scope.editedCafe)
						    	    .then(function (response) {
						    	    		$scope.PostDataResponse = response.data;
						    	    		$location.path('/');
						    	    });
					    		}
				    		} else {
					    		//set the picture file name
					    		$scope.editedCafe.cafePicture = $scope.cafe.cafePicture;
					    		
					    		$http.put('/cafes/update', $scope.editedCafe)
					    	    .then(function (response) {
					    	    		$scope.PostDataResponse = response.data;
					    	    		$location.path('/');
					    	    });
				    		}
				    		alert("Edit Cafe successfully!");
			    		} else {
			    			alert("Please check the address to make it valid!");
			    			//reset the cafe address
			    			$scope.cafe.cafeAddress = "";
			    		}
			    });
			}
		} else {
			if (!cafeHourError) {
				alert("Please correct the invalid field and then submit the form!");
			}
		}
	};
	
}]);
