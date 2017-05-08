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
  .module('odcw2App', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
	'uiGmapgoogle-maps',
	'ui.router',
	'ui.bootstrap'
  ])
  .config(function (uiGmapGoogleMapApiProvider, $urlRouterProvider, $stateProvider, $locationProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false}).hashPrefix('');
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
      });
	$urlRouterProvider.when('/', '/');
	$urlRouterProvider.otherwise('/');
	uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDyX25B6rkfX1gLfmnY5eiFHqBepw66TB8',
        v: '3.28',
        libraries: 'weather,geometry,visualization'
    });
  });
