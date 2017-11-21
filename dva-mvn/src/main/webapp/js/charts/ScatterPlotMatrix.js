/**
 * 散点图矩阵
 */

/**
 * 绘制散点图矩阵
 * @author liuqiaolian
 * @time 2016/4/22
 * @version 0.0.1
 */
function ScatterPlotMatrix(workSpace, flowers, traits) {
	var svg = workSpace[0];
	removeLegendPanel(workSpace);
	var width = svg[0][0].clientWidth;
	var height = svg[0][0].clientHeight;
	svg = svg.append("g");
	svg.attr("transform", "translate(" + (width - height) / 2 + "," + 0 + ")")
	var n = traits.length;
	var size = Math.min(width, height) / n * 0.9;
	var padding = Math.min(width, height) / n * 0.1;

	var x = {},
		y = {};
	traits
		.forEach(function(trait) {
			// Coerce values to numbers.
			flowers.forEach(function(d) {
				d[trait] = +d[trait];
			});

			var value = function(d) {
					return d[trait];
				},
				domain = [d3.min(flowers, value),
					d3.max(flowers, value)
				],
				range = [padding / 2,
					size - padding / 2
				];
			x[trait] = d3.scale.linear().domain(domain).range(range);
			y[trait] = d3.scale.linear().domain(domain).range(range.reverse());
		});

	// Axes.
	var axis = d3.svg.axis().ticks(5).tickSize(size * n);
	d3.select("svg").select("g").attr("class", "splom");

	// X-axis.
	svg.selectAll("g.x.axis").data(traits).enter().append("svg:g").attr(
		"class", "x axis").attr("transform", function(d, i) {
		return "translate(" + i * size + ",0)";
	}).each(function(d) {
		d3.select(this).call(axis.scale(x[d]).orient("bottom"));
	});

	// Y-axis.
	svg.selectAll("g.y.axis").data(traits).enter().append("svg:g").attr(
		"class", "y axis").attr("transform", function(d, i) {
		return "translate(0," + i * size + ")";
	}).each(function(d) {
		d3.select(this).call(axis.scale(y[d]).orient("right"));
	});

	// Cell and plot.
	var cell = svg.selectAll("g.cell").data(cross(traits, traits)).enter()
		.append("svg:g").attr("class", "cell").attr(
			"transform",
			function(d) {
				return "translate(" + d.i * size + "," + d.j * size + ")";
			}).each(plot);

	// Titles for the diagonal.
	cell.filter(function(d) {
		return d.i == d.j;
	}).append("svg:text").attr("x", padding).attr("y", padding).attr("dy",
		".71em").text(function(d) {
		return d.x;
	});

	function plot(p) {
		var cell = d3.select(this);
		// Plot frame.
		cell.append("svg:rect").attr("class", "frame").attr("x",
			padding / 2).attr("y", padding / 2).attr("width",
			size - padding).attr("height", size - padding);
		if (p.x === p.y) {
			// plot bar chart
			var xrect = d3.scale.ordinal().domain(d3.range(flowers.length))
				.rangeBands([padding / 2, size - padding / 2]);
			var yrect = d3.scale.linear().range([size - padding, 0]);
			cell.selectAll(".bar").data(flowers).enter().append("rect")
				.attr("class", "bar").attr("x", function(d, i) {
					return xrect(i);
				}).attr("width", xrect.rangeBand()).attr("y",
					function(d) {
						return size - padding / 2 - y[p.y](d[p.y]);
					}).attr("height", function(d) {
					return y[p.y](d[p.y]);
				});
		} else {
			// Plot dots.
			cell.selectAll("circle").data(flowers).enter().append(
				"svg:circle").attr("class", "circle").attr("cx",
				function(d) {
					return x[p.x](d[p.x]);
				}).attr("cy", function(d) {
				return y[p.y](d[p.y]);
			}).attr("r", 3);
		}
	}

	function cross(a, b) {
		var c = [],
			n = a.length,
			m = b.length,
			i, j;
		for (i = -1; ++i < n;)
			for (j = -1; ++j < m;)
				c.push({
					x: a[i],
					i: i,
					y: b[j],
					j: j
				});
		return c;
	}

}