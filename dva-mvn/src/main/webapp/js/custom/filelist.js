/**
 * js for the filelist page
 */

/**
 * ajax request filelist
 */
function queryFile() {
	$.ajax({
		type : "get",
		url : "/dva-mvn/file/queryFile.do",
		dataType : "text",
		success : function(data) {
			var resultMap = $.parseJSON(data);
			if (resultMap.resultMessage.resultCode == 1) {
				showFiles(resultMap.fileList);
			} else {
				// jump to login
			}
		},
		error : function(error) {
			console.log("error");
		}
	});
}

/**
 * ajax upload new file
 */
function uploadFile() {
	var fileObj = $('#inputfile')[0].files[0];
	var fileName = $('#fileName').val();
	var form = new FormData();
	form.append("file", fileObj);
	form.append("fileName", fileName);

	$.ajax({
		type : 'post',
		url : '/dva-mvn/file/upload.do',
		cache : false,
		data : form,
		processData : false,
		contentType : false,
		success : function(result) {
			if (result.resultCode == 1) {
				console.log("upload success");
				location.reload();
			} else {
				alert(result.resultTips);
			}
		},
		error : function(error) {
			console.log(error);
		}
	});
}

function deleteFile(fileId, node) {
	$.ajax({
		type : "post",
		url : "/dva-mvn/file/deleteFile.do",
		dataType : "text",
		data : {
			fileId : fileId,
		},
		success : function(data) {
			var result = $.parseJSON(data);
			console.log(result);

			if (result.resultCode == 1) {
				console.log("upload success");
				$(node).parent().parent().remove();
			} else {
				alert(result.resultTips);
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

/**
 * show the filelist on the datatable
 */
function showFiles(fileList) {
	var fileArray = new Array();
	for (var i = 0; i < fileList.length; i++) {
		fileArray[i] = [
				fileList[i].fileName,
				fileList[i].updateTime,
				fileList[i].extensions,
				"<button class='btn-warning' onclick=deleteFile('"
						+ fileList[i].fileId + "',this)>Delete</a>" ];
	}
	$('#example').dataTable({
		"data" : fileArray,
		"columns" : [ {
			"title" : "File Name"
		}, {
			"title" : "Latest Update Time"
		}, {
			"title" : "File Extensions"
		}, {
			"title" : "Operations"
		} ]
	});
}