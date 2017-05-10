'use strict';

angular.module('odcw2App')
    .service('foodService', ['$http', function($http) {

    var urlBase = 'https://odi-cw2-api.herokuapp.com/api/v1/foods'; //the backend url

		this.getFoods = function() {
			return $http.get(urlBase).then(function(response){
				console.log(response.data);
				return response.data;
			});
		};
		
}]);
