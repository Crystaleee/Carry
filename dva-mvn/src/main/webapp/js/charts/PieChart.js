/**
 * 饼图：标准饼图，时间轴饼图，标准环形图，南丁格尔图
 */

/**
 * 绘制标准饼图/环图/南丁格尔玫瑰图
 * 
 * @author Ruitong Chai & Bohao Wang
 * @time 2016/4/22
 * @version 0.0.1
 */
function BasicPie(pieStyle, workSpace, data, attrSelect, measureSelect) {
	//方式一：
	var pie = new Pie(pieStyle, workSpace, data, attrSelect, measureSelect);
	//方式二：
	//	var config = {
	//		rawdata: data, // 原数据
	//		attr: attrSelect, // 属性值
	//		measure: measureSelect, // 度量值
	//		workSpace: workSpace, //
	//		pieStyle: pieStyle,
	//	};
	//	var pie = new Pie();
	//	pie.setConfiguration(config);
	pie.render();
}

/**
 * 饼图“类”
 * @author Ruitong Chai & Bohao Wang/hanxiaotian
 * @time 2016/5/9
 * @version 0.0.1
 */
function Pie(pieStyle, workSpace, rawdata, attrSelect, measureSelect) {
	var that = this;
	this.config = {
		//必须参数
		rawdata: undefined, // 原数据
		attr: undefined, // 属性值
		measure: undefined, // 度量值
		workSpace: undefined, //绘图区域
		pieStyle: undefined, //饼图风格

		//非必需参数
		color: undefined,

		//通过计算得到的参数
		linearScale: undefined,
		data: undefined, // 处理后可供展示的数据
		innerRadius: undefined,
		outerRadius: undefined,
		arc: undefined,
	};
	configuration(pieStyle, workSpace, rawdata, attrSelect, measureSelect);
	// 配置函数
	function configuration(pieStyle, workSpace, rawdata, attrSelect, measureSelect) {
		that.config.rawdata = rawdata;
		that.config.attr = attrSelect;
		that.config.measure = measureSelect;
		that.config.pieStyle = pieStyle;
		that.config.workSpace = workSpace;
		if (pieStyle != undefined && workSpace != undefined && rawdata != undefined && attrSelect != undefined && measureSelect != undefined) {
			makeConfig();
		}
		that.config.color = d3.scale.category20();
	}
	
	this.setConfiguration = function(newConfig) {
		that.config = newConfig;
		makeConfig();
	}

	function makeConfig() {
		that.config.data = calculatePieData(that.config.rawdata, that.config.measure);
		that.config.outerRadius = calculateOuterRadius(that.config.workSpace);
		if ("Doughnut" == that.config.pieStyle) {
			that.config.innerRadius = that.config.outerRadius / 2;
		} else if ("NightingaleRose" == that.config.pieStyle) {
			that.config.innerRadius = that.config.outerRadius / 4;
		} else {
			that.config.innerRadius = 1;
		}
		that.config.arc = d3.svg.arc().innerRadius(that.config.innerRadius).outerRadius(that.config.outerRadius);
		that.config.linearScale = calculateLinearScale();
		if (that.config.pieStyle == "NightingaleRose") {
			that.render = NightingaleRoseRender;
		} else {
			that.render = basicRender;
		}
	}

	//数据预处理
	function calculatePieData() {
		var pie = d3.layout.pie()
			.value(function(d) {
				return d[that.config.measure]
			})
			.sort(null);
		var pieData = pie(that.config.rawdata);
		return pieData;
	}

	function calculateLinearScale() {
		var maxData = d3.max(that.config.rawdata, function(d) {
			return parseFloat(d[that.config.measure]);
		});
		var linear = d3.scale.linear()
			.domain([0, 1.1 * maxData])
			.range([that.config.innerRadius, that.config.outerRadius]);
		return linear;
	}

	function calculateOuterRadius() {
		var svg = that.config.workSpace[0];
		var width = svg[0][0].clientWidth;
		var height = svg[0][0].clientHeight;
		return Math.min(width, height) / 2;
	}

	// 标准图表渲染函数

	function basicRender() {
		// 准备提示框
		var svg = that.config.workSpace[0];
		var chartNode = $(svg[0][0]).parents(".chart");
		var tooltip = d3.select(chartNode[0]).append("div")
			.attr("class", "mytooltip")
			.style("opacity", "0.0");
		// 准备group
		var arcs = svg.selectAll("g.arc").data(that.config.data).enter().append("g").attr(
			"class", "arc").attr("transform",
			"translate(" + that.config.outerRadius + "," + that.config.outerRadius + ")");
		//绘制扇形
		arcs.append("path")
			.attr("fill", function(d, i) {
				return that.config.color(i);
			})
			.attr("d", that.config.arc.outerRadius(that.config.innerRadius))
			.on("mouseover", function(d) {
				var tips = "";
				that.config.attr.forEach(function(e) {
					tips += (e + ":");
					tips += (d.data[e] + "<br/>");
				});
				tips += (that.config.measure + ":");
				tips += (d.data[that.config.measure] + "<br/>");
				tooltip.html(tips)
					.style("left", (d3.event.clientX - 30) + "px")
					.style("top", (d3.event.clientY + 15) + "px")
					.style("opacity", "0.6");
			})
			.on("mousemove", function(d) {
				tooltip.style("left", (d3.event.clientX - 30) + "px")
					.style("top", (d3.event.clientY + 15) + "px");
			})
			.on("mouseout", function(d) {
				tooltip.style("opacity", 0.0);
			})
			.transition().delay(function(d, i) {
				return i * Math.random() * 20;
			})
			.duration(1000)
			.ease("bounce")
			.attr("d", that.config.arc.outerRadius(that.config.outerRadius));
		appendLegend(that.config.workSpace[1], getAttrFromData(that.config.rawdata, that.config.attr), that.config.color);
	}
	//南丁格尔渲染函数
	function NightingaleRoseRender() {
		// 准备提示框
		var svg = that.config.workSpace[0];
		var chartNode = $(svg[0][0]).parents(".chart");
		var tooltip = d3.select(chartNode[0]).append("div")
			.attr("class", "mytooltip")
			.style("opacity", "0.0");
		// 准备group
		var arcs = svg.selectAll("g.arc").data(that.config.data).enter().append("g").attr(
			"class", "arc").attr("transform",
			"translate(" + that.config.outerRadius + "," + that.config.outerRadius + ")");
		arcs.append("path")
			.on("mouseover", function(d, i) {
				d3.select(this)
					.transition()
					.duration(500)
					.ease("bounce")
					.attr("d", function(d) {
						that.config.arc.outerRadius(that.config.linearScale(d.value * 1.1));
						return that.config.arc(d)
					})
				var tips = "";
				that.config.attr.forEach(function(e) {
					tips += (e + ":");
					tips += (d.data[e] + "<br/>");
				});
				tips += (that.config.measure + ":");
				tips += (d.data[that.config.measure] + "<br/>");
				tooltip.html(tips)
					.style("left", (d3.event.clientX - 30) + "px")
					.style("top", (d3.event.clientY + 15) + "px")
					.style("opacity", "0.6");
			})
			.on("mousemove", function(d) {
				tooltip.style("left", (d3.event.clientX - 30) + "px")
					.style("top", (d3.event.clientY + 15) + "px");
			})
			.on("mouseout", function(d, i) {
				d3.select(this)
					.transition()
					.duration(500)
					.ease("bounce")
					.attr("d", function(d) {
						that.config.arc.outerRadius(that.config.linearScale(d.value));
						return that.config.arc(d)
					})
				tooltip.style("opacity", 0.0);
			})
			.attr("fill", function(d, i) {
				return that.config.color(i);
			})
			.attr("d", function(d) {
				that.config.arc.outerRadius(that.config.innerRadius);
				return that.config.arc(d)
			})
			.transition().delay(function(d, i) {
				return i * 50;
			})
			.duration(500)
			.ease("bounce")

		.attr("d", function(d) {
			that.config.arc.outerRadius(that.config.linearScale(d.value));
			return that.config.arc(d)
		});
		appendLegend(that.config.workSpace[1], getAttrFromData(that.config.rawdata, that.config.attr), that.config.color);
	}
}

