/**
 * SVG的功能类
 */

/**
 * 获取具有拖动与缩放功能的svg
 * @param {Object} width 宽度
 * @param {Object} height 高度
 * @author Ruitong Chai & Bohao Wang
 * @time 2016/4/22
 * @version 0.0.1
 */
function getSVG(width, height) {
	var drag = d3.behavior.drag().on("drag", move).on("dragstart", movestart);
	var x_dis_start;
	var y_dis_start;
	var threshold = 2;
	var scale_start = 1.0;
	var scale = 1.0
	var x_start;
	var y_start;
	var translate = [event.offsetX, event.offsetY];
	var translate_start = translate;

	function move() {
		var g = d3.select(this);
		var x = d3.event.sourceEvent.clientX;
		var y = d3.event.sourceEvent.clientY;
		var rect_width = d3.select(this).select("rect").attr("width");
		var rect_height = d3.select(this).select("rect").attr("height");
		if (Math.abs(x_dis_start - 0) < threshold) {
			d3.select(this).attr("transform", function(d) {
				scale = (x_start - x + rect_width * scale_start) / (rect_width * scale_start) * scale_start;
				translate = [translate_start[0] - x_start + x, translate_start[1]];
				g.style("cursor", "w-resize");
				return "translate(" + translate + ")" + "scale(" + scale + ")";
			});
		} else if (Math.abs(x_dis_start - rect_width) < threshold) {
			d3.select(this).attr("transform", function(d) {
				scale = (x - x_start + rect_width * scale_start) / (rect_width * scale_start) * scale_start;
				g.style("cursor", "e-resize");
				return "translate(" + translate + ")" + "scale(" + scale + ")";
			});
		} else if (Math.abs(y_dis_start - 0) < threshold) {
			d3.select(this).attr("transform", function(d) {
				scale = (y_start - y + rect_height * scale_start) / (rect_height * scale_start) * scale_start;
				translate = [translate_start[0], translate_start[1] - y_start + y];
				g.style("cursor", "n-resize");
				return "translate(" + translate + ")" + "scale(" + scale + ")";
			});
		} else if (Math.abs(y_dis_start - rect_height) < threshold) {
			d3.select(this).attr("transform", function(d) {
				scale = (y - y_start + rect_height * scale_start) / (rect_height * scale_start) * scale_start;
				g.style("cursor", "s-resize");
				return "translate(" + translate + ")" + "scale(" + scale + ")";
			});
		} else {
			d3.select(this).attr("transform", function(d) {
				translate = [d3.event.x - x_dis_start * scale_start, d3.event.y - y_dis_start * scale_start];
				g.style("cursor", "move");
				return "translate(" + translate + ")" + "scale(" + scale + ")";
			});
		}
	}

	function movestart() {
		x_dis_start = d3.mouse(this)[0];
		y_dis_start = d3.mouse(this)[1];
		scale_start = scale;
		x_start = d3.event.sourceEvent.clientX;
		y_start = d3.event.sourceEvent.clientY;
		translate_start = translate;
	}

	var svg = d3.select("svg").append("svg").append("g").call(drag)
		.attr("transform",
			"translate(" + event.offsetX + "," + event.offsetY + ")")
		.on("mousemove", change_cursor);

	svg.append("rect").attr("x", 0).attr("y", 0).attr(
			"width", width).attr("height", height).attr("stroke", "#03689A")
		.attr("stroke-width", "2").attr("fill", "white")
		.attr("opacity", "0").on("mouseover", function(d) {
			var rect = d3.select(this);
			rect.attr("opacity", "0.8");
		}).on(
			"mouseout",
			function(d, i) {
				d3.select(this).transition().duration(100).attr(
					"opacity", "0");
			});

	function change_cursor() {
		var g = d3.select(this);
		if (Math.abs(d3.mouse(this)[0] - 0) < threshold) {
			g.style("cursor", "w-resize");
		} else if (Math.abs(d3.mouse(this)[0] - g.select("rect").attr("width")) < threshold) {
			g.style("cursor", "e-resize");
		} else if (Math.abs(d3.mouse(this)[1] - 0) < threshold) {
			g.style("cursor", "n-resize");
		} else if (Math.abs(d3.mouse(this)[1] - g.select("rect").attr("height")) < threshold) {
			g.style("cursor", "s-resize");
		} else {
			g.style("cursor", "move");
		}
	}
	svg = svg.append("g");
	return svg;
}


