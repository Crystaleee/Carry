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
			for (var i = 0; i < $scope.recordList.length; i++) {
				var record = $scope.recordList[i];
				var recordDate = formatDate(record.date);
				if ((recordDate >= starttime) && (recordDate <= endtime)){
					dateList.push(recordDate);

					var exCal = 0;
					for (var j = 0; j < record.exerciseList.length; j++) {
						exCal += parseInt(record.exerciseList[j].exercise_calorie);
					}
					exCalList.push(exCal);

					var foodCal = 0;
					for (var j = 0; j < record.foodList.length; j++) {
						foodCal += parseInt(record.foodList[j].food_calorie);
					}
					foodCalList.push(foodCal);
				}
			}
			var totalCalList = [];
			for (var i = 0; i < dateList.length; i++) {
				totalCalList[i] = foodCalList[i] - exCalList[i];
			}
			
			
			var dom = document.getElementById("container");
			console.log(dom);
			console.log(totalCalList);

			var myChart = echarts.init(dom);
			var app = {};
			var xAxisData = [];
			var data1 = [];
			var data2 = [];
			for (var i = 0; i < 100; i++) {
			    xAxisData.push('类目' + i);
			    data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
			    data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
			}

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
//			            dataView: {},
			            saveAsImage: {
			                pixelRatio: 2
			            }
			        }
			    },
			    tooltip: {},
			    xAxis: {
//			        data: xAxisData,
			    		data: [1, 2, 3, 4, 5, 6, 7],
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
//			        data: data1,
			        data: [ 150, 232, 201, 154, 190, 330, 410 ],
			        animationDelay: function (idx) {
			            return idx * 10;
			        }
			    }, {
			        name: 'ex_cal',
			        type: 'bar',
//			        data: data2,
			        data: [ -120, -132, -101, -134, -90, -230, -210 ],
			        animationDelay: function (idx) {
			            return idx * 10 + 100;
			        }
			    }, {
			        name: 'total_cal',
			        type: 'bar',
			        data: [ 30, 100, 100, 20, 100, 100, 200 ],
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
			
			
//			var myChart = echarts.init(document.getElementById('main'));
//			var option = {
//					title : {
//						text : 'Record'
//					},
//					tooltip : {
//						trigger : 'axis',
//						axisPointer : {
//							type : 'cross',
//							label : {
//								backgroundColor : '#6a7985'
//							}
//						}
//					},
//					legend : {
//						data : [ 'food_cal', 'ex_cal', 'total_cal' ]
//					},
//					grid : {
//						left : '3%',
//						right : '4%',
//						bottom : '3%',
//						containLabel : true
//					},
//					xAxis : [ {
//						type : 'category',
//						boundaryGap : false,
////						data : [ '10.1', '10.8', '10.15', '10.21', '10.28', '11.4', '11.11' ]
//						data : dateList
//					} ],
//					yAxis : [ {
//						type : 'value'
//					} ],
//					series : [ {
//						name : 'food_cal',
//						type : 'line',
//						stack : '总量',
//						areaStyle : {
//							normal : {}
//						},
////						data : [ 120, 132, 101, 134, 90, 230, 210 ]
////						data : foodCalList
//						data : [50, 50]
//					}, {
//						name : 'ex_cal',
//						type : 'line',
//						stack : '总量',
//						areaStyle : {
//							normal : {}
//						},
////						data : [ 220, 182, 191, 234, 290, 330, 310 ]
////						data : exCalList
//						data : [150 , 200]
//					}, {
//						name : 'total_cal',
//						type : 'line',
//						stack : '总量',
//						areaStyle : {
//							normal : {}
//						},
////						data : [ 150, 232, 201, 154, 190, 330, 410 ]
////						data : totalCalList
//						data : [-100 , -150]
//					} ]
//				};
//
//				// 使用刚指定的配置项和数据显示图表。
//				myChart.setOption(option);
//			
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
