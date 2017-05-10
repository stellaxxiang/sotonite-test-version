'use strict';

/**
 * @ngdoc function
 * @name odcw2App.controller:foodController
 * @description
 * # foodController
 * Controller of the odcw2App
 */
angular.module('odcw2App')
  .controller('foodController', ['$scope', 'foodData', 'NgMap',
	function ($scope, foodData, NgMap) {
		// $scope variables
		$scope.foods=[];
		$scope.markers=[];
		$scope.visibleMarkers=[];
		$scope.foods = foodData; // foodData is resolved in ui-router
		$scope.foodDetail = {};
		$scope.foodsListShow = true;
		$scope.foodsDetailShow = false;
		$scope.map = {latitude: 50.936, longitude: -1.395, zoom: 12};
		
		// Init the view with google map
		$scope.init = function(){
			console.log('View initialized');
			NgMap.getMap().then(function(maps) {
				console.log('Map initialized.');
				$scope.map = maps;
				$scope.foodIconBlue = {
					url: '../../images/FoodIconBlue.svg',
					scaledSize: [45, 45],
					anchor: [25, 25]
				};
				$scope.foodIconRed = {
					url: '../../images/FoodIconRed.svg',
					scaledSize: [45, 45],
					anchor: [25, 25]
				};
			});
		};
		
		$scope.callbackFunc = function(param) {
			console.log('You are at' + $scope.map.getCenter());
		};
		
		// Put retrieved data in markers array
		for (var i=0; i<$scope.foods.length;i++) {
			$scope.markers.push({
				id: i,
				latitude: $scope.foods[i].coordinates.latitude,
				longitude: $scope.foods[i].coordinates.longitude,
				title: $scope.foods[i].name,
				label: $scope.foods[i].label,
				draggable: false,
				animation: ""
			});
		}
		
		// Add event for all markers
		$scope.markersEvent = {
			click: function(event, marker) {
				$scope.food = marker;
				$scope.showDetail(marker);
				$scope.$apply();
				console.log('clicked');
			}
		};
		
		// Click and back to foods list
		$scope.backToList = function() {
			$scope.foodsListShow = true;
			$scope.foodsDetailShow = false;
		};
		
		// change the content of details div
		$scope.showDetail = function(marker) {
			$scope.foodDetail = $scope.foods[marker.id];
			marker.animation = "DROP";
			$scope.map.latitude = $scope.foodDetail.coordinates.latitude;
			$scope.map.longitude = $scope.foodDetail.coordinates.longitude;
			$scope.map.zoom = 16;
			$scope.foodsListShow = false;
			$scope.foodsDetailShow = true;
		};
	}]);