//将demo的函数抽取成addDiv，target为要增加的div的目标div
//var figNum = -1;
//function addDiv(target){
//	//添加一个色块
//	var div_id=new Date().getTime();
//	$('#'+target).append("<div class='fig' id='"+div_id+"'></div>");
//	//编号设置
//	figNum = figNum + 1;
//	temNum = figNum - 1;
//	if(figNum%2==0) { 	//当figNum为奇数
//		$('.fig:eq('+temNum+')').attr('class','fig col-xs-12 col-sm-6 col-md-6 col-lg-6');
//		$('.fig:eq('+figNum+')').attr('class','fig col-xs-12 col-sm-12 col-md-12 col-lg-12');
//	} else { 			//当figNum为偶数
//		$('.fig:eq('+temNum+')').attr('class','fig col-xs-12 col-sm-6 col-md-6 col-lg-6');
//		$('.fig:eq('+figNum+')').attr('class','fig col-xs-12 col-sm-6 col-md-6 col-lg-6');
//	}
//	return div_id;
//}

function getWorkSpace(chartType) {
	var chartId = "chart-" + new Date().getTime();
	//增加div，新的窗口再增加的div中创建
//	var div_id = addDiv('workspace');
//	var chart = d3.select("#"+div_id)
	var chart = d3.select("#workspace")
		.append("div")
		.style("height", "100%")
		.style("width", "100%")
		.style("position", "relative")
		.style("margin-left", "0px")
		.style("margin-right", "0px")
		.style("border", "2px solid #ECECEC")
		.style("z-index", "0")
		.attr("class", "row chart")
		.attr("id", chartId);
	$.get('../assets/configs/chart_icon.xml', function(data) {
		$(data).find('alt').each(function() {
			if ($(this).text() == chartType) {
				var analyzeOpts = [];
				$(this).siblings('analyzeOpt').each(function() {
					analyzeOpts.push($(this).text());
				});
				if (analyzeOpts.length != 0) {
					generateMenu(chart, chartId, analyzeOpts, chartType);
				}
				return false;
			}
		});
	});

	chart.append("div")
		.attr("id", chartId + "-title")
		.style("width", "100%")
		.style("height", "25px")
		.style("background", "#ECECEC")
		.style("text-align", "right")
		.attr("onmousedown", "showMenu(event,this)")
		.append("button")
		.html("&times;")
		.attr("onClick", "closeChart('" + chartId + "');return false;");

	var content = chart.append("div")
		.attr("id", chartId + "-content")
		.style("width", "100%")
		.style("padding", "20px")
		.style("height", "95%")
		.style("background", "white");

	$("#" + chartId).easydrag()
		.setHandler(chartId + "-title");

	var drawPanel = content.append("div")
		.attr("class", "col-xs-9 drawPanel")
		.style("height", "100%")
		.append("svg")
		.style("height", "100%");

	var legendPanel = content.append("div")
		.attr("class", "col-xs-3 legendPanel")
		.style("height", "100%")
		.style("overflow-y", "auto")
		.append("svg")
		.style("height", "100%");
	return [drawPanel, legendPanel, chartId];
}

function removeLegendPanel(workSpace) {
	$(workSpace[1][0][0]).parents(".legendPanel").remove();
	$(workSpace[0][0][0]).parents(".drawPanel")
		.removeClass("col-xs-9")
		.addClass("col-xs-11");
}

/**
 * 将某张图表关闭
 * @param {Object} item button
 */
