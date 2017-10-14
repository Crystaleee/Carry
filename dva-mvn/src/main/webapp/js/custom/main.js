/**
 * 
 */
var tableList;
var currentFileId;

function getFiles() {
	$
			.ajax({
				type : "get",
				url : "/dva-mvn/file/queryFile.do",
				dataType : "text",
				success : function(data) {

					var resultMap = $.parseJSON(data);
					if (resultMap.resultMessage.resultCode == 1) {
						var fileList = resultMap.fileList;

						for (var i = 0; i < fileList.length; i++) {
							var filename = fileList[i].fileName;
							var fileId = fileList[i].fileId;
							var list = $("#file_list");
							var liString = "<a href='#' class='list-group-item center' onClick=\"getData('"
									+ fileId + "')\">" + filename + "</a>";
							list.append(liString);

						}
					}

					$('.list-group > a').click(function(e) {
						e.preventDefault();
						$('.list-group > a').removeClass('active');
						$(this).addClass('active');
					});

				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					switch (XMLHttpRequest.status) {
					case 401:
						window.location.href = "/dva-mvn/html/login.html";
						break;
					case 403:
						window.location.href = "/dva-mvn/html/403.html";
						break;
					}
				}
			});
}

function getData(fileId) {
	console.log("aaaaaaaaaaaaaaaaaaaa")

	currentFileId = fileId;
	// get the data
	$.ajax({
		type : "post",
		url : "/dva-mvn/file/requestTable.do",
		dataType : "text",
		data : {
			fileId : fileId
		},
		success : function(data) {
			var result = $.parseJSON(data);
			console.log(result);
			var resultMessage = result.resultMessage;
			if (resultMessage.resultCode == -4) {
				alert(resultMessage.resultTips);
			} else {
				tableList = result.tableList;
			}

			$("#headType_list").empty();
			var attr_col = [], meas_col = [];
			measureTemp = [];
			attrTemp = [];
			for ( var keys in tableList[0]["headType"]) {
				console.log(keys);
				if (tableList[0]["headType"][keys] == 'attr') {
					attr_col.push(keys);
				} else if (tableList[0]["headType"][keys] == 'measure') {
					meas_col.push(keys);
				}
				var list = $("#headType_list");
				var liString = "<a href='#' id='" + keys
						+ "'class='list-group-item center'>" + keys + "</a>";
				list.append(liString);
			}

			chartMatch(attr_col, meas_col);

			$("#collapseTwo").collapse('show');

			$('#headType_list > a').click(function(e) {
				e.preventDefault();
				var myClass = $(this).attr("class");
				var theClass = "active";
				if (myClass.indexOf(theClass) >= 0) {
					console.log("you")

					$(this).removeClass('active');

					var keys = $(this).attr("id");
					console.log(keys);
					if (tableList[0]["headType"][keys] == 'attr') {
						arraryDel(attrTemp, keys)

					} else if (tableList[0]["headType"][keys] == 'measure') {
						arraryDel(measureTemp, keys)

					}
					console.log("attrTemp:" + attrTemp);
					console.log("measureTemp:" + measureTemp);
					chartMatch(attrTemp, measureTemp);

				} else {
					console.log("meiyou")

					$(this).addClass('active');

					var keys = $(this).attr("id");
					console.log(keys);
					if (tableList[0]["headType"][keys] == 'attr') {

						attrTemp.push(keys)
					} else if (tableList[0]["headType"][keys] == 'measure') {
						measureTemp.push(keys)
					}
					console.log("attrTemp:" + attrTemp);
					console.log("measureTemp:" + measureTemp);
					chartMatch(attrTemp, measureTemp);

				}

			});

			// 创建数据库
			tableList.forEach(function(table, i) {
				if (!filedConfig(attr_col, meas_col, [ "source", "target" ])) {
					if (table.title == "") {
						table.title = fileId + "_" + i;
					}
					if (table.polymerize == undefined) {
						table.polymerize = {};
					}
					for (key in table.headType) {
						if (table.headType[key] == "attr") {
							table.polymerize[key] = "sum";
						}
					}
					createTable(table.title, table.headType);
					insertTable(table.title, table.content);
					showTable(selectAll(table.title));
				}

			});
			selectors = {};
			console.log("attrTemp:" + attrTemp);

		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			switch (XMLHttpRequest.status) {
			case 401:
				window.location.href = "/dva-mvn/html/login.html";
				break;
			case 403:
				window.location.href = "/dva-mvn/html/403.html";
				break;
			}
		}
	});
}

