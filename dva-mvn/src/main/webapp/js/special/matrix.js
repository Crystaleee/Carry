var blue = "#3060cf";
var red = "#c4463a"
var yellow = "#fffbbc";
var compute = function(i) {
	//	if (i < 0.3) {
	//		return d3.interpolate(blue, yellow)(i * 3.33);
	//	} else {
	//		return d3.interpolate(yellow, red)((i - 0.3) * 2);
	//	}
	if (i > 0.8) return red
	else if (i < 0.2) return blue
	else return yellow;
	//	if (i < 0.5) {
	//		return d3.interpolate(blue, yellow)(i * 2);
	//	} else {
	//		return d3.interpolate(yellow, red)((i - 0.5) * 2);
	//	}
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
		.attr("x", 1280)
		.attr("y", pos - 180)
		.attr("width", 30)
		.attr("height", 180)
		.style("fill", "url(#lc_1)");
	d3.select(".rule")
		.append("rect")
		.attr("x", 1280)
		.attr("y", pos - 480)
		.attr("width", 30)
		.attr("height", 300)
		.style("fill", "url(#lc_2)");
	d3.select(".rule")
		.append("rect")
		.attr("x", 1280)
		.attr("y", pos - 600)
		.attr("width", 30)
		.attr("height", 121)
		.style("fill", red);

	var yAxis = d3.svg.axis()
		.scale(linear)
		.orient("right")
		.ticks(5);
	d3.select(".rule").append("g")
		.attr("class", "axis")
		.attr("transform", "translate(1310," + (pos - 600) + ")")
		.call(yAxis);
	var arc = d3.svg.symbol().type('triangle-right').size(200);

	var triangle = d3.select(".rule")
		.append("g")
		.attr('opacity', '0')
		.attr("class", "point")
		.attr("transform", "translate(1280," + (pos - 600) + ")");

	triangle.append('path')
		.attr('d', arc)
		.attr('fill', "white");
	return triangle;
}