function closeChart(chartId) {
//	$("#" + chartId).parent().remove();
	$("#" + chartId).remove();
	delete chartDict[chartId];
//	
//	figNum = figNum - 1;
//	if(figNum%2==0) { 	//当figNum为奇数
//		$(".fig").each(function(){
//			$(this).attr('class','fig col-xs-12 col-sm-6 col-md-6 col-lg-6');
//		});
//		$('.fig:eq('+figNum+')').attr('class','fig col-xs-12 col-sm-12 col-md-12 col-lg-12');
//	} else { 			//当figNum为偶数
//		$(".fig").each(function(){
//			$(this).attr('class','fig col-xs-12 col-sm-6 col-md-6 col-lg-6');
//		});
//	}
}

function cleanWorkSpace(workSpace) {
	while (workSpace[0][0][0].firstChild) {
		workSpace[0][0][0].removeChild(workSpace[0][0][0].firstChild);
	}
	while (workSpace[1][0][0].firstChild) {
		workSpace[1][0][0].removeChild(workSpace[1][0][0].firstChild);
	}
}

function generateMenu(target, chartId, analyzeOpts, chartType) {
	var menu = target.append("div")
		.style("width", "100px")
		.style("display", "none")
		.style("position", "absolute")
		.attr("id", chartId + "-menu")
		.attr("class", "menu");
	analyzeOpts.forEach(function(a) {
		if (a == "dimReduct") {
			target.append("div")
				.attr("id", chartId + "-dimReductModal")
				.attr("class", "modal fade")
				.attr("role", "dialog")
				.attr("aria-hidden", "true")
				.html("<div class='modal-dialog'>" + "<div class='modal-content'>" + "<div class='modal-header'>" + "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>" + "<h4 class='modal-title' id='myModalLabel'>降维分析</h4>" + "</div>" + "<div class='modal-body'>" + "<div class='tab-content' style='height: 100%'>" + "<div class='tab-pane active' id='import_tab'>" + "<div class='form-group'>" + "<table>" + "<tr>" + "<td><label>降维算法:</label></td>" + "<td>" + "<select class='form-control' id='" + chartId + "-algorithm'>" + "<option value='PCA'>主成分分析PCA</option>" + "<option value='MDS'>多维尺度分析MDS</option>" + "</select>" + "</td>" + "</tr>" + "<tr>" + "<td></td>" + "</tr>" + "<tr>" + "<td><label>目标维度:&nbsp;</label></td>" + "<td><input type='text' class='form-control' id='" + chartId + "-dimension'></td>" + "</tr>" + "<tr>" + "<td></td>" + "</tr>" + "</table>" + "</div>" + "</div>" + "</div>" + "</div>" + "<div class='modal-footer'>" + "<button type='button'  onClick=\"dimension_reduce('" + chartId + "','" + chartType + "')\" class='btn btn-primary'>确认</button>" + "<button type='button' class='btn btn-default' data-dismiss='modal'>取消</button>" + "</div>" + "</div>" + "</div>");

			menu.append("div")
				.append("a")
				.html("降维分析")
				.attr("onclick", "showDimReductModal(this,'" + chartId + "')");
		} else if (a == "communityDetect") {
			menu.append("div")
				.append("a")
				.html("社团发现")
				.attr("onclick", "communityDetect('" + chartId + "')");

		} else if (a == "topologySimplify") {
			menu.append("div")
				.append("a")
				.html("拓扑简化")
				.attr("onclick", "topologySimplify('" + chartId + "')");
		}
	});
}

function dimension_reduce(chartId, chartType) {
	var algorithm = $('#' + chartId + '-algorithm').val();
	var dimension = $('#' + chartId + '-dimension').val();
	var fileId = window.parent.getFileId();

	$.ajax({
		type: "post",
		url: "/dva-mvn/analize/dimReduction.do",
		dataType: "text",
		data: {
			fileId: fileId,
			algorithm: algorithm,
			dim: dimension
		},
		success: function(data) {
			var result = $.parseJSON(data);
			console.log(result);
			var resultMessage = result.resultMessage;
			if (resultMessage.resultCode == 1) {
				tableList = result.tableList;
			} else {
				alert(resultMessage.resultTips);
			}
		},
		error: function(error) {
			console.log(error);
		}
	});
}

