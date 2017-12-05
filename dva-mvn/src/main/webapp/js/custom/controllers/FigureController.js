(function() {
	'use strict';

	angular.module('app').controller('FigureController', FigureController);

	FigureController.$inject = [ '$location', '$scope', 'AuthenticationService', '$rootScope' ];

	function FigureController($location, $scope, AuthenticationService, $rootScope) {
		// initilization function
		(function initController() {
			$scope.figure = {
					starttime: null,
					endtime: null
			}
			$scope.recordList = $rootScope.recordList;
			
		})();
		
		$scope.DrawFigure = function() {
			var starttime = formatDate($scope.figure.starttime);
			var endtime = formatDate($scope.figure.endtime);
			var dateList = [];
			var foodCalList = [];
			var exCalList = [];
			var totalCalList = [];
			console.log($scope.recordList);
			for (var i = 0; i < $scope.recordList.length; i++) {
				var record = $scope.recordList[i];
				var recordDate = formatDate(record.date);
				if ((recordDate >= starttime) && (recordDate <= endtime)){
					dateList.push(recordDate);

					var exCal = 0;
					for (var j = 0; j < record.exerciseList.length; j++) {
						exCal -= parseInt(record.exerciseList[j].exercise_calorie);
					}
					exCalList.push(exCal);

					var foodCal = 0;
					for (var j = 0; j < record.foodList.length; j++) {
						foodCal += parseInt(record.foodList[j].food_calorie);
					}
					foodCalList.push(foodCal);
					totalCalList.push(foodCal + exCal);
				}
			}
			
			var dom = document.getElementById("container");
			console.log(dom);
			console.log(totalCalList);

			var myChart = echarts.init(dom);
			var app = {};

			var option = {
			    title: {
			        text: 'Record'
			    },
			    legend: {
			        data: ['food_cal', 'ex_cal', 'total_cal'],
			        align: 'left'
			    },
			    toolbox: {
			        // y: 'bottom',
			        feature: {
			            magicType: {
			                type: ['stack', 'tiled']
			            },
			            saveAsImage: {
			                pixelRatio: 2
			            }
			        }
			    },
			    tooltip: {},
			    xAxis: {
			    		data: dateList,
			        silent: false,
			        splitLine: {
			            show: false
			        }
			    },
			    yAxis: {
			    },
			    series: [{
			        name: 'food_cal',
			        type: 'bar',
			        data: foodCalList,
			        animationDelay: function (idx) {
			            return idx * 10;
			        }
			    }, {
			        name: 'ex_cal',
			        type: 'bar',
			        data: exCalList,
			        animationDelay: function (idx) {
			            return idx * 10 + 100;
			        }
			    }, {
			        name: 'total_cal',
			        type: 'bar',
			        data: totalCalList,
			        animationDelay: function (idx) {
			            return idx * 10;
			        }
			    }],
			    animationEasing: 'elasticOut',
			    animationDelayUpdate: function (idx) {
			        return idx * 5;
			    }
			};;
			if (option && typeof option === "object") {
			    myChart.setOption(option, true);
			}
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
