//FACTORY
coffeeIn.factory('AllCafes', function($resource) {
	  return $resource('/cafes', {
		    query: {
		        isArray: false,
		        method: 'GET'
		    }
	  });
});

coffeeIn.factory('SingleCafe', function($resource) {
	  return $resource('/cafe/:cafeId', {
		  cafeId: '@cafeId'
	  }, {
		    query: {
		        isArray: false,
		        method: 'GET'
		    }
	  });
});

coffeeIn.factory('SingleUser', function($resource) {
	  return $resource('/login/:login/password/:password', {
		  login: '@login',
		  password: '@password'
	  }, {
		    query: {
		        isArray: false,
		        method: 'GET'
		    }
	  });
});

coffeeIn.factory('authFact', ['localStorageService', function(localStorageService) {
	  var authFact = {};
	  
	  //store cookies
	  authFact.setAccessToken = function(accessToken) {
		  localStorageService.set('accessToken', accessToken);
	  }
	  
	  //read cookies
	  authFact.getAccessToken = function() {
		  authFact.authToken = localStorageService.get('accessToken');
		  return authFact.authToken;
	  }
	  
	  //delete cookies
	  authFact.removeAccessToken = function() {
		  localStorageService.remove('accessToken');
	  }
	  
	  return authFact;
}]);

coffeeIn.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });
    }
}]);