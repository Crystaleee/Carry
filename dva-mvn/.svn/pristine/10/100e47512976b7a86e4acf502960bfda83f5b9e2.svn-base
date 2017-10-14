

function poiMap() {
	var userFill = new ol.style.Fill({
		color: 'red'
	});

	var iconStyle = {
		'machine': new ol.style.Style({
			image: new ol.style.Icon({
				src: '../static/lbs/lbs_3.png',
				anchor: [0.5, 1],
			})
		}),
		'user': new ol.style.Style({
			image: new ol.style.Circle({
				radius: 3,
				fill: userFill
			})
		})
	}

	var regionStyle = new ol.style.Style({
		fill: new ol.style.Fill({
			color: 'white',
		}),
		stroke: new ol.style.Stroke({
			color: 'gray',
			width: 1,
		})
	});

	var styleFunction = function(feature) {

		if (feature.getId() == 'district') {
			regionStyle.getFill().setColor('rgb(225, 225, 225)');
		} else if (feature.get("name") == 'natural') {
			regionStyle.getFill().setColor('rgb(163, 255, 115)');
		} else if (feature.get("name") == 'water') {
			regionStyle.getStroke().setColor('rgb(115, 178, 255)');
		} else {
			regionStyle.getStroke().setColor('rgb(255, 255, 255)');
		}

		return regionStyle;
	};

	var baseLayer = new ol.layer.Vector({
		source: new ol.source.Vector({
			url: '../assets/utils/json/pdBorder.json',
			format: new ol.format.GeoJSON()
		}),
		style: styleFunction
	});

	var naturalLayer = new ol.layer.Vector({
		source: new ol.source.Vector({
			url: '../assets/utils/json/natural_new.json',
			format: new ol.format.GeoJSON()
		}),
		style: styleFunction
	});

	var waterLayer = new ol.layer.Vector({
		source: new ol.source.Vector({
			url: '../assets/utils/json/waterways_new.json',
			format: new ol.format.GeoJSON()
		}),
		style: styleFunction
	});

	var roadLayer = new ol.layer.Vector({
		source: new ol.source.Vector({
			url: '../assets/utils/json/roads_new.json',
			format: new ol.format.GeoJSON()
		}),
		style: styleFunction
	});

	var iconLayer = new ol.layer.Vector({
		source: new ol.source.Vector()
	});

	var map = new ol.Map({
		layers: [
			baseLayer,
			naturalLayer,
			waterLayer,
			roadLayer,
			iconLayer
		],
		target: 'poiSearch',
		view: new ol.View({
			center: [30542, -12261],
			zoom: 11,
			minZoom: 11
		})
	});

	/**
	 * render the point of machine and user
	 * 
	 * @arg points {'machine': [[x, y]], 'users': [[x1, y1], [x2, y2], [x3, y3]]}
	 */
	function renderPoint(points) {
		if (iconLayer.getSource().getFeatures()) {
			iconLayer.getSource().clear();
		}

		var iconFeatures = [];
		for (var type in points) {
			points[type].forEach(function(e) {
				var feat = new ol.Feature({
					geometry: new ol.geom.Point(e)
				});
				feat.setStyle(iconStyle[type]);
				iconFeatures.push(feat);
			});
		}
		iconLayer.getSource().addFeatures(iconFeatures);
	}

	function renderPointTest() {
		var points = {
			'machine': [
				[20000, -12261]
			],
			'user': []
		};
		for (var i = 0; i < 100; i++) {
			points.user.push([20542 - 5000 + Math.random() * 10000, -12261 - 5000 + Math.random() * 10000]);
		}
		renderPoint(points);
	}

	renderPointTest();
}

// =======================================================
function densityMap() {
	var scaleRate = 0.0012;

	// 颜色生成器
	var colors = ['#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc412a', '#e31a14', '#BD0026', '#800026'];
	var grades = [5000, 15000, 25000, 35000, 50000, 200000, 500000];
	var densitys = {};

	var densityMap = L.map('densityMap', {
		center: [-20, 30], // [上下, 左右]
		zoom: 4,
		minZoom: 4
	});

	// 右侧时间选择器
	var datePickerDens = L.control({
		position: 'topright'
	});
	datePickerDens.onAdd = function(map) {
		this._div = L.DomUtil.create('div', 'date');
		$('<input id="datepicker" type="date" value="2016-04-30"/>').appendTo(this._div);
		this._time = $('<select id="time"></select>').appendTo(this._div);

		for (var i = 0; i < 10; i++) {
			$('<option value=' + i + '>' + i + '</option>').appendTo(this._time);
		}
		$('<button onclick="reRender()">submit</button>').appendTo(this._div);

		return this._div;
	};
	datePickerDens.update = function() {};
	datePickerDens.addTo(densityMap);

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
			fillColor: getColorDensity(densitys[feature.id])
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
		style: styleDensity,
		onEachFeature: onEachFeature,
		coordsToLatLng: function(coor) {
			return [coor[1] * scaleRate, coor[0] * scaleRate];
		}
	}).addTo(densityMap);

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
				labels.push('<i style="background:' + getColorDensity(from - 1) + '"></i>' + '&lt' + parseInt(from));
			}
			labels.push('<i style="background:' + getColorDensity(from + 1) + '"></i>' + parseInt(from) + (to ? '&ndash;' + parseInt(to) : '+'));
		}
		this._div.innerHTML = labels.join('<br>');
	};
	lengend.addTo(densityMap);

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
		geojson.setStyle(styleDensity);
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

	reRender();
}

// ==========================================================================
function heatMap() {
	var scaleRate = 0.0012;
	var linear = d3.scale.linear().domain([0, 3000]).range([10, 100]);

	var heatMap = L.map('heatMap', {
		center: [-20, 30],
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
		style: styleHeat,
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
	var heatmapLayer = new HeatmapOverlay(config).addTo(heatMap);

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

	reRenderHeat();
}