function communityDetect(chartId) {
	var chart = chartDict[chartId];
	var fileId = chart.config.fileId;
	$.ajax({
		type: "post",
		url: "/dva-mvn/analize/communityDetect.do",
		dataType: "text",
		data: {
			fileId: fileId,
			algorithm: "slpa"
		},
		success: function(data) {
			var result = $.parseJSON(data);
			console.log(result);
			var resultMessage = result.resultMessage;
			if (resultMessage.resultCode == 1) {
				chart.config.rawdata = result.tableList;
				chart.setConfiguration(chart.config);
				chart.render();
			} else {
				alert(resultMessage.resultTips);
			}
		},
		error: function(error) {
			console.log(error);
		}
	});
}

function topologySimplify(chartId) {
	var chart = chartDict[chartId];
	var fileId = chart.config.fileId;
	$.ajax({
		type: "post",
		url: "/dva-mvn/analize/topologySimplify.do",
		dataType: "text",
		data: {
			fileId: fileId,
			algorithm: "slpa"
		},
		success: function(data) {
			var result = $.parseJSON(data);
			var resultMessage = result.resultMessage;
			if (resultMessage.resultCode == 1) {
				chart.config.rawdata = result.tableList;
				chart.setConfiguration(chart.config);
				chart.render();
			} else {
				alert(resultMessage.resultTips);
			}
		},
		error: function(error) {
			console.log(error);
		}
	});
}

function showDimReductModal(item, chartId) {
	var menu = $(item).parents(".menu");
	menu.slideUp(100);
	var workspace = $(item).parents("#workspace").children(".chart").each(function(e, item) {
		if ($(item).attr("id") != chartId) {
			$(item).css("z-index", 0);
		}
	});
	$('#' + chartId + '-dimReductModal').css("z-index", parseInt(new Date().getTime()))
		.modal('show');

}

function showMenu(event, item) {
	var menu = $(item).siblings(".menu");
	menu.contextmenu(function() {
		return false;
	});
	menu.parent().contextmenu(function() {
		return false;
	});
	if (event.button == 2) {
		console.log(event)
		menu.css({
			top: event.offsetY,
			left: event.offsetX
		}).slideDown(100).menu();
	} else if (event.button == 0) {
		menu.slideUp(100);
	}
}

/**
 * 生成时间表
 * @param {Object} source 表格源数据，服务器传来的数据中的content字段
 * @param {Object} select 需要选择的字段，不能为集合
 * @param {Object} date 时间字段
 * @param {Object} duplicate 非唯一字段
 * @author Ruitong Chai & Bohao Wang
 * @time 2016/4/22
 * @version 0.0.1
 */

function parseDateTable(source, select, date, duplicate) {
	var duplicateArray = new Array();
	var dateArray = new Array();
	source.forEach(
		function(e) {
			if (dateArray.indexOf(e[date]) == -1) {
				dateArray.push(e[date]);
			}
			if (duplicateArray.indexOf(e[duplicate]) == -1) {
				duplicateArray.push(e[duplicate]);
			}
		}
	);
	var content = new Array();
	dateArray.forEach(function(d) {
		var dic = new Array();
		source.forEach(function(e) {
			if (d == e[date]) {
				dic[e[duplicate]] = e[select];
			}
		});
		content[d] = dic;
	});
	return content;
}

/**
 * 生成图例
 * @param {Object} svg 绘图区
 * @param {Array} measure 度量值名称数组
 * @param {Function} color 取颜色的function
 * @author Ruitong Chai & Bohao Wang
 * @time 2016/4/22
 * @version 0.0.1
 */
