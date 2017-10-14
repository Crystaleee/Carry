/**
 * Created by storm on 2016/5/30.
 */
var url = window.location.href;
index = url.indexOf("flag");
if (index != -1) {
    var start = url.indexOf("A");
    var fileId = url.substring(start + "A".length + 1);
    console.log(fileId);

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


function handleFile(e) {
    $("#file-contents").remove();
    $("#file-contents2").remove();
    $("#here").append("<div id=\"file-contents\" class=\"dataTable\"></div>");
    $("#here2").append("<div id=\"file-contents2\" class=\"dataTable\"></div>");
    var f = e.target.files[0];
    console.log(f);
    var f2 = e.target.files[1];
    console.log(f2);

    var textType = f.name.split('.')[1];
    $("#file-name").val(f.name.split('.')[0]);

    if (textType.toUpperCase() == "CSV") {
        readCSV(f,1);
    } else if (textType.toUpperCase() == "XLS"||textType.toUpperCase() == "XLSX") {
        readExcel(f,1);
    } else if (textType.toUpperCase() == "TXT") {
        readCSV(f,1);
    }

    var textType1 = f2.name.split('.')[1];
    $("#file-name").val(f2.name.split('.')[0]);

    if (textType1.toUpperCase() == "CSV") {
        readCSV(f2,2);
    } else if (textType1.toUpperCase() == "XLS"||textType1.toUpperCase() == "XLSX") {
        readExcel(f2,2);
    } else if (textType1.toUpperCase() == "TXT") {
        readCSV(f2,2);
    }


}

function readCSV(f,i) {
    var fileName = f.name;
    var reader = new FileReader();
    reader.onload = function (e) {
        var content = e.target.result;
        var file = parseCSV2Table(fileName, content);
        showFileInTable(file,i)
    };
    reader.readAsText(f, 'gbk');
}

function readExcel(f,i) {
    var fileName = f.name;
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {
            type: 'binary'
        });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        var content = XLSX.utils.sheet_to_csv(worksheet);

        var file = parseCSV2Table(fileName, content);
        showFileInTable(file,i);
    };
    reader.readAsBinaryString(f);
}

function parseCSV2Table(fileName, content) {
    var result = $.csv.toArrays(content);
    var files = {};
    files.name = fileName;
    files.headers = result[0];
    files.columns = [];
    console.log("hhhhhhhhhhhhhh:"+result[1]);
    result[1].forEach(function (elem) {
        if ($.isNumeric(elem)) {
            files.columns.push({
                type: "numeric",
                format: "0.0000"
            });
        } else if (moment(elem).isValid()) {
            files.columns.push({
                type: "date",
                format: "MM/DD/YYYY"
            });
        } else {
            files.columns.push({
                type: "text"
            });
        }
    });

    files.contents = result.slice(1);

    return files;
}

function showFileInTable(file,i) {
    console.log(file.contents);
    console.log(file.headers);
    if(i==1){
        var location = $("#file-contents");
    }
    else{
        var location = $("#file-contents2");
    }

    location.handsontable({
        data: file.contents,
        stretchH: 'all',
        width: 800,
        height: 400,
        colHeaders: file.headers,
       // rowHeaders:true,
        columns: file.columns,
        columnSorting: true,
        sortIndicator: true,
        contextMenu: true,
        afterGetColHeader: function (col, TH) {
            console.log("col:"+col);
            var instance = this;
            console.log("type:" + file.columns[col].type);
            console.log(  file.columns[col]);
            var menu = buildMenu(file.columns[col].type);
            var button = buildButton();
            addButtonMenuEvent(button, menu);
            Handsontable.Dom.addEvent(menu, 'click', function (event) {
                if (event.target.nodeName == 'LI') {
                    setColumnType(file.columns, col, event.target.data['colType'], instance);
                }
            });
            if (TH.firstChild.lastChild.nodeName === 'BUTTON') {
                TH.firstChild.removeChild(TH.firstChild.lastChild);
            }
            TH.firstChild.appendChild(button);
            TH.style['white-space'] = 'normal';
        }
    });

    colHeaderRename();
}

