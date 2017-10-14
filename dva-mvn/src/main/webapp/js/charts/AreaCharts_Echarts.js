function BasicArea_E(workSpace, data, attr, measure) {
	var myChart = echarts.init(document.getElementById(workSpace));
	var attr_data = [];
	var series = [];
	var color = d3.scale.category10();
	var colors = [];
	
	for (var i = 0; i < 10; i ++) {
		colors.push(color(i));
	}
	
	data.forEach(function(e){
		attr_data.push(e[attr]);
	});
	
	measure.forEach(function(d) {
		measure_data = [];
		data.forEach(function(e) {
			measure_data.push({value: e[d], name:e[attr]});
		});
		series.push({
			name: d,
			type: 'line',
			areaStyle: {normal:{}},
			data: measure_data,
		});
	});
	
	option = {
			color :colors,
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: measure
			},
			toolbox: {
				show: true,
				feature: {
					dataZoom: {
						yAxisIndex: 'none'
					},
					dataView: {readOnly: false},
					magicType: {type: ['line', 'bar']},
					restore: {},
					saveAsImage: {}
				}
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: attr_data
			},
			yAxis: {
				type: 'value'
			},
			series: series
	};
	myChart.setOption(option);
}

function StackArea_E(workSpace, data, attr, measure) {
	var myChart = echarts.init(document.getElementById(workSpace));
	var attr_data = [];
	var series = [];
	var color = d3.scale.category10();
	var colors = [];
	
	for (var i = 0; i < 10; i ++) {
		colors.push(color(i));
	}
	
	data.forEach(function(e){
		attr_data.push(e[attr]);
	});
	
	measure.forEach(function(d) {
		measure_data = [];
		data.forEach(function(e) {
			measure_data.push({value: e[d], name:e[attr]});
		});
		series.push({
			name: d,
			type: 'line',
			stack: 'sum',
			areaStyle: {normal: {}},
			data: measure_data,
		});
	});
	
	option = {
			color :colors,
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: measure
			},
			toolbox: {
				show: true,
				feature: {
					dataZoom: {
						yAxisIndex: 'none'
					},
					dataView: {readOnly: false},
					magicType: {type: ['line', 'bar']},
					restore: {},
					saveAsImage: {}
				}
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: attr_data
			},
			yAxis: {
				type: 'value'
			},
			series: series
	};
	myChart.setOption(option);	
}

function PercentageStackGraph_E(workSpace, data, attr, measure) {
	var myChart = echarts.init(document.getElementById(workSpace));
	var attr_data = [];
	var series = [];
	var color = d3.scale.category10();
	var colors = [];
	
	for (var i = 0; i < 10; i ++) {
		colors.push(color(i));
	}
	
	data.forEach(function(e){
		attr_data.push(e[attr]);
	});
	
	measure.forEach(function(d) {
		measure_data = [];
		
		data.forEach(function(e) {
			var tmp_sum = 0;
			measure.forEach(function(g) {
				tmp_sum += e[g];
			})
			if (tmp_sum == 0) {
				tmp_sum = 0x3fffffffffffffff;
			}
			measure_data.push({value: 1.0 * e[d] / tmp_sum, name:e[attr]});
		});
		series.push({
			name: d,
			type: 'line',
			stack: 'sum',
			areaStyle: {normal: {}},
			data: measure_data,
		});
	});
	
	option = {
			color :colors,
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: measure
			},
			toolbox: {
				show: true,
				feature: {
					dataZoom: {
						yAxisIndex: 'none'
					},
					dataView: {readOnly: false},
					magicType: {type: ['line', 'bar']},
					restore: {},
					saveAsImage: {}
				}
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: attr_data
			},
			yAxis: {
				type: 'value'
			},
			series: series
	};
	myChart.setOption(option);	
}