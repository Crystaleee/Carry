function BasicScatter_E(workSpace, data, attr, measure) {
//	console.log("BasicScatter_E in ScatterCharts_Echarts");
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
	var show_data = [];
	
	var color = d3.scale.category10();
	var colors = [];
	
	for (var i = 0; i < 10; i ++) {
		colors.push(color(i));
	}
	
	data.forEach(function(d){
		tmp = [];
		measure.forEach(function(e){
			tmp.push(d[e]);
		});
		show_data.push(tmp);
		attr_data.push(d[attr]);
	});
	
//	console.log("show_data in BasicScatter_E:");
//	console.log(show_data);
	
	option = {
			color :colors,
			tooltip: {
				trigger: 'item',
				position: 'right',
				formatter: "({c})"
			},
			xAxis: {
				name: measure[0],
				nameTextStyle: {
					fontSize: '15',
					fontWeight: 'bold'
				},
				type: 'value',
				scale: true,
				splitLine: {
					show: false
				}
			},
			yAxis: {
				name: measure[1],
				nameTextStyle: {
					fontSize: '15',
					fontWeight: 'bold'
				},
				type: 'value',
				scale: true,
				splitLine: {
					show: false
				}
			},
			legend: {
				data: attr_data,
				left: 'right',
				bottom: '10%',
				orient: 'vertical'
			},
			series: [{
				type: 'scatter',
				data: show_data
			}]
	};
	myChart.setOption(option);	
}

function BasicBubble_E(workSpace, data, attr, measure) {
//	console.log("BasicBubble_E in ScatterCharts_Echarts");
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
	
	data.forEach(function(d){
		attr_data.push(d[attr]);
	});
	
	var color = d3.scale.category10();
	var colors = [];
	
	for (var i = 0; i < 10; i ++) {
		colors.push(color(i));
	}
	
	//利用d3.layout.pack()构造数据
	
	var data000 = {};
	for (var i = 0; i < data.length; i++) {
		var key = data[i][attr];
		var value = parseFloat(data[i][measure]);
		data000[key] = value;
	}
	var workspace = document.getElementById(workSpace);
	var width = workspace.clientWidth;
	var height = workspace.clientHeight;
	var bubble = d3.layout.pack()
	               .sort(null)
	               .size([width, height])
	               .padding(1.5);
	
	var result = d3.entries(data000);
	var startString = "{\"name\": \"flare\",\"children\": [";
	result.forEach(function(dude) {
		startString += "{\"name\":\"" + dude.key + "\",\"size\":" + dude.value + "},";
	});
	startString = startString.substring(0, startString.length - 1);
	startString += "]}";
	
	function classes(root) {
		var classes = []; 
		function recurse(name, node) {
			if (node.children) 
			{
				node.children.forEach(function(child) {  
					recurse(node.name, child);
				})
			} else {
				classes.push({
					className: node.name,
					value: node.size
				})
			};  
		}
		recurse(null, root);
		return {
			children: classes
		};
	}
	
	var json2 = JSON.parse(startString);
	var show_data = [];
	var bubble_data = bubble.nodes(classes(json2)).filter(function(d) {
		return !d.children;
	});
	bubble_data.forEach(function(d){
		var tmp_data = [];
		tmp_data.push(d.x);
		tmp_data.push(d.y);
		tmp_data.push(d.r);
		tmp_data.push(d.className);
		show_data.push(tmp_data);
	});
	
	//console.log("show_data in BasicBubble_E:");
	//console.log(show_data);
	
	var series = [];
	
	show_data.forEach(function(d){
		series.push({
			type: 'scatter',
			data: [d],
			symbolSize: function(data){
				return data[2];
			},
			label: {
				emphasis: {
					show: true,
					formatter: function(param) {
						return param.data[3];
					},
					position: 'top'
				}
			}
		});
	});
	
	for (var i = 0; i < attr_data.length; i ++) {
		series[i]['name'] = attr_data[i];
	}
	//console.log("series in BasicBubble:");
	//console.log(series);
	
	option = {
			color: colors,
			xAxis: {
				show: false,
				splitLine: {
					lineStyle: {
						type: 'dashed'
					}
				},
				scale: true
			},
			yAxis: {
				show: false,
				splitLine: {
					lineStyle: {
						type: 'dashed'
					}
				},
				scale: true
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

function BasicBubble_E_THREE(workSpace, data, attr, measure) {
//	console.log("BasicBubble_E_THREE in ScatterCharts_Echarts");
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
	
	var color = d3.scale.category10();
	var colors = [];
	
	for (var i = 0; i < 10; i ++) {
		colors.push(color(i));
	}

	var show_data = [];
	
	data.forEach(function(d){
		show_data.push([d[measure[0]], d[measure[1]], d[measure[2]], d[attr]]);
		attr_data.push(d[attr]);
	});
	//console.log("show_data in BasicBubble_E:");
	//console.log(show_data);
	
	var series = [];
	
	show_data.forEach(function(d){
		series.push({
			name: d[3],
			type: 'scatter',
			data: [d],
			symbolSize: function(data){
				return data[2];
			},
			label: {
				emphasis: {
					show: true,
					formatter: function(param) {
						return param.data[3] + "\n权重:" + param.data[2];
					},
					position: 'top'
				}
			}
		});
	});
	
	option = {
			color: colors,
			xAxis: {
				show: true,
				splitLine: {
					lineStyle: {
						type: 'dashed'
					}
				},
				scale: true
			},
			yAxis: {
				show: true,
				splitLine: {
					lineStyle: {
						type: 'dashed'
					}
				},
				scale: true
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