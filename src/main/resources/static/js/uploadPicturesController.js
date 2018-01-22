coffeeIn.controller('UploadPicturesController', ['$scope', 'AllCafes', 'Upload', '$timeout', function($scope, AllCafes, Upload, $timeout) {

	$scope.allCafes = AllCafes.query();
	$scope.cafeSelected = "Please choose a Cafe";
	$scope.cafeSelectedId;
	
	$scope.cafeChange = function (cafe) {
		$scope.cafeSelected = cafe.cafeName;
		$scope.cafeSelectedId = cafe.cafeId;
	}
	
	$scope.uploadFiles = function (files) {
		if ($scope.cafeSelected == "Please choose a Cafe") {
			alert("Please choose a Cafe first!");
		} else {
			$scope.files = files;
	        if (files && files.length) {
	        		//check the file size limit
	        		var fileExceedSizeName = "The size of ";
	        		for (i = 0; i < files.length; i++) {
	        			if (files[i].size > 524288) {
	        				fileExceedSizeName = fileExceedSizeName + "[ " + files[i].name + " ]";
	        			}
	        		}
	        		//if all file sizes are under the limit, then proceed to upload; otherwise break out
	        		if (fileExceedSizeName != "The size of ") {
	        			fileExceedSizeName = fileExceedSizeName + " exceeds the limit!";
	        			alert(fileExceedSizeName);
	        		} else {
	        			for (i = 0; i < files.length; i++) {
			        		(function(i){
			        			setTimeout(function(){
			        				Upload.upload({
							            url: '/files/multiple',
							            fields: {'cafeId': $scope.cafeSelectedId}, // additional data to send
							            file: files[i]
							        }).then(function (response) {
						                $timeout(function () {
						                    $scope.result = response.data;
						                });
						            }, function (response) {
						                if (response.status > 0) {
						                    $scope.errorMsg = response.status + ': ' + response.data;
						                }
						            }, function (evt) {
						                $scope.progress = 
						                    Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
						            });
			        			}, 500 * i)
			        		})(i);
			        }
	        		}
	        }
		}
    };
}]);
