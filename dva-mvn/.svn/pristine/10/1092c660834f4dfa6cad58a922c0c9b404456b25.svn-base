var blue = d3.rgb(130, 150, 200) //"#3060cf";
var red = "#c4463a"
var yellow = "#fffbbc";
//var c = d3.scale.category20().domain(d3.range(20));
var colorPool = ['#ff0000', '#804040', '#ea7500', "#00ff00", '#6300C6', '#13B5D7'];
var c = function(i) {
	return colorPool[i % 6];
}
var compute = function(i) {
	if (i > 0.85) return red;
	else if (i > 0.5) return d3.interpolate(yellow, red)((i - 0.5) * 3);
	else return d3.interpolate(blue, yellow)(i * 2);
}
var linear = d3.scale.linear()
	.domain([0, 1])
	.range([600, 0]);

function appendRule(svg, pos) {
	var defs = svg.append("defs");
	var linear_b_y = defs.append("linearGradient")
		.attr("id", "lc_1")
		.attr("y2", "0%")
		.attr("x2", "0%")
		.attr("x1", "0%")
		.attr("y1", "100%");
	linear_b_y.append("stop")
		.attr("offset", "0%")
		.style("stop-color", blue.toString());
	linear_b_y.append("stop")
		.attr("offset", "100%")
		.style("stop-color", yellow.toString());
	var linear_y_r = defs.append("linearGradient")
		.attr("id", "lc_2")
		.attr("y2", "0%")
		.attr("x2", "0%")
		.attr("x1", "0%")
		.attr("y1", "100%");
	linear_y_r.append("stop")
		.attr("offset", "0%")
		.style("stop-color", yellow.toString());
	linear_y_r.append("stop")
		.attr("offset", "100%")
		.style("stop-color", red.toString());

	svg.append("g")
		.attr("class", "rule")
		.append("rect")
		.attr("x", 1250)
		.attr("y", pos - 300)
		.attr("width", 30)
		.attr("height", 300)
		.style("fill", "url(#lc_1)");
	d3.select(".rule")
		.append("rect")
		.attr("x", 1250)
		.attr("y", pos - 510)
		.attr("width", 30)
		.attr("height", 210)
		.style("fill", "url(#lc_2)");

	d3.select(".rule")
		.append("rect")
		.attr("x", 1250)
		.attr("y", pos - 600)
		.attr("width", 30)
		.attr("height", 90)
		.style("fill", red);

	var yAxis = d3.svg.axis()
		.scale(linear)
		.orient("right")
		.ticks(5);
	d3.select(".rule").append("g")
		.attr("class", "axis")
		.attr("transform", "translate(1280," + (pos - 600) + ")")
		.call(yAxis);
	var arc = d3.svg.symbol().type('triangle-right').size(200);

	var triangle = d3.select(".rule")
		.append("g")
		.attr('opacity', '0')
		.attr("class", "point")
		.attr("transform", "translate(1250," + (pos - 600) + ")");

	triangle.append('path')
		.attr('d', arc)
		.attr('fill', "white");
	return triangle;
}

function appendLegend(svg) {
	var measure = ["农业", "采选业", "工业", "能源", "建筑业", "第三产业"]
	var legend = svg.selectAll(".legend")
		.data(measure)
		.enter().append("g")
		.attr("class", "legend")
		.attr("transform", function(d, i) {
			return "translate(1400," + (950 + i * 30) + ")";
		});

	legend.append("rect")
		.attr("x", 0)
		.attr("width", 24)
		.attr("height", 18)
		.style("fill", function(d, i) {
			return c(i);
		});

	legend.append("text")
		.attr("x", 30)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("font-size", "22")
		.style("fill", "white")
		.text(function(d) {
			return d;
		});
	//	svg.append("g")
	//		.attr("transform", "translate(1190,300)")
	//		.append("text")
	//		.text("行业相关性矩阵")
	//		.style("font-size", "50")
	//		.style("fill", "white");
}

