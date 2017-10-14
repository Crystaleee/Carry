function StackBar_E(workSpace, data, attr, measure) {
	var myChart = echarts.init(document.getElementById(workSpace));
	var attr_data = []
	var series = []
	data.forEach(function(e) {
		attr_data.push(e[attr])
	})
	measure.forEach(function(d) {
		measure_data = []
		data.forEach(function(e) {
			measure_data.push(e[d])
		})
		series.push({
			name: d,
			type: 'bar',
			stack: '总量',
			label: {
				normal: {
					position: 'insideRight'
				}
			},
			data: measure_data
		})
	})

	option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		legend: {
			data: measure,
			left: 'right',
			bottom: '10%',
			orient: 'vertical',
		},
		grid: {
			left: '3%',
			right: '15%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			type: 'value'
		},
		yAxis: {
			type: 'category',
			data: attr_data
		},
		series: series
	}
	myChart.setOption(option);
}

function BasicHist_E(workSpace, data, attr, measure) {
	var myChart = echarts.init(document.getElementById(workSpace));
	var attr_data = [];
	var series = [];
	var color = d3.scale.category20();
	var colors = [];
	
	for (var i=0; i < 20; i++) {
		colors.push(color(i));
	}
	
	data.forEach(function(e) {
		attr_data.push(e[attr])
	});
	
	measure.forEach(function(d) {
		measure_data = [];
		data.forEach(function(e) {
			measure_data.push(e[d])
		});
		console.log("measure data in BasicHist_E:");
		console.log(measure_data);
		series.push({
			name: d,
			type: 'bar',
			label: {
				normal: {
					position: 'insideRight'
				}
			},
			data: measure_data
		})
	});
	
	console.log("series in BasicHist_E:");
	console.log(series);

	option = {
		color: colors,
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		legend: {
			data: measure,
			left: 'right',
			bottom: '10%',
			orient: 'vertical',
		},
		grid: {
			left: '3%',
			right: '10%',
			bottom: '3%',
			top: '3%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: attr_data
		},
		yAxis: {
			type: 'value'
		},
		series: series
	}
	myChart.setOption(option);
}

function StackHist_E(workSpace, data, attr, measure) {
	var myChart = echarts.init(document.getElementById(workSpace));
	var attr_data = []
	var series = [];
	var color = d3.scale.category20();
	var colors = [];
	
	for (var i=0; i < 20; i++) {
		colors.push(color(i));
	}
	data.forEach(function(e) {
		attr_data.push(e[attr])
	})
	measure.forEach(function(d) {
		measure_data = []
		data.forEach(function(e) {
			measure_data.push(e[d])
		})
		series.push({
			name: d,
			type: 'bar',
			stack: 'sum',    //指定堆积到那一列
			label: {
				normal: {
					position: 'insideRight'
				}
			},
			data: measure_data
		})
	})

	option = {
		color: colors,
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		legend: {
			data: measure,
			left: 'right',
			bottom: '10%',
			orient: 'vertical',
		},
		grid: {
			left: '3%',
			right: '15%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: attr_data
		},
		yAxis: {
			type: 'value'
		},
		series: series
	}
	myChart.setOption(option);
}

function BasicBar_E(workSpace, data, attr, measure) {
	var myChart = echarts.init(document.getElementById(workSpace));
	var attr_data = [];
	var series = [];
	var color = d3.scale.category20();
	var colors = [];
	
	for (var i = 0; i < 20 ; i++) {
		colors.push(color(i));
	}
	
	data.forEach(function(e) {
		attr_data.push(e[attr])
	})
	measure.forEach(function(d) {
		measure_data = []
		data.forEach(function(e) {
			measure_data.push(e[d])
		})
		series.push({
			name: d,
			type: 'bar',
			label: {
				normal: {
					position: 'insideRight'
				}
			},
			data: measure_data
		})
	});

	option = {
		color: colors,
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		legend: {
			data: measure,
			left: 'right',
			bottom: '10%',
			orient: 'vertical',
		},
		grid: {
			left: '3%',
			right: '15%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			type: 'value'
		},
		yAxis: {
			type: 'category',
			data: attr_data
		},
		series: series
	}
	myChart.setOption(option);
}

//旋风条形图的配置，关键点在于指定series.stack属性，这里采用的方法是相邻的两列堆叠在同一个位置
function PairedBars_E(workSpace, data, attr, measure) {
	var myChart = echarts.init(document.getElementById(workSpace));
	var attr_data = [];
	var series = [];
	var color = d3.scale.category20();
	var colors = [];
	
	for (var i = 0; i < 20 ; i++) {
		colors.push(color(i));
	}
	
	data.forEach(function(e) {
		attr_data.push(e[attr])
	})
	measure.forEach(function(d) {
		measure_data = []
		data.forEach(function(e) {
			measure_data.push(e[d])
		})
		series.push({
			name: d,
			type: 'bar',
			stack: d,
			label: {
				normal: {
					position: 'insideRight'
				}
			},
			data: measure_data
		})
	});
	
	function negative(d) {
		res = [];
		d.forEach(function(e){
			res.push(-e);
		});
		return res;
	}
	
	for (var i = 1; i < series.length; i += 2) {
		series[i].data = negative(series[i].data);
		series[i].stack = series[i-1].stack;
	}
	//console.log("series in PairedBars:");
	//console.log(series);

	option = {
		color: colors,
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		legend: {
			data: measure,
			left: 'right',
			bottom: '10%',
			orient: 'vertical',
		},
		grid: {
			left: '3%',
			right: '15%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			type: 'value'
		},
		yAxis: {
			type: 'category',
			data: attr_data
		},
		series: series
	}
	myChart.setOption(option);
}