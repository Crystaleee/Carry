/**
 * 相邻矩阵布局
 * @param {Object} workSpace
 * @param {Object} data
 */
function NetMatrix(workSpace, data) {
	var netMatrix = new NetMatrixLayout(workSpace, data);
	chartDict[workSpace[2]] = netMatrix;
	netMatrix.render();
}

function NetMatrixLayout(workSpace, rawdata) {
	var that = this;
	this.config = {
		//必须参数
		rawdata: undefined, // 原数据
		workSpace: undefined, //绘图区域

		//非必需参数
		fileId: undefined, //源文件ID
		orders: undefined, //排序方法
		//通过计算得到的参数
		links: undefined,
		nodes: undefined,
		matrix: undefined
	};
	configuration(workSpace, rawdata);

	function configuration(workSpace, rawdata) {
		that.config.rawdata = rawdata;
		that.config.workSpace = workSpace;
		that.config.color = category40;
		that.config.fileId = getFileId();
		if (workSpace != undefined && rawdata != undefined) {
			makeConfig();
		}
	}

	this.setConfiguration = function(newConfig) {
		that.config = newConfig;
		makeConfig();
	}

	function makeConfig() {
		that.config.links = calculateLinks();
		that.config.nodes = calculateNodes();
		that.config.matrix = calculateMatrix(that.config.nodes, that.config.links);
		var n = that.config.nodes.length;
		that.config.orders = {
			name: d3.range(n).sort(function(a, b) {
				return d3.ascending(that.config.nodes[a].name, that.config.nodes[b].name);
			}),
			group: d3.range(n).sort(function(a, b) {
				return that.config.nodes[b].group - that.config.nodes[a].group;
			})
		};
	}

	function calculateLinks() {
		that.config.rawdata[0].content.forEach(function(e) {
			e.source = parseInt(e.source);
			e.target = parseInt(e.target);
			e.value = parseFloat(e.value);
		});
		var links = clone(that.config.rawdata[0].content);
		return links;
	}

	function calculateNodes() {
		var maxIndex = 0;
		var indexs = [];
		that.config.rawdata[0].content.forEach(function(e) {
			indexs.push(e.target);
			indexs.push(e.source);
		});
		maxIndex = d3.max(indexs);
		var nodes = [];
		if (that.config.rawdata[1] != null) {
			nodes = that.config.rawdata[1].content;
			nodes.forEach(function(e) {
				e.group = parseInt(e.group);
			});
			if (nodes.length < (maxIndex + 1)) {
				nodes = [];
				for (var i = 0; i <= maxIndex; i++) {
					nodes.push({
						name: i
					});
				}
			}
		} else {
			for (var i = 0; i <= maxIndex; i++) {
				nodes.push({
					name: i
				});
			}
		}
		return nodes;
	}

	function calculateMatrix(nodes, links) {
		removeLegendPanel(that.config.workSpace);
		var matrix = new Array();
		nodes.forEach(function(node, i) {
			node.index = i;
			node.count = 0;
			matrix[i] = d3.range(nodes.length).map(function(j) {
				return {
					x: j,
					y: i,
					z: 0
				};
			});
		});

		links.forEach(function(link) {
			if (link.value == undefined||isNaN(link.value)) {
				link.value = 1;
			}
			matrix[link.source][link.target].z += link.value;
			matrix[link.target][link.source].z += link.value;
			matrix[link.source][link.source].z += link.value;
			matrix[link.target][link.target].z += link.value;
			nodes[link.source].count += link.value;
			nodes[link.target].count += link.value;
		});
		return matrix;
	}

	this.render = function() {
		var width = workSpace[0][0][0].clientWidth;
		cleanWorkSpace(that.config.workSpace);
		var x = d3.scale.ordinal().rangeBands([0, width]),
			z = d3.scale.linear().domain([0, 4]).clamp(true),
			c = d3.scale.category20().domain(d3.range(20));
		if (that.config.nodes[0].group != undefined) {
			x.domain(that.config.orders.group);
		} else {
			x.domain(that.config.orders.name);
		}
		var svg = that.config.workSpace[0].append("g");
		svg.append("rect")
			.attr("class", "background")
		var row = svg.selectAll(".row")
			.data(that.config.matrix)
			.enter().append("g")
			.attr("class", "row")
			.attr("transform", function(d, i) {
				return "translate(0," + x(i) + ")";
			})
			.each(row);

		row.append("line")
			.attr("x2", width);

		row.append("text")
			.attr("x", -6)
			.attr("y", x.rangeBand() / 2)
			.attr("dy", ".32em")
			.attr("text-anchor", "end")
			.text(function(d, i) {
				return that.config.nodes[i].name;
			});

		var column = svg.selectAll(".column")
			.data(that.config.matrix)
			.enter().append("g")
			.attr("class", "column")
			.attr("transform", function(d, i) {
				return "translate(" + x(i) + ")rotate(-90)";
			});

		column.append("line")
			.attr("x1", -width);

		column.append("text")
			.attr("x", 6)
			.attr("y", x.rangeBand() / 2)
			.attr("dy", ".32em")
			.attr("text-anchor", "start")
			.text(function(d, i) {
				return that.config.nodes[i].name;
			});

		function row(row) {
			var cell = d3.select(this).selectAll(".cell")
				.data(row.filter(function(d) {
					return d.z;
				}))
				.enter().append("rect")
				.attr("class", "cell")
				.attr("x", function(d) {
					return x(d.x);
				})
				.attr("width", x.rangeBand())
				.attr("height", x.rangeBand())
				.style("fill-opacity", function(d) {
					return z(d.z);
				})
				.style("fill", function(d) {
					return that.config.nodes[d.x].group == that.config.nodes[d.y].group ? c(that.config.nodes[d.x].group) : null;
				})
		}
		autoSize(svg, workSpace);
	}
}