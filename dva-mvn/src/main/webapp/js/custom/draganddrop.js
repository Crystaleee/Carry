var chartDict = {};

function allowDrop(event) {
	event.preventDefault();
}

function drag(event) {
	event.dataTransfer.setData("chart_type", event.srcElement.alt);
}

function getResultFromData(data, measure, attr) {
    res = [];
    data.forEach(function(d) {
        tmp = {};
        if (measure) {
            measure.forEach(function(e){
                tmp[e] = d[e];
            });
        }
        if (attr) {
            attr.forEach(function(e) {
                tmp[e] = d[e];
            });
        }
        res.push(tmp);
    });
    return res;
}

function drop_E(event) {
    event.preventDefault();
    var chartType = event.dataTransfer.getData("chart_type");
    var data = clone(transferTotalData());
    //console.log("data in drop_E:");
    //console.log(data);
    if(data != null && data != "" && chartType != null && chartType != "") {
        var measure = measureTemp;
        var attr = attrTemp;
        try {
            var result = executeVisSql(measure, attr, data[0].title);
        } catch(e) {

        }
        var workSpace = getWorkSpace_E(chartType);
        if (!result) {
            result = getResultFromData(data[0].content, measure, attr);
            //console.log("when result is undefined, get result from data:");
            //console.log(result);
        }
        switch(chartType) {
            case 'StackBar': // 鍫嗙Н鏉″舰鍥�
                StackBar_E(workSpace, result, attr[0], measure);
                break;
            case 'BasicFunnel':  //婕忔枟鍥�
                BasicFunnel_E(workSpace, result, attr, measure);
                break;
            case 'BasicHist':
                BasicHist_E(workSpace, result, attr[0], measure);
                break;
            case 'StackHist':
                StackHist_E(workSpace, result, attr[0], measure);
                break;
            case 'BasicBar':
                BasicBar_E(workSpace, result, attr[0], measure);
                break;
            case 'PairedBars':
                PairedBars_E(workSpace, result, attr[0], measure);
                break;
            case 'BasicPie':
                BasicPie_E(workSpace, result, attr[0], measure);
                break;
            case 'BasicDoughnut':
                BasicDoughnut_E(workSpace, result, attr[0], measure);
                break;
            case 'NightingaleRoseDiagram':
                NightingaleRoseDiagram_E(workSpace, result, attr[0], measure);
                break;
            case 'BasicLine':
                BasicLine_E(workSpace, result, attr, measure);
                break;
            case 'StackLine':
                StackLine_E(workSpace, result, attr, measure);
                break;
            case 'BasicScatter':
                BasicScatter_E(workSpace, result, attr, measure);
                break;
            case 'BasicBubble':
                BasicBubble_E(workSpace, result, attr[0], measure[0]);
                break;
            case 'BasicBubble_Three':
                BasicBubble_E_THREE(workSpace, result, attr[0], measure);
                break;
            case 'BasicRadar':
                BasicRadar_E(workSpace, result, attr, measure);
                break;
            case 'BasicDash':
                BasicDash_E(workSpace, result, attr, measure);
                break;
            case 'BasicArea':
                BasicArea_E(workSpace, result, attr, measure);
                break;
            case 'StackArea':
                StackArea_E(workSpace, result, attr, measure);
                break;
            case 'PercentageStackGraph':
                PercentageStackGraph_E(workSpace, result, attr, measure);
                break;
            default:
                break;
        }
    }
}

function getWorkSpace_E(chartType) {
	var chartId = "chart-" + new Date().getTime();
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

	return chartId + "-content";
}