/**
 * 绘制时间轴饼图
 * 
 * @author Ruitong Chai & Bohao Wang
 * @time 2016/4/22
 * @version 0.0.1
 */
function TimelinePie(workSpace, data, date, attrSelect, measureSelect) {
	var data = parseDateTable(data, measureSelect, date, attrSelect);
	var svg = workSpace[0];
	var width = svg[0][0].clientWidth;
	var height = svg[0][0].clientHeight;
	var radius = Math.min(width, height) / 2;
	svg.append("g").attr("class", "slices").attr("transform", "translate(" + width / 2 + "," + ((height / 2) - 20) + ")");

	var pie = d3.layout.pie().value(function(d) {
		return d.value;
	}).sort(null);;

	var arc = d3.svg.arc().outerRadius(radius * 0.8).innerRadius(0);

	var key = function(d) {
		return d.data.label;
	};

	var color = d3.scale.category20();
	var dateAxis = [];
	var attrAxis = [];
	var i = 0;
	for (key in data) {
		dateAxis.push(key);
		if (i == 0) {
			for (key in data[key]) {
				attrAxis.push(key);
			}
		}
		i++;
	}

	function getData(date) {
		return attrAxis.map(function(label) {
			return {
				label: label,
				value: data[date][label]
			}
		});
	}

	change(getData(dateAxis[0]));
	var parseDate = d3.time.format("%Y-%m-%d").parse

	var maxDate = d3.max(dateAxis, function(d) {
		return parseDate(d);
	})
	var minDate = d3.min(dateAxis, function(d) {
		return parseDate(d);
	});

	var x = d3.time.scale().domain(
		[minDate.setFullYear(minDate.getFullYear() - 1),
			maxDate.setFullYear(maxDate.getFullYear() + 1)
		]).range(
		[0, width - 100]);

	var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(d3.time.year, 1);
	var timeLine = svg.append("g").attr("class", "x timeLineAxis").attr(
		"transform",
		"translate(" + 50 + "," + (height - 20) + ")").call(xAxis);

	timeLine.selectAll("circle").data(dateAxis).enter().append("circle").attr(
		"class", "unfocus-circle").attr("cx", function(d) {
		return x(parseDate(d));
	}).attr("cy", 0).attr("r", 7).on("click", function(d, i) {
		changeCircle(x(parseDate(d)));
		change(getData(d));
	}).on("mouseover", function() {
		d3.select(this).style("cursor", "default");
	});

	var focusedTime = timeLine.append("circle").attr("class", "focus-circle")
		.attr("cx", x(parseDate(dateAxis[0]))).attr("cy", 0).attr("r", 7);

	function changeCircle(position) {
		focusedTime.transition().duration(1000).attr("cx", position);
	}
	var chartNode = $(svg[0][0]).parents(".chart");
	var tooltip = d3.select(chartNode[0]).append("div")
		.attr("class", "mytooltip")
		.style("opacity", "0.0");

	function change(data) {

		var legends = [];
		data.forEach(function(e) {
			legends.push(e.label);
		});
		appendLegend(workSpace[1], legends, color);
		/* ------- PIE SLICES ------- */
		var slice = svg.select(".slices")
			.selectAll("path.slice")
			.data(pie(data));

		slice.enter()
			.insert("path")
			.style("fill", function(d, i) {
				return color(i);
			})
			.attr("class", "slice")
			.on("mouseover", function(d) {
				var tips = "";
				tips += (attrSelect + ":");
				tips += (d.data.label + "<br/>");
				tips += (measureSelect + ":");
				tips += (d.data.value + "<br/>");
				tooltip.html(tips)
					.style("left", (d3.event.clientX - 30) + "px")
					.style("top", (d3.event.clientY + 15) + "px")
					.style("opacity", "0.6");
			})
			.on("mousemove", function(d) {
				tooltip.style("left", (d3.event.clientX - 30) + "px")
					.style("top", (d3.event.clientY + 15) + "px");
			})
			.on("mouseout", function(d) {
				tooltip.style("opacity", 0.0);
			});

		slice.transition().duration(1000).attrTween("d", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				return arc(interpolate(t));
			};
		})

		slice.exit().remove();
	};
}