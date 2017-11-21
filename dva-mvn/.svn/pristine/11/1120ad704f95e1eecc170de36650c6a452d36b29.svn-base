/**
 * 星坐标
 */

/**
 * 绘制星坐标
 * @author liuqiaolian
 * @time 2016/4/22
 * @version 0.0.1
 */
function Star(workSpace, cars /*data*/ , traits /*measure*/ ) {
	var svg = workSpace[0];
	removeLegendPanel(workSpace);
	var width = svg[0][0].clientWidth;
	var height = svg[0][0].clientHeight;
	
	var data = [];

	for (var i = 0; i < cars.length; i++) {
		var datapoint = [];
		traits.forEach(function(trait) {
			var dim = +cars[i][trait];
			datapoint.push(dim);
		});
		data.push(datapoint);
	}

	var origin = new Object();
	origin.x = width / 2;
	origin.y = height / 2;
	var anchors = [];
	var points = [];
	var axisLength = [];
	var axisVectors = [];
	var initAxisLen = Math.min(height,width)/2*0.8;

	var dim = data[0].length;

	initAxisLength();
	initAxisVectors();
	getAnchors();
	points = getPoints();

	var drag = d3.behavior.drag()
		.on("dragstart", dragstart)
		.on("drag", ondrag);

	var g = svg.append("g")
		.attr("class", "starcoor");
	var axis = g.selectAll(".axis").data(anchors).enter().append("line").attr(
		"x1", origin.x).attr("y1", origin.y).attr("x2", function(d) {
		return d.x;
	}).attr("y2", function(d) {
		return d.y;
	}).attr("id", function(d, i) {
		return i;
	}).style("cursor", "pointer").call(drag);
	var point = g.selectAll("circle").data(points).enter().append("circle")
		.attr("cx", function(d) {
			return d.x;
		}).attr("cy", function(d) {
			return d.y;
		}).attr("r", 3);

	function getAnchors() {
		var size = (2 * Math.PI) / (dim * 1.0);
		for (var i = 0; i < dim; i++) {
			var point = new Object();
			point.x = initAxisLen * Math.cos(i * size) + origin.x;
			point.y = initAxisLen * Math.sin(i * size) + origin.y;
			anchors.push(point);
		}
	}

	function getPoints() {
		var i, j;
		var finalpoints = [];
		generateAxisVectors();
		var min = [];
		var max = [];
		// check for min and max of the dataset
		for (i = 0; i < data.length; i++) {
			for (j = 0; j < dim; j++) {
				if (i === 0) {
					min[j] = data[i][j];
					max[j] = data[i][j];
				} else {
					if (min[j] > data[i][j])
						min[j] = data[i][j];
					if (max[j] < data[i][j])
						max[j] = data[i][j];
				}
			}
		} // end of for

		for (i = 0; i < data.length; i++) {
			var sumX = 0;
			var sumY = 0;
			for (j = 0; j < dim; j++) {
				var uX = 0,
					uY = 0;
				var info = [];
				info = axisVectors[j];

				if (min[j] != max[j]) {
					uX = parseFloat(info.x) / (max[j] - min[j]);
					uY = parseFloat(info.y) / (max[j] - min[j]);
				}

				sumX += uX * (data[i][j] - min[j]);
				sumY += uY * (data[i][j] - min[j]);

			}
			var point = new Object();
			point.x = sumX + origin.x;
			point.y = sumY + origin.y;
			finalpoints.push(point);
		}
		return finalpoints;
	}

	function initAxisLength() {
		for (var i = 0; i < data[0].length; i++)
			axisLength[i] = 100; // px
	}

	function initAxisVectors() {
		var size = (2 * Math.PI) / (dim * 1.0);
		for (var i = 0; i < dim; i++) {
			var vector = new Object();
			vector.x = initAxisLen * Math.cos(i * size);
			vector.y = initAxisLen * Math.sin(i * size);
			axisVectors.push(vector);
		}
	}

	function generateAxisVectors() {
		var size = (2 * Math.PI) / (dim * 1.0);
		for (var i = 0; i < dim; i++) {
			axisVectors[i].x = axisLength[i] * Math.cos(i * size);
			axisVectors[i].y = axisLength[i] * Math.sin(i * size);
		}
	}

	function dragstart(d) {
		d3.event.sourceEvent.stopPropagation();
	}

	function ondrag(d) {
		d3.select(this).attr("x2", d3.event.x).attr("y2", d3.event.y);
		axisLength[this.getAttribute("id")] = Math.sqrt((d3.event.x - origin.x) * (d3.event.x - origin.x) + (d3.event.y - origin.y) * (d3.event.y - origin.y));
		var newpoints = getPoints();
		var cnt = 0;
		d3.selectAll("circle").each(function() {
			this.setAttribute("cx", newpoints[cnt].x);
			cnt++;
		});
	}

}