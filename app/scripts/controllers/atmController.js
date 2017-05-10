'use strict';

/**
 * @ngdoc function
 * @name odcw2App.controller:atmController
 * @description
 * # atmController
 * Controller of the odcw2App
 */
angular.module('odcw2App')
  .controller('atmController', ['$scope', 'atmData', 'NgMap',
	function ($scope, atmData, NgMap) {
		// $scope variables
		$scope.atms=[];
		$scope.markers=[];
		$scope.visibleMarkers=[];
		$scope.atms = atmData; // atmData is resolved in ui-router
		$scope.ATMdetail = {};
		$scope.atmsListShow = true;
		$scope.atmsDetailShow = false;
		$scope.map = {latitude: 50.936, longitude: -1.395, zoom: 12};
		
		// Init the view with google map
		$scope.init = function(){
			console.log('View initialized');
			NgMap.getMap().then(function(maps) {
				console.log('Map initialized.');
				$scope.map = maps;
				$scope.ATMIconBlue = {
					url: '../../images/ATMIconBlue.svg',
					scaledSize: [45, 45],
					anchor: [25, 25]
				};
				$scope.ATMIconRed = {
					url: '../../images/ATMIconRed.svg',
					scaledSize: [45, 45],
					anchor: [25, 25]
				};
			});
		};
		
		$scope.callbackFunc = function() {
			console.log('You are at' + $scope.map.getCenter());
		};
		
		// Add event for whole map
//		$scope.mapEvent = {
//			idle: function() { // Do changes when map is zoomed in/out or dragged
//				$scope.visibleMarkers.length = 0; // clean array
//				//uiGmapIsReady.promise().then(function(map_instances) {});
//				$scope.GMap = $scope.map.control.getGMap();
//				for (var i=0; i<$scope.markers.length; i++){
//					var temporaryPosition = new google.maps.LatLng($scope.markers[i].latitude, $scope.markers[i].longitude);
//					if( $scope.GMap.getBounds().contains(temporaryPosition) ){
//						$scope.visibleMarkers.push($scope.markers[i]);
//					}
//				}				
//			}
//		};
		
		// Put retrieved data in markers array
		for (var i=0; i<$scope.atms.length;i++) {
			$scope.markers.push({
				id: i,
				latitude: $scope.atms[i].coordinates.latitude,
				longitude: $scope.atms[i].coordinates.longitude,
				title: $scope.atms[i].name,
				label: $scope.atms[i].label,
				draggable: false,
				animation: ""
			});
		}
		
		// Add event for all markers
		$scope.markersEvent = {
			click: function(event, marker) {
				$scope.atm = marker;
				$scope.showDetail(marker);
				$scope.$apply();
				console.log('clicked');
			}
		};
		
		// Click and back to ATMs list
		$scope.backToList = function() {
			$scope.atmsListShow = true;
			$scope.atmsDetailShow = false;
		};
		
		// change the content of details div
		$scope.showDetail = function(marker) {
			$scope.ATMdetail = $scope.atms[marker.id];
			marker.animation = "DROP";
			$scope.map.latitude = $scope.ATMdetail.coordinates.latitude;
			$scope.map.longitude = $scope.ATMdetail.coordinates.longitude;
			$scope.map.zoom = 16;
			$scope.atmsListShow = false;
			$scope.atmsDetailShow = true;
		};
	}]);