function addButtonMenuEvent(button, menu) {
    Handsontable.Dom.addEvent(button, 'click', function (event) {
        var changeTypeMenu, position, removeMenu;
        document.body.appendChild(menu);
        event.preventDefault();
        event.stopImmediatePropagation();
        changeTypeMenu = document.querySelectorAll('.changeTypeMenu');
        for (var i = 0, len = changeTypeMenu.length; i < len; i++) {
            changeTypeMenu[i].style.display = 'none';
        }
        menu.style.display = 'block';
        position = button.getBoundingClientRect();
        menu.style.top = (position.top + (window.scrollY || window.pageYOffset)) + 2 + 'px';
        menu.style.left = (position.left) + 'px';
        removeMenu = function (event) {
            if (event.target.nodeName == 'LI' && event.target.parentNode.className.indexOf('changeTypeMenu') !== -1) {
                if (menu.parentNode) {
                    menu.parentNode.removeChild(menu);
                }
            }
        };
        Handsontable.Dom.removeEvent(document, 'click', removeMenu);
        Handsontable.Dom.addEvent(document, 'click', removeMenu);
    });
}

function buildMenu(activeCellType) {
    var menu = document.createElement('UL'),
        types = ['text', 'numeric', 'date'],
        item;
    menu.className = 'changeTypeMenu';
    for (var i = 0, len = types.length; i < len; i++) {
        item = document.createElement('LI');
        if ('innerText' in item) {
            item.innerText = types[i];
        } else {
            item.textContent = types[i];
        }
        item.data = {
            'colType': types[i]
        };
        if (activeCellType == types[i]) {
            item.className = 'active';
        }
        menu.appendChild(item);
    }
    return menu;
}

function buildButton() {
    var button = document.createElement('BUTTON');
    button.innerHTML = '\u25BC';
    button.className = 'changeType';
    return button;
}

function setColumnType(columns, i, type, instance) {
    columns[i].type = type;
    instance.updateSettings({
        columns: columns
    });
    instance.validateCells(function () {
        instance.render();
    });
}

function colHeaderRename() {
    var hotInstance = $("#file-contents").handsontable('getInstance');
    var session;
    $("th").dblclick(function (e) {
        e.preventDefault();
        var a = hotInstance.getSelected();
        var b = hotInstance.getColHeader(a[1], a[2]);
        var headers = hotInstance.getColHeader();
        var value;
        if ($("th").find("input[name='id']").val()) {
            value = $("th").find("input[name='id']").val();
            headers[session] = value;
            session = a[1];
            headers[a[1]] = "<input name='id' type='text' value=" + b + "/>";
            hotInstance.updateSettings({
                colHeaders: headers
            });
        } else {
            session = a[1];
            headers[a[1]] = "<input name='id' type='text' value=" + b + "/>";
            hotInstance.updateSettings({
                colHeaders: headers
            });
            $(this).find("input[name='id']").focus();
        }
    });
    $("th").change(function (e) {
        e.preventDefault();
        var a = hotInstance.getSelected();
        var b = hotInstance.getColHeader(a[1], a[2]);
        var headers = hotInstance.getColHeader();
        var value = $(this).find("input[name='id']").val();
        headers[a[1]] = value;
        hotInstance.updateSettings({
            colHeaders: headers
        });
    });
}

function parseFile2Json(fileName, headers, headersType, content) {
    return {
        title: fileName,
        headers: headers,
        headersType: headersType,
        content: content
    };
}

function JudgeUserName(){
	var fileName = $("#file-name").val();
	console.log("11111!")
    $.ajax({
        type:"post",
        url:'/dva-mvn/file/verifyFileName.do',
        cache: false,
        data: {fileName: fileName},
        beforeSend:function(XMLHttpRequest)
        {
            $("#showResult").text("正在查询...");
        },
        success:function(result)
        {
        	console.log(result)
            $("#showResult").text(result.resultTips);
        	console.log("44444!")
            $("#showResult").css("color","red");
        },
        complete:function(XMLHttpRequest,textStatus)
        {
            //隐藏正在查询图片
        },
        error:function(error)
        {
            console.log(error);
        }
    });
}

