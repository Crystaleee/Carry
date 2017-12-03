(function() {
	'use strict';

	angular.module('app').controller('FigureController', FigureController);

	FigureController.$inject = [ '$location', '$scope', 'AuthenticationService' ];

	function FigureController($location, $scope, AuthenticationService) {
		// initilization function
		(function initController() {

		})();
		
		$scope.DrawFigure = function() {
			
		};

		$scope.inlineOptions = {
			minDate : new Date(),
			showWeeks : false
		};

		$scope.dateOptions = {
			formatYear : 'yy',
			maxDate : new Date(),
			minDate : new Date(),
			startingDay : 1
		};

		$scope.toggleMin = function() {
			$scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null
					: new Date();
			$scope.dateOptions.minDate = $scope.inlineOptions.minDate;
		};

		$scope.toggleMin();

		$scope.open1 = function() {
			$scope.popup1.opened = true;
		};

		$scope.open2 = function() {
			$scope.popup2.opened = true;
		};

		$scope.setDate = function(year, month, day) {
			$scope.user.birthdayUpdate = new Date(year, month, day);
		};

		$scope.formats = [ 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy',
				'shortDate' ];
		$scope.format = $scope.formats[0];
		$scope.altInputFormats = [ 'M!/d!/yyyy' ];

		$scope.popup1 = {
			opened : false
		};

		$scope.popup2 = {
			opened : false
		};

	}

})();
