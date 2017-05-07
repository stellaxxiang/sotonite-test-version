'use strict';

/**
 * @ngdoc function
 * @name odcw2App.controller:atmController
 * @description
 * # atmController
 * Controller of the odcw2App
 */
angular.module('odcw2App')
  .controller('atmController', ['$scope', 'atmData', 'uiGmapGoogleMapApi', 'uiGmapIsReady',
	function ($scope, atmData, uiGmapGoogleMapApi, uiGmapIsReady) {
		// $scope variables
		$scope.atms=[];
		$scope.markers=[];
		$scope.visibleMarkers=[];
		$scope.map = {center: { latitude: 50.936, longitude: -1.395 },
					  zoom: 16,
					  control: {},
					  option: {styles: [{ featureType: "poi.business",stylers: [{ visibility: "off" }]}]}
					 };
		$scope.atms = atmData; // atmData is resolved in ui-router
		$scope.ATMdetail = {};
		$scope.atms_list_show = true;
		$scope.atms_detail_show = false;
		
		// Init the view with google map
		$scope.init = function(){
			console.log("View initialized");
			uiGmapGoogleMapApi.then(function(maps) {
				console.log('Google Maps API version: ' + maps.version);
				$scope.ATMIconBlue = {
					url: "../../images/ATMIconBlue.svg",
					scaledSize: new google.maps.Size(45, 45),
					anchor: new google.maps.Point(25, 25)
				};
				$scope.ATMIconRed = {
					url: "../../images/ATMIconRed.svg",
					scaledSize: new google.maps.Size(45, 45),
					anchor: new google.maps.Point(25, 25)
				};
			});
		};
		
		// Add event for whole map
		$scope.mapEvent = {
			idle: function() { // Do changes when map is zoomed in/out or dragged
				$scope.visibleMarkers.length = 0; // clean array
				//uiGmapIsReady.promise().then(function(map_instances) {});
				$scope.GMap = $scope.map.control.getGMap();
				for (var i=0; i<$scope.markers.length; i++){
					var temporaryPosition = new google.maps.LatLng($scope.markers[i].latitude, $scope.markers[i].longitude);
					if( $scope.GMap.getBounds().contains(temporaryPosition) ){
						$scope.visibleMarkers.push($scope.markers[i]);
					}
				}				
			}
		};
		
		// Put retrieved data in markers array
		for (var i=0; i<$scope.atms.length;i++) {
			$scope.markers.push({
				id: i,
				latitude: $scope.atms[i].coordinates.latitude,
				longitude: $scope.atms[i].coordinates.longitude,
				title: $scope.atms[i].name,
				content: $scope.atms[i].label,
				options: { draggable: false }
			});
		}
		
		// Add event for all markers
		$scope.markersEvent = {
			mouseover: function (marker, eventName, model, args) {
				marker.setIcon($scope.ATMIconRed);
				$scope.$apply();
			},
			mouseout: function (marker, eventName, model, args) {
				marker.setIcon($scope.ATMIconBlue);
				$scope.$apply();
			},
			click: function(marker, eventName, model, args) {
				$scope.showWindowAndDetail(model);
				$scope.$apply();
			}
		};
		
		// Initialize markers window
		$scope.window = {
			marker: {},
			show: false,
			closeClick: function() {
				this.show = false;
			},
			options: {}, // define when map is ready
			title: '',
			content: ''
		};
		
		// Click and back to ATMs list
		$scope.backToList = function() {
			$scope.atms_list_show = true;
			$scope.atms_detail_show = false;
		};
		
		// Show marker window with ATM's name and label and change the content of details div
		$scope.showWindowAndDetail = function(marker) {
			$scope.window.model = marker;
			$scope.window.title = marker.title;
			$scope.window.content = marker.content;
			$scope.window.show = true;
			$scope.ATMdetail = $scope.atms[marker.id];
			$scope.atms_list_show = false;
			$scope.atms_detail_show = true;
		}
	}]);