function matrixChart(opt) {
	var content;
	if (opt == 'indus') {
		content = "indus_matrix";
	} else if (opt == 'buiss') {
		content = "buiss_matrix";
	}
	//content = "net_matrix";
	var div = d3.select("#" + content)
	var width = 1200; //div[0][0].clientWidth;
	var height = 960; //div[0][0].clientHeight;
	var leftOffset = 100;
	var topOffset = 50;

	var y = d3.scale.ordinal().rangeBands([0, Math.min(width, height)]),
		z = d3.scale.linear().domain([0, 1]).clamp(true),
		c = d3.scale.category20().domain(d3.range(20));
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

	//		row.append("line")
	//			.attr("x2", width);

	//	row.append("text")
	//		.attr("x", -6)
	//		.attr("y", y.rangeBand() / 2)
	//		.attr("dy", ".32em")
	//		.attr("text-anchor", "end")
	//		.text(function(d, i) {
	//			return nodes[i].name;
	//		});

	var column = svg.selectAll(".column")
		.data(matrix)
		.enter().append("g")
		.attr("class", "column")
		.attr("transform", function(d, i) {
			return "translate(" + (leftOffset + y(i)) + ")rotate(-90)";
		});

	//		column.append("line")
	//			.attr("x1", -width);

	//	column.append("text")
	//		.attr("x", 6)
	//		.attr("y", y.rangeBand() / 2)
	//		.attr("dy", ".32em")
	//		.attr("text-anchor", "start")
	//		.text(function(d, i) {
	//			return nodes[i].name;
	//		});
	var triangle = appendRule(svg, (topOffset + height));

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
			//			.style("fill-opacity", function(d) {
			//				return d.z;
			//			})
			.style("stroke", function(d) {
				return compute(Math.abs(d.z));
			})
			.style("fill", function(d) {
				//				if (linkDict[d.x] && linkDict[d.x][d.y]) {
				//					if (linkDict[d.x][d.y].type == 0) {
				//						return c(2);
				//					} else {
				//						return c(2);
				//					}
				return compute(Math.abs(d.z));
				//				} else if (linkDict[d.y] && linkDict[d.y][d.x]) {
				//					if (linkDict[d.y][d.x].type == 0) {
				//						return c(2);
				//					} else {
				//						return c(2);
				//					}
				//					return compute(Math.abs(d.z));
				//				} else {
				//					return compute(0);
				//				}
			})
			.on("mousemove", function(d, j) {
				tooltip.style("left", (d3.event.clientX - 30) + "px")
					.style("top", (d3.event.clientY + 13) + "px");
			})
			.on("mouseover", function(d, j) {
				tooltip.style("z-index", 999);
				triangle.attr("opacity", 1);
				//triangle.select("path").attr("fill", compute(Math.abs(d.z)));
				triangle.attr("transform", "translate(1270," + (360 + linear(Math.abs(d.z))) + ")");
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
				//				d3.selectAll(".row text").classed("active", function(d, i) {
				//					return i == p.x;
				//				});
				//				d3.selectAll(".column text").classed("active", function(d, i) {
				//					return i == p.y;
				//				});
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
	svg.attr("transform", "translate(2,0)");
	//autoSize(svg, width, height);
	//svg.attr("","")
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

	//	row.append("text")
	//		.attr("x", -6)
	//		.attr("y", y.rangeBand() / 2)
	//		.attr("dy", ".32em")
	//		.attr("text-anchor", "end")
	//		.style("font-size", "1px")
	//		.text(function(d, i) {
	//			return rowNodes[i].name;
	//		});

	var column = svg.selectAll(".column")
		.data(matrix[0])
		.enter().append("g")
		.attr("class", "column")
		.attr("transform", function(d, i) {
			return "translate(" + y(i) + ")rotate(-90)";
		});

	//	column.append("text")
	//		.attr("x", 6)
	//		.attr("y", y.rangeBand() / 2)
	//		.attr("dy", ".32em")
	//		.attr("text-anchor", "start")
	//		.style("font-size", "1px")
	//		.text(function(d, i) {
	//			return columnNodes[i].name;
	//		});
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
			//			.style("fill-opacity", function(d) {
			//				return d.z;
			//			})
			.style("stroke", function(d) {
				return compute(Math.abs(d.z));
			})
			.style("fill", function(d) {
				//				if (linkDict[d.x] && linkDict[d.x][d.y]) {
				//					if (linkDict[d.x][d.y].type == 0) {
				//						return c(6);
				//					} else if (linkDict[d.x][d.y].type == 1) {
				//						return c(2);
				//					} else if (linkDict[d.x][d.y].type == 2) {
				//						return c(0);
				//					}
				//				}
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
				//				d3.selectAll(".row text").classed("active", function(d, i) {
				//					return i == p.x;
				//				});
				//				d3.selectAll(".column text").classed("active", function(d, i) {
				//					return i == p.y;
				//				});
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
	//autoSize(svg, width, height);
}

//function autoSize(group, width, height) {
//	var realx = group[0][0].getBBox().x;
//	var realy = group[0][0].getBBox().y;
//	var realHeight = group[0][0].getBBox().height;
//	var realWidth = group[0][0].getBBox().width;
//	var heightScale = height / realHeight;
//	var widthScale = width / realWidth;
//	var zoomScale = 0.96;
//	heightScale *= zoomScale;
//	widthScale *= zoomScale;
//	if (heightScale <= widthScale && heightScale < 1) {
//		group.attr("transform", /*"translate(" + ((-realx * heightScale) + (width - realWidth * heightScale) / 2) + "," + ((-realy * heightScale) + (height - realHeight * heightScale) / 2) + ")*/ "scale(" + heightScale + ")");
//	} else if (widthScale <= heightScale && widthScale < 1) {
//		group.attr("transform", /*"translate(" + ((-realx * widthScale) + (width - realWidth * widthScale) / 2) + "," + ((-realy * widthScale) + (height - realHeight * widthScale) / 2) + ")*/ "scale(" + widthScale + ")");
//	} else {
//		//group.attr("transform", "translate(" + (-realx + (width - realWidth) / 2) + "," + (-realy + (height - realHeight) / 2) + ")");
//	}
//}