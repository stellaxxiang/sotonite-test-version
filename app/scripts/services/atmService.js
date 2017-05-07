'use strict';

angular.module('odcw2App')
    .service('atmService', ['$http', function($http) {

    var urlBase = 'https://odi-cw2-api.herokuapp.com/api/v1/atms'; //the backend url

	// only need to GET atms information and display
	
//    this.getAtms = function () {
//		var d = $q.defer();
//        $http.get(urlBase).then(function(response){
//				$log.log("Successfully retrieved ATMs", response.data);
//				d.resolve(response);
//			}),
//			(function(error){
//				$log.error("Failed to retrieve ATMs");
//				d.reject(error);
//			});
//		return d.promise;
//    };
		this.getAtms = function() {
			return $http.get(urlBase).then(function(response){
				console.log(response.data);
				return response.data;
			});
		};
		
}]);