function drop(event) {
	event.preventDefault();
	var chartType = event.dataTransfer.getData("chart_type");
	console.log("Im here111!")
	var data = clone(transferTotalData());
	if(data != null && data != "" && chartType != null && chartType != "") {
		var measure = measureTemp;
		var attr = attrTemp;
		try {
			var result = executeVisSql(measure, attr, data[0].title);
		} catch(e) {

		}
		var workSpace = getWorkSpace(chartType);
		console.log("Im here222!")
		switch(chartType) {
			// 统计数据
			case 'BasicHist': // 标准柱形图
				BasicHist(workSpace, result, attr, measure);
				break;
			case 'StackHist': // 堆积柱形图
				StackHist(workSpace, result, attr, measure);
				break;
			case 'BasicLine': // 标准折线图
				BasicLine(workSpace, result, attr, measure);
				break;
			case 'StackLine': // 堆积折线图
				StackLine(workSpace, result, attr, measure);
				break;
			case 'BasicBar': // 标准条形图
				BasicBar(workSpace, result, attr[0], measure);
				break;
			case 'PairedBars': // 旋风条形图
				PairedBars(workSpace, result, attr[0], [measure[0], measure[1]]);
				break;
			case 'StackBar': // 堆积条形图
				StackBar(workSpace, result, attr[0], measure);
				break;
			case 'BasicScatter': // 标准散点图
				BasicScatter(workSpace, result, attr, measure);
				break;
			case 'TimeCoorScatter': // 时间坐标散点图
				TimeCoorScatter(workSpace, result, attr, measure);
				break;
			case 'TimelineScatter': // 时间轴散点
				TimelineScatter(workSpace, result, attr, measure);
				break;
			case 'BasicBubble': // 标准气泡图
				BasicBubble(workSpace, result, attr[0], measure[0]);
				break;
			case 'BasicArea': // 标准面积图
				BasicArea(workSpace, result, attr, measure);
				break;
			case 'StackArea': // 堆积面积图
				StackArea(workSpace, result, attr, measure);
				break;
			case 'BasicPie': // 标准饼图
				BasicPie("Default", workSpace, result, attr, measure[0]);
				break;
			case 'TimelinePie': // 时间轴饼图
				TimelinePie(workSpace, result, attr[1], attr[0], measure[0]);
				break;
			case 'BasicDoughnut': // 标准环形图
				BasicPie("Doughnut", workSpace, result, attr, measure[0]);
				break;
			case 'NightingaleRoseDiagram': // 南丁格尔玫瑰图
				BasicPie("NightingaleRose", workSpace, result, attr, measure[0]);
				break;
			case 'BasicRadar': // 标准雷达图
				BasicRadar(workSpace, result, attr, measure);
				break;
			case 'BasicDash': // 标准仪表盘
				BasicDash(workSpace, result, attr, measure);
				break;
			case 'MultiDash': // 多仪表盘
				MultiDash(workSpace, result, attr, measure);
				break;
			case 'TreeMap': // 矩形树图
				TreeMap(workSpace, result, attr, measure);
				break;

				// 网络数据
			case 'Force': // 力导引图
				ForceDirect(workSpace, data);
				break;
			case 'Chord': // 弦图
				Chord(workSpace, data);
				break;
			case 'NetMatrix': // 相邻矩阵
				NetMatrix(workSpace, data);
				break;

				// 高维数据
			case 'Star': // 星坐标
				Star(workSpace, result, measure);
				break;
			case 'ScatterMatrix': // 散点图矩阵
				ScatterPlotMatrix(workSpace, result, measure);
				break;
			case 'Parallel': // 平行坐标
				Parallel(workSpace, result, measure);
				break;
			default:
				break;
		}
	}
}

function executeVisSql(measure, attr, tableName) {
	var sqlStr = "select ";
	var polymerize = tableList[0].polymerize[attr[0]];
	attr.forEach(function(a, i) {
		if(measure.length > 0) {
			sqlStr += encodeKeyToId(a) + ",";
		} else if(i == attr.length - 1) {
			sqlStr += encodeKeyToId(a) + " ";
		}
	});
	measure.forEach(function(m, i) {
		if(i != measure.length - 1) {
			sqlStr += polymerize + "(" + encodeKeyToId(m) + "),";
		} else {
			sqlStr += polymerize + "(" + encodeKeyToId(m) + ") ";
		}
	});
	sqlStr += "from (" + parseSqlOfSelectors() + ") group by ";
	attr.forEach(function(a, i) {
		if(i != attr.length - 1) {
			sqlStr += encodeKeyToId(a) + ",";
		} else {
			sqlStr += encodeKeyToId(a);
		}
	});
	var result = executeSingleSql(sqlStr);
	var objectList = [];
	result.values.forEach(function(d) {
		var obj = {};
		d.forEach(function(o, i) {
			if(i < attr.length) {
				obj[attr[i]] = o;
			} else {
				obj[measure[i - attr.length]] = o;
			}
		});
		objectList.push(obj);
	});
	return objectList;
}