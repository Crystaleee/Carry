/**
 * 平行坐标轴
 */

/**
 * 绘制平行坐标轴
 * 
 * @author liuqiaolian
 * @time 2016/4/22
 * @version 0.0.1
 * @param event
 *            事件，用于获取拖拽释放时的位置
 */
function Parallel(workSpace, data, dimensions) {
	var svg = workSpace[0];
	removeLegendPanel(workSpace);
	var width = svg[0][0].clientWidth;
	var height = svg[0][0].clientHeight;

	var x = d3.scale.ordinal().rangePoints([0, width], 1),
		y = {},
		dragging = {};

	var line = d3.svg.line().interpolate('cardinal').tension(0.85),
		axis = d3.svg
		.axis().orient("left"),
		background, foreground;
	var drag = d3.behavior.drag().on("drag", move);
	d3.select("svg").select("g").attr("class", "parallelcoor");
	// Extract the list of dimensions and create a scale for each.

	x.domain(dimensions.filter(
		function(d) {
			return d != "species" && (y[d] = d3.scale.linear().domain(
				d3.extent(data, function(p) {
					return +p[d];
				})).range([height, 0]));
		}));

	// Add grey background lines for context.
	background = svg.append("g")
		.attr("class", "background")
		.selectAll("path")
		.data(data)
		.enter()
		.append("path")
		.attr("d", path);

	// Add blue foreground lines for focus.
	foreground = svg.append("g").attr("class", "foreground").selectAll(
		"path").data(data).enter().append("path").attr("d", path);

	// Add a group element for each dimension.
	var g = svg.selectAll(".dimension").data(dimensions).enter()
		.append("g").attr("class", "dimension").attr("transform",
			function(d) {
				return "translate(" + x(d) + ")";
			}).call(
			d3.behavior.drag().origin(function(d) {
				return {
					x: x(d)
				};
			}).on("dragstart", function(d) {
				dragging[d] = x(d);
				background.attr("visibility", "hidden");
			}).on(
				"drag",
				function(d) {
					dragging[d] = Math.min(width, Math.max(0,
						d3.event.x));
					foreground.attr("d", path);
					dimensions.sort(function(a, b) {
						return position(a) - position(b);
					});
					x.domain(dimensions);
					g.attr("transform",
						function(d) {
							return "translate(" + position(d) + ")";
						});
				}).on(
				"dragend",
				function(d) {
					delete dragging[d];
					transition(d3.select(this)).attr(
						"transform",
						"translate(" + x(d) + ")");
					transition(foreground).attr("d", path);
					background.attr("d", path).transition()
						.delay(500).duration(0).attr(
							"visibility", null);
				}));

	// Add an axis and title.
	g.append("g").attr("class", "axis").each(function(d) {
		d3.select(this).call(axis.scale(y[d]));
	}).append("text").style("text-anchor", "middle").attr("y", -9).text(
		function(d) {
			return d;
		});

	// Add and store a brush for each axis.
	g.append("g").attr("class", "brush").each(
		function(d) {
			d3.select(this).call(
				y[d].brush = d3.svg.brush().y(y[d]).on(
					"brushstart", brushstart)
				.on("brush", brush));
		}).selectAll("rect").attr("x", -8).attr("width", 16);

	function position(d) {
		var v = dragging[d];
		return v == null ? x(d) : v;
	}

	function transition(g) {
		return g.transition().duration(500);
	}

	// Returns the path for a given data point.
	function path(d) {
		return line(dimensions.map(function(p) {
			return [position(p), y[p](d[p])];
		}));
	}

	function brushstart() {
		d3.event.sourceEvent.stopPropagation();
	}

	// Handles a brush event, toggling the display of foreground lines.
	function brush() {
		var actives = dimensions.filter(function(p) {
				return !y[p].brush.empty();
			}),
			extents = actives.map(function(p) {
				return y[p].brush.extent();
			});
		foreground.style("display", function(d) {
			return actives.every(function(p, i) {
				return extents[i][0] <= d[p] && d[p] <= extents[i][1];
			}) ? null : "none";
		});
	}
	// build to move
	function move(d) {
		var x = d3.event.x,
			y = d3.event.y;
		d3.select(this).attr("transform", function(d) {
			return "translate(" + x + "," + y + ")";
		});
	}
}