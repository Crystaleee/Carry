jQuery(document)
    .ready(
    function () {
        /*
         * Fullscreen background
         */
        // $.backstretch("../static/img/signUp_background.jpg");
        $('#top-navbar-1').on('shown.bs.collapse', function () {
            $.backstretch("resize");
        });
        $('#top-navbar-1').on('hidden.bs.collapse', function () {
            $.backstretch("resize");
        });

        /*
         * Form
         */
        $('.registration-form fieldset:first-child').fadeIn('slow');

        $(
            '.registration-form input[type="text"], .registration-form input[type="password"], .registration-form textarea')
            .on('focus', function () {
                $(this).removeClass('input-error');
            });

        // 输入验证
        $('#userId')
            .on(
            'blur',
            function () {
                var node = $(this);
                var userId = $('#userId').val();
                if (userId != "" && isUserName(userId)) {
                    $
                        .ajax({
                            type: "post",
                            url: "/dva-mvn/signUp/userNameValidate.do",
                            dataType: "text",
                            data: {
                               UserId: userId,
                            },
                            success: function (data) {
                                var result = $
                                    .parseJSON(data);
                                if (result.resultCode == 1) {
                                    node
                                        .removeClass('input-error');
                                    node
                                        .addClass('input-success');
                                } else {
                                    node
                                        .removeClass('input-success');
                                    node
                                        .addClass('input-error');
                                }
                            },
                            error: function (XMLHttpRequest,
                                             textStatus,
                                             errorThrown) {
                                alert(XMLHttpRequest.readyState
                                    + XMLHttpRequest.status
                                    + XMLHttpRequest.responseText);
                                console
                                    .log("error");
                                console
                                    .log(textStatus);
                            }
                        });
                } else {
                    node.removeClass('input-success');
                    node.addClass('input-error');
                }
            });

        $('#password').on('blur', function () {
            var password = $('#password').val();
            if (checkStrong(password) >= 2) {
                $(this).removeClass('input-error');
                $(this).addClass('input-success');
            } else {
                $(this).removeClass('input-success');
                $(this).addClass('input-error');
            }
        });

        $('#repeatPassword')
            .on(
            'blur',
            function () {
                var repeatPassword = $(
                    '#repeatPassword').val();
                var password = $('#password').val();
                if (repeatPassword != ""
                    && password == repeatPassword) {
                    $(this).removeClass('input-error');
                    $(this).addClass('input-success');
                } else {
                    $(this)
                        .removeClass(
                        'input-success');
                    $(this).addClass('input-error');
                }
            });

        $('#name').on('blur', function () {
            var name = $('#name').val();
            if (name != "") {
                $(this).removeClass('input-error');
                $(this).addClass('input-success');
            } else {
                $(this).removeClass('input-success');
                $(this).addClass('input-error');
            }
        });

        $('#email')
            .on(
            'blur',
            function () {
                var node = $(this);
                var email = $('#email').val();
                if (isEmail(email)) {
                    $
                        .ajax({
                            type: "post",
                            url: "/dva-mvn/signUp/emailValidate.do",
                            dataType: "text",
                            data: {
                                Email: email,
                            },
                            success: function (data) {
                                var result = $
                                    .parseJSON(data);
                                if (result.resultCode == 1) {
                                    node
                                        .removeClass('input-error');
                                    node
                                        .addClass('input-success');
                                } else {
                                    node
                                        .removeClass('input-success');
                                    node
                                        .addClass('input-error');
                                }
                            },
                            error: function (XMLHttpRequest,
                                             textStatus,
                                             errorThrown) {
                                alert(XMLHttpRequest.readyState
                                    + XMLHttpRequest.status
                                    + XMLHttpRequest.responseText);
                                console
                                    .log("error");
                                console
                                    .log(textStatus);
                            }
                        });
                } else {
                    $(this)
                        .removeClass(
                        'input-success');
                    $(this).addClass('input-error');
                }
            });
        // next step
        $('.registration-form .btn-next')
            .on(
            'click',
            function () {
                var parent_fieldset = $(this).parents(
                    'fieldset');
                var next_step = true;

                parent_fieldset
                    .find(
                    'input[type="text"], input[type="password"], textarea')
                    .each(
                    function () {
                        if ($(this)
                                .hasClass(
                                "input-error")) {
                            next_step = false;
                        }
                        if ($(this).val() == "") {
                            $(this)
                                .addClass(
                                'input-error');
                            next_step = false;
                        }
                    });

                if (next_step) {
                    parent_fieldset
                        .fadeOut(
                        400,
                        function () {
                            $(this)
                                .next()
                                .fadeIn();
                        });
                } else {
                    $(this).blur();
                }
            });

        // previous step
        $('.registration-form .btn-previous').on(
            'click',
            function () {
                $(this).parents('fieldset').fadeOut(400,
                    function () {
                        $(this).prev().fadeIn();
                    });
            });

        // submit
        $('.registration-form .btn-submit')
            .on(
            'click',
            function () {
                var node = $(this);
                form = $('.registration-form');
                var next_step = true;

                form
                    .find(
                    'input[type="text"], input[type="password"], textarea')
                    .each(
                    function () {
                        if ($(this)
                                .hasClass(
                                "input-error")) {
                            next_step = false;
                        }
                        if ($(this).val() == "") {
                            $(this)
                                .addClass(
                                'input-error');
                            next_step = false;
                        }
                    });

                if (next_step) {
                    $
                        .ajax({
                            url: '/dva-mvn/signUp/signUp.do',
                            type: 'post',
                            dataType: 'text',
                            data: form
                                .serializeArray(),
                            success: function (data) {
                                var result = $
                                    .parseJSON(data);
                                console.log(result);
                                if (result.resultMessage.resultCode == 1) {
                                    node
                                        .parents(
                                        'fieldset')
                                        .fadeOut(
                                        400,
                                        function () {
                                            $(
                                                this)
                                                .next()
                                                .fadeIn();
                                        });
                                } else {

                                }

                            }
                        });
                } else {
                    alert("Check your Input again to make sure all of them meet the requirement");
                    $(this).blur();
                }


            });

        $('.registration-form .btn-jump').on('click', function () {
            var email = $('#email').val().split('@')[1];
            email = 'http://www.' + email;
            window.location.href = email;
        });

        $('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '40%' // optional
        });

    });

function isEmail(str) {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(str);
}

function isUserName(s) {
    var patrn = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
    if (!patrn.exec(s))
        return false
    return true
}

function checkStrong(sValue) {
    var modes = 0;
    // 正则表达式验证符合要求的
    if (sValue.length < 8)
        return modes;
    if (/\d/.test(sValue))
        modes++; // 数字
    if (/[a-z]/.test(sValue))
        modes++; // 小写
    if (/[A-Z]/.test(sValue))
        modes++; // 大写
    if (/\W/.test(sValue))
        modes++; // 特殊字符

    // 逻辑处理
    switch (modes) {
        case 1:
            return 1;
            break;
        case 2:
            return 2;
        case 3:
        case 4:
            return sValue.length < 12 ? 3 : 4
            break;
    }
}