function transferTotalData() {
	if (tableList == "" || tableList == null) {
		alert("please select file firstly!!!");
	} else {
		return tableList;
	}
}

function getFileId() {
	return currentFileId;
}

/**
 * 
 * 
 */
function Ddrap(event) {

	console.log(event.srcElement.id);
	event.dataTransfer.setData("Text", event.srcElement.id);

}

function Ddrop(event) {
	event.preventDefault();
	var keys = event.dataTransfer.getData("Text");
	event.target.appendChild(document.getElementById(keys));
	console.log(keys);

	if (tableList[0]["headType"][keys] == 'attr') {
		attrTemp.push(keys)
	} else if (tableList[0]["headType"][keys] == 'measure') {
		measureTemp.push(keys)
	}
	console.log("attrTemp:" + attrTemp);
	console.log("measureTemp:" + measureTemp);
	chartMatch(attrTemp, measureTemp);
	// 调用匹配函数

}

function arraryDel(array, delName) {

	for (var i = 0; i < array.length; i++) {

		var nameTemp = array[i];
		if (nameTemp === delName) {
			array.splice(i, 1);
		}
	}
}

function Ldrop(event) {
	event.preventDefault();
	var keys = event.dataTransfer.getData("Text");
	event.target.parentNode.appendChild(document.getElementById(keys));
	console.log(keys);
	if (tableList[0]["headType"][keys] == 'attr') {
		arraryDel(attrTemp, keys)
	} else if (tableList[0]["headType"][keys] == 'measure') {
		arraryDel(measureTemp, keys)
	}
	console.log("attrTemp:" + attrTemp);
	console.log("measureTemp:" + measureTemp);
}

function DallowDrop(event) {
	event.preventDefault();
}

function chartMatch(attr_col, measure_col) {
	$.get('../assets/configs/chart_icon.xml', function(data) {
		addElem('#popover-content_zhu', $(data).find('BarCharts'), attr_col,
				measure_col);
		addElem('#popover-content_pie', $(data).find('PieCharts'), attr_col,
				measure_col);
		addElem('#popover-content_line', $(data).find('LineCharts'), attr_col,
				measure_col);
		addElem('#popover-content_scatter', $(data).find('ScatterCharts'),
				attr_col, measure_col);
		addElem('#popover-content_mj', $(data).find('AreaCharts'), attr_col,
				measure_col);
		addElem('#popover-content_radar', $(data).find('RadarCharts'),
				attr_col, measure_col);
		addElem('#popover-content_yb', $(data).find('GaugeCharts'), attr_col,
				measure_col);
		addElem('#popover-content_net', $(data).find('NetCharts'), attr_col,
				measure_col);
		addElem('#popover-content_high', $(data).find('MultiDimension'),
				attr_col, measure_col);
	});
}

function addElem(container, elements, attr_col, measure_col) {
	$(container).empty();
	$(elements).children().each(function() {
		var fieldRequired = [];
		$(this).find('fieldRequired').each(function() {
			fieldRequired.push($(this).text());
		});
		var configs = {
			name : $(this).attr('name'),
			imgSrc : $(this).find('img').text(),
			blackImg : $(this).find('blackImg').text(),
			alt : $(this).find('alt').text(),
			attr_col : $(this).find('attr_col').text(),
			meas_col : $(this).find('meas_col').text(),
			container : container,
			fieldRequired : fieldRequired
		};

		var divElem = createImgElem(configs, attr_col, measure_col);

		var divElemFigName = document.createElement("p");
		$(divElemFigName).addClass('figName');
		$(divElemFigName).html(configs.name);

		$(container).append(divElem);
		$(divElem).append(divElemFigName);
	});
}

