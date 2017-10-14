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

renderPointTest();

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