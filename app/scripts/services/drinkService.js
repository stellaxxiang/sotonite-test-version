'use strict';

angular.module('odcw2App')
    .service('drinkService', ['$http', function($http) {

    var urlBase = 'https://odi-cw2-api.herokuapp.com/api/v1/drinks'; //the backend url

		this.getDrinks = function() {
			return $http.get(urlBase).then(function(response){
				console.log(response.data);
				return response.data;
			});
		};
		
}]);
