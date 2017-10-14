function BasicDash_E(workSpace, data, attr, measure) {
//	console.log("BasicDash_E in GuageCharts_Echarts");
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
	option = {
			tooltip: {
				formatter: "{a} <br/>{b} : {c}%"
			},
			series: [{
				type: 'gauge',
				detail: {formatter: '{value}%'},
				data: [{value: 50, name: data[0][attr]}]
			}]
	};
	setInterval(function() {
		option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
		myChart.setOption(option, true);
	}, 2000);
	myChart.setOption(option);
}