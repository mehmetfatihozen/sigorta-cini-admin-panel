$(document).ready(function () {
    sigortaCiniLogin.init();
    $(document).keypress(function (event) {

        var keycode = (event.keyCode ? event.keyCode : event.which);
        if ($('.divUserPasswordPanel').hasClass("hide")) {
            if (keycode == '13') {

                $("#btnLogin").trigger("click");

            }
        }
        else {
            if (keycode == '13') {

                $("#btnLoginPassword").trigger("click");

            }

        }


    });
});



var sigortaCiniLogin = {

    init: function () {
        this.checkUserName();
        this.login();
        this.sendOtpCode();


       

        $("#btnLoginStatus").val("init");

        $("#btn_accept").click(function (e) {
            e.preventDefault();
            $(".RoleIsActiveDiv").find('span').addClass('checked');
            $("#checkAggrement").attr('checked', 'checked');
        });
         
        
        var vars = [], hash;
        var q = document.URL.split('?')[1];
        if (q != undefined) {
            q = q.split('&');
            for (var i = 0; i < q.length; i++) {
                hash = q[i].split('=');
                vars.push(hash[1]);
                vars[hash[0]] = hash[1];
            }
        }

        if (vars['isazurelogin'] != null && vars['isazurelogin'] == "true") {
            $("#hiddenUserId").val(vars['userId']);
            $('.divOtpPasswordPanel').removeClass("hide");
            $(".divUserNamePanel").hide();
        }
    },

    sendOtpCode: function () {
        $("#btnLoginOtpPassword").click(function () {

            if ($("#LoginOtpPassword").val().length <= 0) {
                $("#alertDiv").show();
                $("#alertDiv").find("#alertMessage").text("Cep telefonunuza gelen kodu giriniz.");
                return;
            }
            var otpCode = $("#LoginOtpPassword").val();
            var userId = $("#hiddenUserId").val();
            $.ajax({
                url: '/Login/OTPConfirm',
                type: "POST",
                data: {
                    UserId: userId,
                    Code: otpCode,
                    Ip: ""
                },
                dataType: "json",
                success: function (data) {
                    if (data == null) {
                        $("#alertDiv").show();
                        $("#alertDiv").find("#alertMessage").text("Sistemde bir hata oluştu");
                    }
                    else if (data.hasError) {
                        $("#alertDiv").show();
                        $("#alertDiv").find("#alertMessage").text(data.message);
                    }
                    else if (data.data == 0) {
                        $("#alertDiv").show();
                        $("#alertDiv").find("#alertMessage").text("Doğrulama kodu ile girmiş olduğunuz şifre eşleşmemektedir. Lütfen size gelen SMS'deki şifreyi kontrol edip tekrar deneyiniz.");
                    }
                    else if (data.data == 2) {
                        $("#alertDiv").show();
                        $("#alertDiv").find("#alertMessage").text("Çok sayıda hatalı giriş yaptığınız için sisteme girişiniz 3 dakika engellenmiştir. Yazılım ekibinden kısıtın kaldırılması için destek alabilirsiniz.");

                    }
                    else {
                       
                       
                        window.location = "/Home/Index";
                    }
                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                }
            });
        });
    },

    login: function () {





        $("#btnLoginPassword").click(function () {

            if (!sigortaCiniLogin.validatePostLogin()) {
                return;
            }
            $('.content-loader').show();

            var userNameValue = $("#hiddenUserName").val();
            var passwordValue = $("#LoginPassword").val();
            var checkData = {
                Username: userNameValue,
                Password: passwordValue,
                Ip: ""
            };
            $("#hiddenUserName").val(userNameValue);
            $.ajax({
                url: '/Login/Login',
                type: "POST",
                data: {
                    Username: userNameValue,
                    Password: passwordValue,
                    Ip: ""
                },
                dataType: "json",
                success: function (data) {
                    if (data == null) {
                        $('.content-loader').hide();
                        $("#alertDiv").show();
                        $("#alertDiv").find("#alertMessage").text("Sistemde bir hata oluştu");
                    }
                    else if (data.hasError) {
                        $('.content-loader').hide();
                        $("#alertDiv").show();
                        $("#alertDiv").find("#alertMessage").text(data.message);
                    }
                    else if (!data.data.isOTPDisabled) {
                        $("#hiddenUserId").val(data.data.userId);
                        $(".divUserNamePanel").hide();
                        //$(".divUserPasswordPanel").hide();
                        $('.divUserPasswordPanel').addClass("hide");
                        $('.divOtpPasswordPanel').removeClass("hide");
                        $('.content-loader').hide();

                        // $(".divOtpPasswordPanel").show();
                    }
                    else {
                        $('.content-loader').hide();
                        window.location = "Home/Index";
                    }
                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                    $('.content-loader').hide();

                }
            });
        });
    },

    checkUserName: function () {

        $("#btnLogin").click(function () {
            if ($("#btnLoginStatus").val() == "init") {
                if (!sigortaCiniLogin.validateLogin()) {
                    return;
                }
                var userNameValue = $("#LoginUserName").val();
                var checkData = {
                    "UserName": userNameValue
                };
                $("#hiddenUserName").val(userNameValue);
                $('.content-loader').show();
                $.ajax({
                    url: '/Login/CheckUserName',
                    type: "POST",
                    data: { email: userNameValue },
                    dataType: "json",
                    success: function (data) {
                        if (data == null) {
                            $('.content-loader').hide();
                            $("#alertDiv").show();
                            $("#alertDiv").find("#alertMessage").text("Sistemde bir hata oluştu");
                        }
                        else if (data.data == 0) {
                            $('.content-loader').hide();
                            $("#alertDiv").show();
                            $("#alertDiv").find("#alertMessage").text(data.message);
                            $("#btnLoginStatus").val("init");
                        }
                        else if (data.data == 1) {
                            $(".divUserNamePanel").hide();
                            // $(".divUserPasswordPanel").show();
                            $('.divUserPasswordPanel').removeClass("hide");
                            $('#LoginPassword').focus();

                            $("#btnLoginStatus").val("checked");
                            $('.content-loader').hide();
                        }
                        else if (data.data == 2) {
                            $('.content-loader').hide();
                            window.location.href = "/login/azurelogin";
                            return;
                        }
                    },
                    error: function (errorThrown) {
                        console.log(errorThrown);
                        $('.content-loader').hide();
                    }
                });
            }

        });
    },

    validateLogin: function () {
        if ($("#checkAggrement:checked").length <= 0) {
            $("#alertDiv").show();
            $("#alertDiv").find("#alertMessage").text("Kullanıcı sözleşmesi onaylanmalıdır.");
            return false;
        }
        else {
            $("#alertDiv").hide();
        }
        var userName = $("#LoginUserName").val();
        if (userName.length <= 0) {
            $("#alertDiv").show();
            $("#alertDiv").find("#alertMessage").text("Kullanıcı adınızı giriniz.");
            return false;
        }
        else {
            $("#alertDiv").hide();
        }
        return true;
    },

    validatePostLogin: function () {
        var userName = $("#LoginPassword").val();
        if (userName.length <= 0) {
            $("#alertDiv").show();
            $("#alertDiv").find("#alertMessage").text("Şifrenizi giriniz.");
            return false;
        }
        return true;
    }
};


