/**
 * 力导向图
 */
function ForceDirect(workSpace, data) {
	var force = new Force(workSpace, data);
	chartDict[workSpace[2]] = force;
	force.render();
}

function Force(workSpace, rawdata) {
	var that = this;
	this.config = {
		//必须参数
		rawdata: undefined, // 原数据
		workSpace: undefined, //绘图区域

		//非必需参数
		color: undefined,
		charge: undefined, //电荷数
		linkDistance: undefined, //边长
		fileId: undefined, //源文件ID

		//通过计算得到的参数
		links: undefined,
		nodes: undefined,
		force: undefined, //力导向生成器
		renderTime: undefined, //渲染时机
	};
	configuration(workSpace, rawdata);

	function configuration(workSpace, rawdata) {
		that.config.rawdata = rawdata;
		that.config.workSpace = workSpace;
		that.config.charge = -120;
		that.config.linkDistance = 20;
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
		that.config.force = calculateForce();
		that.config.renderTime = calculateRenderTime();
		if(that.config.nodes.length<50){
			that.config.charge = -500;
			that.config.linkDistance = 90;
		}
	}
	this.render = function() {
		cleanWorkSpace(that.config.workSpace);
		var svg = that.config.workSpace[0].append("g");
		//绘制边
		var link = svg.append("g")
			.selectAll(".link")
			.data(that.config.links)
			.enter().append("path")
			.attr("class", "link")
			.style("stroke-width", function(d) {
				if (d.value != null) {
					return Math.sqrt(d.value);
				} else {
					return 1;
				}
			});
		//绘制节点
		var node = svg.selectAll(".node")
			.data(that.config.nodes)
			.enter().append("circle")
			.attr("class", "node")
			.attr("r", function(d) {
				if (d.value != null) {
					return Math.sqrt(d.value);
				} else {
					return 5;
				}
			})
			.style("fill", function(d) {
				if (d.group != null) {
					return that.config.color(d.group);
				} else {
					return that.config.color(1);
				}
			});
		//绘制名称
		node.append("title")
			.text(function(d) {
				return d.name;
			});

		//运动
		that.config.force.on(that.config.renderTime, function() {
			link.attr("x1", function(d) {
					return d.source.x;
				})
				.attr("y1", function(d) {
					return d.source.y;
				})
				.attr("x2", function(d) {
					return d.target.x;
				})
				.attr("y2", function(d) {
					return d.target.y;
				})
				.attr("d", linkArc);
			node.attr("cx", function(d, i) {
					return d.x;
				})
				.attr("cy", function(d, i) {
					return d.y;
				});

			//修正位置偏差
			autoSize(svg, workSpace);
		});
	}

	function linkArc(d) {
		var dx = d.target.x - d.source.x,
			dy = d.target.y - d.source.y,
			dr = Math.sqrt(dx * dx + dy * dy);
		return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
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

	function calculateForce() {
		var svg = that.config.workSpace[0];
		removeLegendPanel(that.config.workSpace);
		var width = svg[0][0].clientWidth;
		var height = svg[0][0].clientHeight;

		var force = d3.layout.force()
			.charge(that.config.charge)
			.linkDistance(that.config.linkDistance)
			.size([width, height]);
		force.nodes(that.config.nodes)
			.links(that.config.links)
			.start();
		return force;
	}

	function calculateRenderTime() {
		if (that.config.links.length < 2000) {
			return "tick";
		} else {
			return "end";
		}
	}
}