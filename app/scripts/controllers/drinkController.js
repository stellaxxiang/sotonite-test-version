'use strict';

/**
 * @ngdoc function
 * @name odcw2App.controller:drinkController
 * @description
 * # drinkController
 * Controller of the odcw2App
 */
angular.module('odcw2App')
  .controller('drinkController', ['$scope', 'drinkData', 'NgMap',
	function ($scope, drinkData, NgMap) {
		// $scope variables
		$scope.drinks=[];
		$scope.markers=[];
		$scope.visibleMarkers=[];
		$scope.drinks = drinkData; // drinkData is resolved in ui-router
		$scope.drinkDetail = {};
		$scope.drinksListShow = true;
		$scope.drinksDetailShow = false;
		$scope.map = {latitude: 50.936, longitude: -1.395, zoom: 12};
		
		// Init the view with google map
		$scope.init = function(){
			console.log('View initialized');
			NgMap.getMap().then(function(maps) {
				console.log('Map initialized.');
				$scope.map = maps;
				$scope.drinkIconBlue = {
					url: '../../images/DrinkIconBlue.svg',
					scaledSize: [45, 45],
					anchor: [25, 25]
				};
				$scope.drinkIconRed = {
					url: '../../images/DrinkIconRed.svg',
					scaledSize: [45, 45],
					anchor: [25, 25]
				};
			});
		};
		
		$scope.callbackFunc = function() {
			console.log('You are at' + $scope.map.getCenter());
		};
		
		// Put retrieved data in markers array
		for (var i=0; i<$scope.drinks.length;i++) {
			$scope.markers.push({
				id: i,
				latitude: $scope.drinks[i].coordinates.latitude,
				longitude: $scope.drinks[i].coordinates.longitude,
				title: $scope.drinks[i].name,
				label: $scope.drinks[i].label,
				draggable: false,
				animation: ""
			});
		}
		
		// Add event for all markers
		$scope.markersEvent = {
			click: function(event, marker) {
				$scope.drink = marker;
				$scope.showDetail(marker);
				$scope.$apply();
				console.log('clicked');
			}
		};
		
		// Click and back to drinks list
		$scope.backToList = function() {
			$scope.drinksListShow = true;
			$scope.drinksDetailShow = false;
		};
		
		// change the content of details div
		$scope.showDetail = function(marker) {
			$scope.drinkDetail = $scope.drinks[marker.id];
			marker.animation = "DROP";
			$scope.map.latitude = $scope.drinkDetail.coordinates.latitude;
			$scope.map.longitude = $scope.drinkDetail.coordinates.longitude;
			$scope.map.zoom = 16;
			$scope.drinksListShow = false;
			$scope.drinksDetailShow = true;
		};
	}]);
