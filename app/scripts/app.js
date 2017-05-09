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
  .module('odcw2App', ['ngAnimate', 'ngAria', 'ngRoute'])
	//'ngAnimate', 'ngAria', 'uiGmapgoogle-maps', 'ngRoute', 'ui.router'
  .config(function ($locationProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false}).hashPrefix('');
  })

.config(function ($urlRouterProvider) {
	$urlRouterProvider.when('/', '/');
	$urlRouterProvider.otherwise('/');
});
