var linear = d3.scale.linear().domain([0, 3000]).range([10, 100]);

var scaleRate = 0.0014;

var heatMap = L.map('heatMap', {
	center: [-25, 30],
	zoom: 4,
	minZoom: 4
});

// 右侧时间选择器
var datePicker = L.control({
	position: 'topright'
});
datePicker.onAdd = function(map) {
	this._div = L.DomUtil.create('div', 'date');
	$('<input id="datepicker" type="date" value="2016-04-30"/>').appendTo(this._div);
	this._time = $('<select id="time"></select>').appendTo(this._div);
	for (var i = 0; i < 10; i++) {
		$('<option value=' + i + '>' + i + '</option>').appendTo(this._time);
	}
	$('<button onclick="reRender()">submit</button>').appendTo(this._div);

	return this._div;
};
datePicker.update = function() {};
datePicker.addTo(heatMap);

var styleHeat = function(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 1,
		fillColor: '#ecedb4'
	};
};

var geojsonHeat = L.geoJson(functionRegion, {
	style: style,
	coordsToLatLng: function(coor) {
		return [coor[1] * scaleRate, coor[0] * scaleRate];
	}
}).addTo(heatMap);

var heatPoints = {
	max: 10,
	data: []
};

var config = {
	valueField: 'count',
	minOpacity: 0.1,
	maxOpacity: 0.7
};
var heatmapLayer = new HeatmapOverlay(config).addTo(map);

reRenderHeat();

function renderHeatmap(data) {
	data = $.parseJSON(data);

	var max = 0;
	for (var cid in data) {
		heatPoints.data.push({
			lat: clusterInfo[cid].y * scaleRate,
			lng: clusterInfo[cid].x * scaleRate,
			radius: clusterInfo[cid].sample / 150,
			// count: linear(Math.sqrt(parseFloat(data[cid]))) 
			count: Math.log10(linear(parseFloat(data[cid])))
		});

		max = max < parseFloat(data[cid]) ? parseFloat(data[cid]) : max;
	}
	heatPoints.max = Math.log10(linear(max));
	console.log(heatPoints.max);

	heatmapLayer.setData(heatPoints);
	heatPoints.data.splice(0, heatPoints.data.length);

}

function reRenderHeat() {
	var date_ = $('#datepicker').val() ? $('#datepicker').val() : '2016-04-30';
	var time = $('#time').val();
	var url_ = "http://192.168.0.63:8080/dva-mvn/elecData/heat/" + date_ + ".do";
	if (time != 0) {
		url_ = "http://192.168.0.63:8080/dva-mvn/elecData/heat/" + date_ + time + ".do";
	} else {
		url_ = "http://192.168.0.63:8080/dva-mvn/elecData/heat/" + date_ + ".do";
	}
	console.log(url_);

	$.ajax({
		type: "get",
		url: url_,
		dataType: "text",
		success: function(data) {
			renderHeatmap(data);
		},
		error: function(error) {
			console.log("error");
		}
	});
}