function matrixChart(opt) {
	var content;
	if (opt == 'indus') {
		content = "indus_matrix";
	} else if (opt == 'buiss') {
		content = "buiss_matrix";
	} else if (opt == 'large') {
		content = "indus_buiss_matrix";
	}
	//content = "net_matrix";
	var div = d3.select("#" + content)
	var width = 1000; //div[0][0].clientWidth;
	var height = 500; //div[0][0].clientHeight;
	var leftOffset = 240;
	var topOffset = 220;

	var y = d3.scale.ordinal().rangeBands([0, Math.min(width, height)]),
		z = d3.scale.linear().domain([0, 1]).clamp(true);
	var tooltip = d3.select("#" + content).append("div")
		.attr("class", "mytooltip")
		.style("opacity", "0.0");
	var svg = div.append("svg")
		.style("width", "100%")
		.style("height", "100%")
		.append("g");

	if (opt == "buiss") {
		var data = buiss_coef;
	} else if (opt == "indus") {
		var data = indus_coef;
	} else if (opt == "large") {
		var data = large_coef;
	}

	var matrix = [],
		nodes = data.nodes,
		n = nodes.length;

	// Compute index per node.
	nodes.forEach(function(node, i) {
		node.index = i;
		matrix[i] = d3.range(n).map(function(j) {
			return {
				x: i,
				y: j,
				z: 0
			};
		});
	});

	var linkDict = {};
	// Convert links to matrix; count character occurrences.
	data.links.forEach(function(link) {
		if (linkDict[link.source] == undefined) {
			linkDict[link.source] = {}
		}
		linkDict[link.source][link.target] = {
			value: link.value,
			type: link.type
		};
		if (matrix[link.source][link.target] == undefined) {
			console.log(link);
		}
		matrix[link.source][link.target].z = link.value;
		matrix[link.target][link.source].z = link.value;
	});

	// The default sort order.
	y.domain(nodes.map(function(d, i) {
		return i;
	}));

	svg.append("rect")
		.attr("class", "background")
		.attr("width", width)
		.attr("height", height);

	var row = svg.selectAll(".row")
		.data(matrix)
		.enter().append("g")
		.attr("class", "row")
		.attr("transform", function(d, i) {
			return "translate(0," + (topOffset + y(i)) + ")";
		})
		.each(row);
	var column = svg.selectAll(".column")
		.data(matrix)
		.enter().append("g")
		.attr("class", "column")
		.attr("transform", function(d, i) {
			return "translate(" + (leftOffset + y(i)) + ")rotate(-90)";
		});
	var triangle = appendRule(svg, (topOffset + height));
	row.append("text")
		.attr("x", leftOffset - 6)
		.attr("y", y.rangeBand() / 2)
		.attr("dy", ".32em")
		.attr("text-anchor", "end")
		.style("fill", function(d, i) {
			return c(nodes[i].category);
		})
		.style("font-size", "0.1px")
		.text(function(d, i) {
			return nodes[i].name;
		});
	column.append("text")
		.attr("x", 6 - topOffset)
		.attr("y", y.rangeBand() / 2)
		.attr("dy", ".32em")
		.style("fill", function(d, i) {
			return c(nodes[i].category);
		})
		.style("font-size", "0.1px")
		.attr("text-anchor", "start")
		.text(function(d, i) {
			return nodes[i].name;
		});

	function row(row, i) {
		var cell = d3.select(this).selectAll(".cell")
			.data(row)
			.enter().append("rect")
			.attr("class", "cell")
			.attr("x", function(d) {
				return leftOffset + y(d.y);
			})
			.attr("width", y.rangeBand())
			.attr("height", y.rangeBand())
			.style("stroke", function(d) {
				return compute(Math.abs(d.z));
			})
			.style("fill", function(d) {
				return compute(Math.abs(d.z));
			})
			.on("mousemove", function(d, j) {
				tooltip.style("left", (d3.event.clientX - 30) + "px")
					.style("top", (d3.event.clientY + 13) + "px");
			})
			.on("mouseover", function(d, j) {
				tooltip.style("z-index", 999);
				triangle.attr("opacity", 1);
				//triangle.select("path").attr("fill", compute(Math.abs(d.z)));
				triangle.attr("transform", "translate(1240," + (topOffset + height - 600 + linear(Math.abs(d.z))) + ")");
				var tips = data.nodes[d.x].name;
				var type;
				if (linkDict[d.x] && linkDict[d.x][d.y]) {
					if (linkDict[d.x][d.y].type == 0) {
						type = "->";
					} else {
						type = "<->";
					}
				} else if (linkDict[d.y] && linkDict[d.y][d.x]) {
					if (linkDict[d.y][d.x].type == 0) {
						type = "<-";
					} else {
						type = "<->";
					}
				} else {
					type = " X "
				}
				tips += type + data.nodes[d.y].name + "<br>" + matrix[d.x][d.y].z;
				tooltip.html(tips)
					.style("left", (d3.event.clientX - 30) + "px")
					.style("top", (d3.event.clientY + 13) + "px")
					.style("opacity", "0.6")
					.style("font-size", "20px");
			})
			.on("mouseout", function(d, j) {
				tooltip.style("left", "1000px")
					.style("top", "1000px");
				tooltip.style("z-index", 0);
				triangle.attr("opacity", 0);
				tooltip.style("opacity", 0.0);
				d3.selectAll("text").classed("active", false);
			});
	}
	appendLegend(svg);
}

