'use strict';

/**
 * @ngdoc overview
 * @name odcw2App
 * @description
 * # odcw2App
 *
 * Main module of the application.
 */
angular
  .module('odcw2App',
		  ['ngAnimate',
		   'ngAria',
		   'ui.router',
		   'ngMap'])
  .config(function ($locationProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false}).hashPrefix('');
  })
  .config(function ($stateProvider) {
	$stateProvider
	.state('home', {
		url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
	.state('atm', {
		url: '/atm',
        templateUrl: 'views/atmTemplate.html',
        controller: 'atmController',
		resolve: {
			atmData: function(atmService) {
				return atmService.getAtms().then(function(response){
					return response;
				});
			}
		}
      })
	.state('food', {
		url: '/food',
        templateUrl: 'views/foodTemplate.html',
        controller: 'foodController',
		resolve: {
			foodData: function(foodService) {
				return foodService.getFoods().then(function(response){
					return response;
				});
			}
		}
      })
	.state('drink', {
		url: '/drink',
        templateUrl: 'views/drinkTemplate.html',
        controller: 'drinkController',
		resolve: {
			drinkData: function(drinkService) {
				return drinkService.getDrinks().then(function(response){
					return response;
				});
			}
		}
      });
})
.config(function ($urlRouterProvider) {
	$urlRouterProvider.when('/', '/');
	$urlRouterProvider.otherwise('/');
});
