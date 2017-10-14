function BasicPie_E(workSpace, data, attr, measure) {
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
	var color = d3.scale.category20();
	var colors = [];
	
	for (var i = 0; i < 20; i ++) {
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
			type: 'pie',
			radius: '70%',
			center: ['50%', '40%'],
			data: measure_data,
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0,0.5)'
				}
			}
		});
	});
	
	//console.log("series in BasicPie_E:");
	//console.log(series);
	
	option = {
			color :colors,
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				data: attr_data,
				left: 'right',
				bottom: '10%',
				orient: 'vertical'
			},
			series: series
	};
	myChart.setOption(option);
}

function BasicDoughnut_E(workSpace, data, attr, measure) {
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
	var color = d3.scale.category20();
	var colors = [];
	
	for (var i = 0; i < 20; i ++) {
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
			type: 'pie',
			radius: ['50%', '70%'],
			avoidLabelOverlap: false,
			data: measure_data,
			label: {
				normal: {
					show: false,
					position: 'center'
				},
				emphasis: {
					show: true,
					textStyle: {
						fontSize: '30',
						fontWeight: 'bold'
					}
				}
			},
			labelLine: {
				normal: {
					show: false
				}
			}
		});
	});
	
	//console.log("series in BasicPie_E:");
	//console.log(series);
	
	option = {
			color :colors,
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				data: attr_data,
				left: 'right',
				bottom: '10%',
				orient: 'vertical'
			},
			series: series
	};
	myChart.setOption(option);	
}

//半径模式
function NightingaleRoseDiagram_E(workSpace, data, attr, measure) {
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
	var color = d3.scale.category20();
	var colors = [];
	
	for (var i = 0; i < 20; i ++) {
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
			type: 'pie',
			radius: ['20%', '70%'],
			center: ['50%', '50%'],
			roseType: 'radius',
			data: measure_data,
			label: {
				normal: {
					show: false,
					position: 'center'
				},
				emphasis: {
					show: true,
				}
			},
			labelLine: {
				normal: {
					show: false
				},
				emphasis: {
					show: true
				}
			}
		});
	});
	
	//console.log("series in BasicPie_E:");
	//console.log(series);
	
	option = {
			color :colors,
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				data: attr_data,
				left: 'right',
				bottom: '10%',
				orient: 'vertical'
			},
			toolbox: {
				show: true,
				feature: {
					mark: {show: true},
					dataView: {show: true, readOnly: false},
					magicType: {
						show: true,
						type: ['pie', 'funnel']
					},
					restore: {show: true},
					saveAsImage: {show: true}
				}
			},
			calculable: true,
			series: series
	};
	myChart.setOption(option);	
}

//面积模式
function NightingaleRoseDiagram_E_AREA(workSpace, data, attr, measure) {
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
	var color = d3.scale.category20();
	var colors = [];
	
	for (var i = 0; i < 20; i ++) {
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
			type: 'pie',
			radius: ['30%', '80%'],
			center: ['50%', '50%'],
			roseType: 'area',
			data: measure_data
		});
	});
	
	//console.log("series in BasicPie_E:");
	//console.log(series);
	
	option = {
			color :colors,
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				data: attr_data,
				left: 'right',
				bottom: '10%',
				orient: 'vertical'
			},
			toolbox: {
				show: true,
				feature: {
					mark: {show: true},
					dataView: {show: true, readOnly: false},
					magicType: {
						show: true,
						type: ['pie', 'funnel']
					},
					restore: {show: true},
					saveAsImage: {show: true}
				}
			},
			calculable: true,
			series: series
	};
	myChart.setOption(option);	
}