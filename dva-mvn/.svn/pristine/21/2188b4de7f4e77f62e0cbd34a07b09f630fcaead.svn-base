var scaleRate = 0.0014;

var densityMap = L.map('densityMap', {
	center: [-25, 30], // [上下, 左右]
	zoom: 4,
	minZoom: 4
});

// 颜色生成器
var colors = ['#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc412a', '#e31a14', '#BD0026', '#800026'];
var densitys = {};
var grades = [5000, 15000, 25000, 35000, 50000, 200000, 500000];

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
datePicker.addTo(densityMap);

// 信息提示框
var info = L.control();
info.onAdd = function(map) {
	this._div = L.DomUtil.create('div', 'infoTips');
	this.update();
	return this._div;
};
info.update = function(feature, e) {
	if (feature) {
		var tips = '';
		if (densitys[feature.id]) {
			tips = '<b>' + feature.properties.name + '</b><br />' + densitys[feature.id].toFixed(1);
		} else {
			tips = '<b>' + feature.properties.name + '</b><br />';
		}
		d3.select('.infoTips').html(tips)
			.style("left", (e.originalEvent.clientX + 20) + "px")
			.style("top", (e.originalEvent.clientY) + "px")
			.style("opacity", "1")
			.style("z-index", 999);
	} else {
		d3.select('.infoTips').style("opacity", 0);
	}
}
info.addTo(densityMap);

// 根据用电密度设置颜色
var getColorDensity = function(density) {
	if (density === undefined) {
		return colors[0];
	}
	for (var i = 0; i < grades.length; i++) {
		if (density <= grades[i]) {
			return colors[i];
		}
	}
	return colors[i];
}

var styleDensity = function(feature) {
	return {
		weight: 0.5,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.7,
		fillColor: getColor(densitys[feature.id])
	};
};

var highlightFeature = function(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 3,
		color: '#666',
		dashArray: '',
		fillOpacity: 0.7
	});

	if (!L.Browser.ie && !L.Browser.opera) {
		layer.bringToFront();
	}

	info.update(layer.feature, e)
};

var onEachFeature = function(feature, layer) {
	layer.on({
		mouseover: highlightFeature,
		mouseout: function(e) {
			geojson.resetStyle(e.target);
			info.update();
		},
		mousemove: function(e) {
			info.update(e.target.feature, e);
		}
	});
};

var geojson = L.geoJson(functionRegion, {
	style: style,
	onEachFeature: onEachFeature,
	coordsToLatLng: function(coor) {
		return [coor[1] * scaleRate, coor[0] * scaleRate];
	}
}).addTo(map);

// lengend
var lengend = L.control({
	position: 'bottomleft'
});
lengend.onAdd = function(map) {
	this._div = L.DomUtil.create('div', 'info legend');
	this.update();
	return this._div;
}
lengend.update = function() {
	var labels = [],
		from, to;
	for (var i = 0; i < grades.length; i++) {
		from = grades[i];
		to = grades[i + 1];
		if (i == 0) {
			labels.push('<i style="background:' + getColor(from - 1) + '"></i>' + '&lt' + parseInt(from));
		}
		labels.push('<i style="background:' + getColor(from + 1) + '"></i>' + parseInt(from) + (to ? '&ndash;' + parseInt(to) : '+'));
	}
	this._div.innerHTML = labels.join('<br>');
};
lengend.addTo(map);

reRender();

function renderDensity(data) {
	var dataSorting = [];
	data = $.parseJSON(data);
	for (var id in data) {
		if (data[id]) {
			densitys[id] = parseFloat(data[id]);
			dataSorting.push(parseFloat(data[id]));
		} else {
			densitys[id] = 0;
			dataSorting.push(0);
		}
	}
	geojson.setStyle(style);
	lengend.update();
}

function reRender() {
	var date_ = $('#datepicker').val() ? $('#datepicker').val() : '2016-04-30';
	var time = $('#time').val();
	var url_ = "http://192.168.0.63:8080/dva-mvn/elecData/density/" + date_ + ".do";
	if (time != 0) {
		url_ = "http://192.168.0.63:8080/dva-mvn/elecData/density/" + date_ + time + ".do";
	} else {
		url_ = "http://192.168.0.63:8080/dva-mvn/elecData/density/" + date_ + ".do";
	}
	console.log(url_);

	$.ajax({
		type: "get",
		url: url_,
		dataType: "text",
		success: function(data) {
			renderDensity(data);
		},
		error: function(error) {
			console.log("error");
		}
	});
}