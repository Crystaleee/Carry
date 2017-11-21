$(document).ready(function () {
    chartMatch();
    getFiles();
});

/*-- Chart Select--*/
var menu_display = function (num) {
    var timeOut = setTimeout(function () {
        $(".menu_content" + num).css("display", "none");
    }, 2000);
    for (var i = 1; i <= 9; i++) {
        $(".menu_content" + i).css("display", "none");
    }
    $(".menu_content" + num).css("display", "block");
    $(".menu_content" + num).css("margin-top", num * 33 - 28 + "px");

    $(".menu_content" + num).mouseenter(function () {
        clearTimeout(timeOut);
        $(".menu_content" + num).mouseleave(function () {
            $(".menu_content" + num).css("display", "none");
        });
    });
}
$(".menu1").mouseenter(function () {
    menu_display(1);
});
$(".menu2").mouseenter(function () {
    menu_display(2);
});
$(".menu3").mouseenter(function () {
    menu_display(3);
});
$(".menu4").mouseenter(function () {
    menu_display(4);
});
$(".menu5").mouseenter(function () {
    menu_display(5);
});
$(".menu6").mouseenter(function () {
    menu_display(6);
});
$(".menu7").mouseenter(function () {
    menu_display(7);
});
$(".menu8").mouseenter(function () {
    menu_display(8);
});
$(".menu9").mouseenter(function () {
    menu_display(9);
});
$(".menu10").mouseenter(function () {
    menu_display(10);
});

$('#svg').mousedown(function (event) {
    if (event.button == 2) {
        console.log(event)
        $('#menu').css({
            top: event.offsetY,
            left: event.offsetX
        }).slideDown(100).menu();

    } else if (event.button == 0) {
        $('#menu').slideUp(100);
    }
});

$(function () {
    $("[data-toggle='popover']").popover();
});

$(document).ready(function () {
    //计算窗口高度
    var w_height = $(window).height() - 51;
    $(".work_panel").css("minHeight", w_height);
    $("#work_panel_whole").css("minHeight", w_height);
    $("#workspace").css("minHeight", w_height);
});

//function show_analysis() {
//	$('#menu').slideUp(100);
//	$(event.srcElement).attr("data-toggle", "modal");
//	$("#analysis_tab").modal("toggle");
//}

//function dimension_reduce() {
//	var algorithm = $('#algorithm').val();
//	var dimension = $('#dimension').val();
//	var fileId = window.parent.getFileId();
//
//	$.ajax({
//		type : "post",
//		url : "/dva-mvn/analize/dimReduction.do",
//		dataType : "text",
//		data : {
//			fileId : fileId,
//			algorithm : algorithm,
//			dim : dimension
//		},
//		success : function(data) {
//			var result = $.parseJSON(data);
//			console.log(result);
//			var resultMessage = result.resultMessage;
//			if (resultMessage.resultCode==1) {
//				clearSVG();
//				window.parent.fileContent = result.tableList[0];
//				console.log(fileContent);
//			} else {
//				alert(resultMessage.resultTips);
//			}
//		},
//		error : function(error) {
//			console.log(error);
//		}
//	});
//}