function createImgElem(configs, attr, measure) {
	var divElem = $('<div class="fig"></div>');
	var attr_col = typeof attr !== 'undefined' ? attr.length : -1;
	var measure_col = typeof measure !== 'undefined' ? measure.length : -1;
	var imgElem = undefined;
	// console.log(configs.attr_col, attr_col, configs.meas_col, measure_col);
	if (filedConfig(attr, measure, configs.fieldRequired)
			&& (configs.attr_col == attr_col || configs.attr_col == '*')
			&& (configs.meas_col == measure_col || configs.meas_col == '*')) {
		// console.log('match success');
		imgElem = $('<img draggable="true" height=70px width=70px ondragstart="drag(event)"/>');
		$(imgElem).attr('src', configs.imgSrc);
	} else {
		imgElem = $('<img draggable="false" height=70px width=70px/>');
		$(imgElem).attr('src', configs.blackImg);
	}
	$(imgElem).attr('alt', configs.alt);

	$(imgElem).appendTo(divElem);

	return divElem;
}
/**
 * 验证字段是否匹配
 * 
 * @param {Object}
 *            attr
 * @param {Object}
 *            measure
 * @param {Object}
 *            fieldRequired
 */
function filedConfig(attr, measure, fieldRequired) {
	var fieldConfigFlag = true;
	if (fieldRequired.length != 0) {
		// 记录必须的字段是否出现
		var fieldFlags = [];
		fieldRequired.forEach(function() {
			fieldFlags.push(false);
		});
		if (attr != null) {
			attr.forEach(function(a) {
				for (var i = 0; i < fieldRequired.length; i++) {
					if (a == fieldRequired[i]) {
						fieldFlags[i] = true;
					}
				}
			});
		}
		if (measure != null) {
			measure.forEach(function(a) {
				for (var i = 0; i < fieldRequired.length; i++) {
					if (a == fieldRequired[i]) {
						fieldFlags[i] = true;
					}
				}
			});
		}
		fieldFlags.forEach(function(e) {
			if (!e) {
				fieldConfigFlag = false;
			}
		});
	}
	return fieldConfigFlag;
}

function change2D3(event) {
//	console.log("drop:");
//	console.log(drop);
//	$("#workspace").unbind("drop");
//	$("#workspace").bind("drop", drop);
    var workspace = document.getElementById("workspace");
    workspace.outerHTML = "<div id='workspace' ondrop=\"drop(event)\" ondragover=\"allowDrop(event)\" style=\"z-index: 20;\"></div>";
    $("#d3").removeClass();
    $("#d3").addClass("changeButtonActive");
    $("#echarts").removeClass();
    $("#echarts").toggleClass("changeButton");
//	workspace = document.getElementById("workspace");
//	console.log("workspace in change2D3:");
//	console.log(workspace);
}

//鍒囨崲鎴怑charts
function change2Echarts(event) {
//	console.log("drop_E:");
//	console.log(drop_E);
//	$("#workspace").unbind("drop");
//	$("#workspace").bind("drop", drop_E);
    var workspace = document.getElementById("workspace");
    workspace.outerHTML = "<div id='workspace' ondrop=\"drop_E(event)\" ondragover=\"allowDrop(event)\" style=\"z-index: 20;\"></div>";
    $("#d3").removeClass();
    $("#d3").toggleClass("changeButton");
    $("#echarts").removeClass();
    $("#echarts").toggleClass("changeButtonActive");
    //workspace = document.getElementById("workspace");
    //console.log("workspace in change2Echarts:");
    //console.log(workspace);
}