function matrixChartRect() {
	var div = d3.select("#indus_buiss_matrix")
	var width = 1200; //div[0][0].clientWidth;
	var height = 960; //div[0][0].clientHeight;
	var tooltip = d3.select("#indus_buiss_matrix").append("div")
		.attr("class", "mytooltip")
		.style("opacity", "0.0");

	var y = d3.scale.ordinal().rangeBands([0, Math.min(width, height)]),
		z = d3.scale.linear().domain([0, 1]).clamp(true),
		c = d3.scale.category20().domain(d3.range(20));

	var svg = div.append("svg")
		.style("width", "100%")
		.style("height", "100%")
		.append("g");

	var data = buissindus_coef;
	var matrix = [];
	var rowNodes = data.rowNodes;
	var columnNodes = data.columnNodes;
	var rowLen = rowNodes.length;
	var colLen = columnNodes.length;

	rowNodes.forEach(function(node, i) {
		matrix[i] = d3.range(colLen).map(function(j) {
			return {
				x: i,
				y: j,
				z: 0
			};
		});
	});

	var linkDict = {};
	// Convert links to matrix; count character occurrences.
	data.links.forEach(function(link) {
		if (linkDict[link.source] == undefined) {
			linkDict[link.source] = {}
		}
		linkDict[link.source][link.target] = {
			value: link.value,
			type: link.type
		};
		matrix[link.source][link.target].z = link.value;
	});

	// The default sort order.
	y.domain(columnNodes.map(function(d, i) {
		return i;
	}));

	svg.append("rect")
		.attr("class", "background")
		.attr("width", width)
		.attr("height", height);

	var row = svg.selectAll(".row")
		.data(matrix)
		.enter().append("g")
		.attr("class", "row")
		.attr("transform", function(d, i) {
			return "translate(0," + y(i) + ")";
		})
		.each(row);

	var column = svg.selectAll(".column")
		.data(matrix[0])
		.enter().append("g")
		.attr("class", "column")
		.attr("transform", function(d, i) {
			return "translate(" + y(i) + ")rotate(-90)";
		});

	var triangle = appendRule(svg, y(148));

	function row(row, i) {
		var cell = d3.select(this).selectAll(".cell")
			.data(row)
			.enter().append("rect")
			.attr("class", "cell")
			.attr("x", function(d) {
				return y(d.y);
			})
			.attr("width", y.rangeBand())
			.attr("height", y.rangeBand())
			.style("stroke", function(d) {
				return compute(Math.abs(d.z));
			})
			.style("fill", function(d) {
				return compute(Math.abs(d.z));
			})
			.on("mousemove", function(d) {
				tooltip.style("left", (d3.event.clientX - 30) + "px")
					.style("top", (d3.event.clientY + 13) + "px");
			})
			.on("mouseover", function(d, j) {
				tooltip.style("z-index", 999);
				triangle.attr("opacity", 1);
				triangle.attr("transform", "translate( 1070," + (y(148) - 600 + linear(Math.abs(d.z))) + ")");
				var tips = data.rowNodes[i].name;
				var type;
				if (linkDict[d.x][d.y] != undefined) {
					if (linkDict[d.x][d.y].type == 0) {
						type = "->";
					} else if (linkDict[d.x][d.y].type == 1) {
						type = "<->";
					} else if (linkDict[d.x][d.y].type == 2) {
						type = "<-";
					}
				} else {
					type = " X "
				}
				tips += type + data.columnNodes[j].name + "<br>" + matrix[i][j].z;
				tooltip.html(tips)
					.style("left", (d3.event.clientX - 30) + "px")
					.style("top", (d3.event.clientY + 13) + "px")
					.style("opacity", "0.6")
					.style("font-size", "20px");
			})
			.on("mouseout", function(d, j) {
				triangle.attr("opacity", 0);
				tooltip.style("opacity", 0.0);
				tooltip.style("z-index", 0);
				tooltip.style("left", "1000px")
					.style("top", "1000px");
				d3.selectAll("text").classed("active", false);
			});
	}
	svg.attr("transform", "translate(40,109)");
}