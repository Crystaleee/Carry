/**
 * 
 */
function changeKaptcha(node) {
	// 用于点击时产生不同的验证码
	node.src = "/dva-mvn/kaptcha/getKaptcha.do?time=" + new Date().getTime();
}

function signUp() {
	window.location.href = "html/signUp.html"
}



function login() {
	var userId = $('#userId_L').val();
	var passWord = $('#password_L').val();
	var kaptcha = $('#kaptcha').val();
	var rememberMe = $("#remember").get(0).checked;

	$.ajax({
		type : "post",
		url : "/dva-mvn/user/login.do",
		dataType : "text",
		data : {
			userId : userId,
			password : passWord,
			rememberme : rememberMe,
			kaptcha : kaptcha
		},
		success : function(data) {
			var result = $.parseJSON(data);
			console.log(result);

			if (result.resultCode == 1) {
				window.location.href = "/dva-mvn/html/success.html"
			} else {
				alert(result.resultTips);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.readyState + XMLHttpRequest.status
					+ XMLHttpRequest.responseText);
			console.log("error");
			console.log(textStatus);
		}
	});
}