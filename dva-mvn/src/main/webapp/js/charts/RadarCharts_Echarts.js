function BasicRadar_E(workSpace, data, attr, measure) {
//	console.log("BasicRadar_E in RadarCharts_Echarts");
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
	var indicator = [];
	measure.forEach(function(e){
		indicator.push({
			name: e
		});
	});
	var show_data = [];
	data.forEach(function(d) {
		var tmp_data = [];
		measure.forEach(function(e){
			tmp_data.push(d[e]);
		});
		show_data.push({
			value: tmp_data,
			name: d[attr]
		})
	})
	
	//console.log("show_data in BasicRadar_E:");
	//console.log(show_data);
	
	option = {
			color :colors,
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: attr_data
			},
			radar: {
				indicator: indicator
			},
			series: [{
				type: 'radar',
				data: show_data
			}]
	};
	myChart.setOption(option);		
}