function appendLegend(svg, measure, color) {
	while (svg[0][0].firstChild) {
		svg[0][0].removeChild(svg[0][0].firstChild);
	}
	height = (measure.length + 1) * 20 / svg[0][0].clientHeight * 100;

	svg.style("height", height + "%");
	var legend = svg.selectAll(".legend")
		.data(measure)
		.enter().append("g")
		.attr("class", "legend")
		.attr("transform", function(d, i) {
			return "translate(0," + i * 20 + ")";
		});

	legend.append("rect")
		.attr("x", 0)
		.attr("width", 18)
		.attr("height", 18)
		.style("fill", function(d, i) {
			return color(i);
		});

	legend.append("text")
		.attr("x", 20)
		.attr("y", 9)
		.attr("dy", ".35em")
		//.style("text-anchor", "end")
		.text(function(d) {
			return d;
		});
}
/**
 * 复制对象
 * @param {Object} obj
 */
function clone(obj) {
	var o;
	if (typeof obj == "object") {
		if (obj === null) {
			o = null;
		} else {
			if (obj instanceof Array) {
				o = [];
				for (var i = 0, len = obj.length; i < len; i++) {
					o.push(clone(obj[i]));
				}
			} else {
				o = {};
				for (var j in obj) {
					o[j] = clone(obj[j]);
				}
			}
		}
	} else {
		o = obj;
	}
	return o;
}
/**
 * 获取数据中的所有属性值
 * @param {Object} data 原始数据
 * @param {Object} attr 属性字段名
 * @author Ruitong Chai & Bohao Wang
 * @time 2016/4/22
 * @version 0.0.1
 */
function getAttrFromData(data, attr) {
	var dataNames = [];
	data.forEach(function(e) {
		var dataName = "";
		attr.forEach(function(a) {
			dataName += e[a];
			dataName += " ";
		});
		dataNames.push(dataName);
	});
	return dataNames;
}

function category40(i) {
	var c = ["#1f77b4",  "#aec7e8",  "#ff7f0e",  "#ffbb78",  "#2ca02c",  "#98df8a",  "#d62728",  "#ff9896",  "#9467bd",  "#c5b0d5",  "#8c564b",  "#c49c94",  "#e377c2",  "#f7b6d2",  "#7f7f7f",  "#c7c7c7",  "#bcbd22",  "#dbdb8d",  "#17becf",  "#9edae5",  "#637939",  "#5254a3",  "#e6550d",  "#6baed6",  "#b5cf6b",  "#ad494a",  "#393b79",  "#9c9ede",  "#a55194",  "#fdd0a2",  "#de9ed6",  "#c7e9c0", "#d6616b",  "#7b4173",  "#8ca252", "#e7ba52", "#bd9e39",  "#8c6d31",  "#e7969c", "#000000"];
	if (i != undefined && !isNaN(i)) {
		return c[i % c.length];
	} else {
		return c[0];
	}
}

function autoSize(group, workSpace) {
	var realx = group[0][0].getBBox().x;
	var realy = group[0][0].getBBox().y;
	var realHeight = group[0][0].getBBox().height;
	var realWidth = group[0][0].getBBox().width;
	var width = workSpace[0][0][0].clientWidth;
	var height = workSpace[0][0][0].clientHeight;
	var heightScale = height / realHeight;
	var widthScale = width / realWidth;
	var zoomScale = 0.9;
	heightScale *= zoomScale;
	widthScale *= zoomScale;
	if (heightScale < widthScale && heightScale < 1) {
		group.attr("transform", "translate(" + ((-realx * heightScale) + (width - realWidth * heightScale) / 2) + "," + ((-realy * heightScale) + (height - realHeight * heightScale) / 2) + ")scale(" + heightScale + ")");
	} else if (widthScale < heightScale && widthScale < 1) {
		group.attr("transform", "translate(" + ((-realx * widthScale) + (width - realWidth * widthScale) / 2) + "," + ((-realy * widthScale) + (height - realHeight * widthScale) / 2) + ")scale(" + widthScale + ")");
	} else {
		group.attr("transform", "translate(" + (-realx + (width - realWidth) / 2) + "," + (-realy + (height - realHeight) / 2) + ")");
	}
}