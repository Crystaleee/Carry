function BasicLine_E(workSpace, data, attr, measure) {
//	console.log("BasicLine_E in LineCharts_Echarts");
//	console.log("workSpace:");
//	console.log(workSpace);
//	console.log("data:");
//	console.log(data);
//	console.log("attr:");
//	console.log(attr);
//	console.log("measure:");
//	console.log(measure);
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
	
	//console.log("attr_data:");
	//console.log(attr_data);
	
	measure.forEach(function(d) {
		measure_data = [];
		data.forEach(function(e) {
			measure_data.push({value: e[d], name:e[attr]});
		});
		series.push({
			name: d,
			type: 'line',
			data: measure_data,
		});
	});
	
	//console.log("series in BasicPie_E:");
	//console.log(series);
	
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

function StackLine_E(workSpace, data, attr, measure) {
//	console.log("StackLine_E in LineCharts_Echarts");
//	console.log("workSpace:");
//	console.log(workSpace);
//	console.log("data:");
//	console.log(data);
//	console.log("attr:");
//	console.log(attr);
//	console.log("measure:");
//	console.log(measure);
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
	
	//console.log("attr_data:");
	//console.log(attr_data);
	
	measure.forEach(function(d) {
		measure_data = [];
		data.forEach(function(e) {
			measure_data.push({value: e[d], name:e[attr]});
		});
		series.push({
			name: d,
			type: 'line',
			stack: 'sum',
			data: measure_data,
		});
	});
	
	//console.log("series in BasicPie_E:");
	//console.log(series);
	
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