function JudgeFormula(){
    var hotInstance = $("#file-contents").handsontable('getInstance');

    var selectedRange = hotInstance.getSelected();
    console.log(selectedRange);
    console.log(hotInstance.getSelectedRange());

    var fileName = $("#file-name").val();
    var headers = hotInstance.getColHeader();
    var headersType = [];
    for (var i = 0; i < headers.length; ++i) {
        var type = {text: "attr", numeric: "measure", date: 'date'};
        headersType.push(type[hotInstance.getDataType(1, i)]);
    }
    var data = hotInstance.getData();


    var jsonFile = parseFile2Json(fileName, headers, headersType, data);

    console.log(jsonFile);
    var file = JSON.stringify([jsonFile]);
    console.log("im here!"+file);

    $.ajax({
        type: 'post',
        url: '/dva-mvn/preprocess/preprocess.do',
        cache: false,
        data: {
            jsonFiles:file,
            action: $("#file-formula").val(),
            text:   $("#file-data").val()
        },
        success: function (result) {

        	console.log(result);

            if ( result.operate <=14 && (result.operate>=1) ) {
                $("#file-contents").remove();
                $("#here").append("<div id=\"file-contents\" class=\"dataTable\"></div>");

                var hotInstance = $("#file-contents").handsontable('getInstance');
                var output = JSON.parse(result.output);

                var files = {};
                files.name = file.title;

                files.headers = output.headers;
                files.columns = [];
                files.content = output.content;
                var line = result.firstline.substring(1, result.firstline.length - 1);
                console.log("headers:"+output.headers);
                console.log("content:"+output.content);

                var line1 = JSON.parse(line);
                line1.forEach(function (elem) {
                    if ($.isNumeric(elem)) {
                        files.columns.push({
                            type: "numeric",
                            format: "0.0000"
                        });
                    } else if (moment(elem).isValid()) {
                        files.columns.push({
                            type: "date",
                            format: "MM/DD/YYYY"
                        });
                    } else {
                        files.columns.push({
                            type: "text"
                        });
                    }
                });
                for(var i=0; i<=files.columns.length-1;i++){
                    console.log(i+" :"+files.columns[i].type);
                }


                files.contents = output.content.slice(0);
              // hotInstance.updateSettings({
                //    data: JSON.parse("[[\"e\",1,2,3],[\"f\",4,5,6],[\"g\",7,8,10]]"),
                //	data: files.content,
                  //  colHeaders: files.headers,
                    //columns: file.columns
                //});
                //hotInstance.validateCells(function () {
                  //  hotInstance.render();
                //});
                showFileInTable(files,1);
                console.log("upload success");
                $("#Result").text("公式合法");

            } else {
                $("#Result").text("输入有误，请重新输入");
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}


function uploadFile() {
    var hotInstance = $("#file-contents").handsontable('getInstance');

    var selectedRange = hotInstance.getSelected();
    console.log(selectedRange);
    console.log(hotInstance.getSelectedRange());

    var fileName = $("#file-name").val();
    var headers = hotInstance.getColHeader();
    var headersType = [];
    for (var i = 0; i < headers.length; ++i) {
        var type = {text: "attr", numeric: "measure", date: 'date'};
        headersType.push(type[hotInstance.getDataType(1, i)]);
    }
    var data = hotInstance.getData();
    

    var jsonFile = parseFile2Json(fileName, headers, headersType, data);
    
    console.log(jsonFile);

    $.ajax({
        type: 'post',
        url: '/dva-mvn/file/uploadJson.do',
        cache: false,
        data: {
            fileName: fileName,
            jsonFiles: JSON.stringify([jsonFile])
        },
        success: function (result) {
            if (result.resultCode == 1) {
                console.log("upload success");
                window.location.href = "/dva-mvn/html/main.html";
            } else {
                alert(result.resultTips);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function connectDB() {
    var dbType = $("#dbType").val(),
        ipAddress = $("#ipAddress").val(),
        port = $("#port").val(),
        dbName = $("#dbName").val(),
        userName = $("#userName").val(),
        password = $("#password").val();

    $.ajax({
        type: "post",
        url: '/dva-mvn/db/getTables.do',
        cache: false,
        data: {
            dbType: dbType,
            ipAddress: ipAddress,
            port: port,
            dbName: dbName,
            userName: userName,
            password: password
        },
        success: function (result) {
            var resultMessage = result.resultMessage;
            if (resultMessage.resultCode == 1) {
                var tables = result.tables;
                $("#dbConnect").modal('hide');
                $("#db a:first").tab('show');
                var dbTables = $("#dbTables");
                tables.forEach(function (table) {
                    var tableEle = $('<label><input type="checkbox" name="table" value="' + table + '">' + table + '</label>');
                    dbTables.append(tableEle);
                });
            } else {
                alert(resultMessage.resultTips);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function saveTables() {
    var tables = [];
    $('input[name="table"]:checked').each(function () {
        tables.push($(this).val());
    });

    $.ajax({
        type: "post",
        url: '/dva-mvn/db/saveTables.do',
        cache: false,
        data: {
            dbType: $("#dbType").val(),
            ipAddress: $("#ipAddress").val(),
            port: $("#port").val(),
            dbName: $("#dbName").val(),
            tables: tables,
            userName: $("#userName").val(),
            password: $("#password").val()
        },
        success: function (result) {
            console.log(result);
        },
        error: function (error) {
            alert(error);
        }
    });
}

function joinTable(action) {
    var hotInstance1 = $("#file-contents").handsontable('getInstance');
    var hotInstance2 = $("#file-contents2").handsontable('getInstance');

    var selectedRange1 = hotInstance1.getSelected();
    var selectedRange2 = hotInstance2.getSelected();

    console.log(selectedRange1);
    console.log(selectedRange2);

    console.log(hotInstance1.getSelectedRange());
    console.log(hotInstance2.getSelectedRange());

    var fileName = $("#file-name").val();

    var headers1 = hotInstance1.getColHeader();
    var headers2 = hotInstance2.getColHeader();

    var headersType1 = [];
    var headersType2 = [];

    for (var i = 0; i < headers1.length; ++i) {
        var type = {text: "attr", numeric: "measure", date: 'date'};
        headersType1.push(type[hotInstance1.getDataType(1, i)]);
    }
    for (var i = 0; i < headers2.length; ++i) {
        var type = {text: "attr", numeric: "measure", date: 'date'};
        headersType2.push(type[hotInstance2.getDataType(1, i)]);
    }

    var data1 = hotInstance1.getData();
    var data2 = hotInstance2.getData();


    var jsonFile1 = parseFile2Json(fileName, headers1, headersType1, data1);
    var jsonFile2 = parseFile2Json(fileName, headers2, headersType2, data2);

    console.log(jsonFile1);
    console.log(jsonFile2);

    $.ajax({
        type: 'post',
        url: '/dva-mvn/preprocess/connect.do',
        cache: false,
        data: {
            data1: JSON.stringify([jsonFile1]),
            data2: JSON.stringify([jsonFile2]),
            action: action
        },
        success: function (result) {
            $("#file-contents").remove();
            $("#file-contents2").remove();
            $("#here").append("<div id=\"file-contents\" class=\"dataTable\"></div>");
            console.log(result);


                var hotInstance = $("#file-contents").handsontable('getInstance');
                var output = JSON.parse(result.output);

                var files = {};
                files.name = fileName;

                files.headers = output.headers;
                files.columns = [];
                files.content = output.content;
                var line = result.firstline.substring(1, result.firstline.length - 1);
                console.log("headers:"+output.headers);
                console.log("content:"+output.content);

                var line1 = JSON.parse(line);
                line1.forEach(function (elem) {
                    if ($.isNumeric(elem)) {
                        files.columns.push({
                            type: "numeric",
                            format: "0.0000"
                        });
                    } else if (moment(elem).isValid()) {
                        files.columns.push({
                            type: "date",
                            format: "MM/DD/YYYY"
                        });
                    } else {
                        files.columns.push({
                            type: "text"
                        });
                    }
                });
                for(var i=0; i<=files.columns.length-1;i++){
                    console.log(i+" :"+files.columns[i].type);
                }


                files.contents = output.content.slice(0);
                showFileInTable(files,1);



        },
        error: function (error) {
            console.log(error);
        }
    });
}
