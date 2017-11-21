/**
 * Created by storm on 2016/6/1.
 */

var joinTag = 0;

var tableLeft, tableRight, listLeft, listRight, keyLeft = [], keyRight = [], keyList1 = [], keyList2 = [];

var joinResult;

function initJoinModal() {
    console.log('initJoinModal');
    $.ajax({
        type: "get",
        url: "/dva-mvn/file/queryFile.do",
        dataType: "text",
        success: function (data) {
            var resultMap = $.parseJSON(data);
            if (resultMap.resultMessage.resultCode == 1) {
                var fileList = resultMap.fileList;

                var list = $("#file_list1");
                list.empty();
                for (var i = 0; i < fileList.length; i++) {
                    var filename = fileList[i].fileName;
                    var fileId = fileList[i].fileId;
                    var liString = "<a href='#' class='list-group-item center' onClick=\"getJoindata('" + fileId + "')\">" + filename + "</a>";
                    list.append(liString);
                }
            }

            $('#file_list1 > a').click(function (e) {
                if (joinTag == 0)
                    tableLeft = $(this).html();
                else if (joinTag == 1)
                    tableRight = $(this).html();

                e.preventDefault();
                if (joinTag == 2)
                    $('#file_list1 > a').removeClass('active');
                if (joinTag != 2)
                    $(this).addClass('active');
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
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

function getJoindata(fileId) {
    currentFileId = fileId;
    // get the data
    $.ajax({
        type: "post",
        url: "/dva-mvn/file/requestTable.do",
        dataType: "text",
        data: {
            fileId: fileId
        },
        success: function (data) {
            var result = $.parseJSON(data);
            //console.log(result);
            var resultMessage = result.resultMessage;
            if (resultMessage.resultCode == -4) {
                alert(resultMessage.resultTips);
            } else {
                tableList = result.tableList;
            }
            console.log("test");
            console.log(tableList);
            if (joinTag == 0) {
                listLeft = clone(tableList);
            }
            else if (joinTag == 1) {
                listRight = clone(tableList);
            }

            console.log(listLeft);
            console.log(listRight);

            var headType_list = "#headType_list1",
                headType = '#headType_list1 > a';
            if (joinTag == 0) {
                headType_list = "#headType_list1";
                headType = '#headType_list1 > a';
            }
            else if (joinTag == 1) {
                headType_list = "#headType_list2";
                headType = '#headType_list2 > a';
            }
            else if (joinTag == 2) {
                $("#headType_list1").empty();
                $("#headType_list2").empty();
                headType_list = "";
                headType = "";
            }
            $(headType_list).empty();

            for (var keys in tableList[0]["headType"]) {
                var list = $(headType_list);
                var liString = "<a href='#' id='" + keys + "'class='list-group-item center'>" + keys + "</a>";
                list.append(liString);
            }

            if (joinTag == 0) {
                $("#collapseTwo1").collapse('show');
                joinTag = 1;
            }
            else if (joinTag == 1) {
                $("#collapseThree").collapse('show');
                joinTag = 2;
            }
            else if (joinTag == 2) {
                joinTag = 0;
            }


            $(headType)
                .click(
                function (e) {
                    e.preventDefault();
                    var myClass = $(this).attr("class");
                    var listjoinTag = $(this).parent().attr("id");

                    var theClass = "active";
                    if (myClass.indexOf(theClass) >= 0) {

                        $(this).removeClass('active');

                        var keys = $(this).attr("id");
                        if (listjoinTag == "headType_list1") {
                            arraryDel(keyList1, keys)


                        } else if (listjoinTag == "headType_list2") {
                            arraryDel(keyList2, keys)

                        }
                        //  console.log("keyList1:" + keyList1);
                        //  console.log("keyList2:" + keyList2);

                    } else {
                        $(this).addClass('active');

                        var keys = $(this).attr("id");
                        if (listjoinTag == "headType_list1") {
                            keyList1.push(keys)
                        } else if (listjoinTag == "headType_list2") {
                            keyList2.push(keys)
                        }
                        //  console.log("keyList1:" + keyList1);
                        //  console.log("keyList2:" + keyList2);
                    }

                });

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
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

function tableJoin(joinTag) {
    console.log("tableName1:" + tableLeft);
    console.log("tableName2:" + tableRight);
    console.log(listLeft[0]["headType"]);
    console.log(listRight[0]["headType"]);
    console.log("keyList1:" + keyList1);
    console.log("keyList2:" + keyList2);

    createTable(tableLeft, listLeft[0]["headType"]);
    createTable(tableRight, listRight[0]["headType"]);
    insertTable(tableLeft, listLeft[0].content);
    insertTable(tableRight, listRight[0].content);
    if (joinTag == 0)
        joinResult = innerjoin(tableLeft, tableRight, listLeft[0]["headType"], listRight[0]["headType"], keyList1, keyList2);
    else if (joinTag == 1)
        joinResult = leftjoin(tableLeft, tableRight, listLeft[0]["headType"], listRight[0]["headType"], keyList1, keyList2);
    else
        joinResult = leftjoin(tableRight, tableLeft, listRight[0]["headType"], listLeft[0]["headType"], keyList2, keyList1);
}

function joinFinish() {
    $("#joinModal").modal('hide');
    showTable(joinResult);
}
