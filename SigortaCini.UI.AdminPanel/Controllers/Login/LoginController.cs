using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Extensions;
using SigortaCini.Framework.NoSQL.MongoDB;
using SigortaCini.UI.AdminPanel.Attributes;
using SigortaCini.UI.AdminPanel.Session;
using SigortaCini.UI.Extensions;
using SigortaCini.UI.Models.DTO;
using SigortaCini.UI.Models.Enum;
using SigortaCini.UI.Models.ViewModel;
using SigortaCini.UI.Services;
using System;

namespace SigortaCini.UI.AdminPanel.Controllers.Login
{
    [SkipAuth]
    public class LoginController : BaseController
    {

        readonly IUserService _userService;
        //readonly ILogService _logger;

        public IActionResult Index()
        {
            return View();
        }

        public LoginController(IUserService userService)
        {
            _userService = userService;
            //_logger = logger;
        }
        public IActionResult Logged(bool isAzureLogin)
        {
            //if (_userService.CurrentUser != null && !_userService.CurrentUser.IsNeedOTPAuth)
            //{
            //    return Redirect("/");
            //}

            if (isAzureLogin)
            {
                ViewBag.UserId = _userService.CurrentUser.UserId;
                ViewBag.Phone = _userService.CurrentUser.Phone.GenerateMaskedPhone();
            }

            return View("Index");
        }
        [HttpPost]
        public ApiResult<LoginDTO> Login(LoginViewModel model)
        {
            try
            {
                model.Ip = HttpContext.GetIpAddress();

                var result = _userService.Login(model);
                var resultMsg = "";

                if (result != null)
                {

                    HttpContext.AddCookie("Token", result.Token ?? "");
                    //var sessionUserInfo = new SessionUserInfo()
                    //{
                    //    IsAzureLogin = result.IsAzureLogin,
                    //    UserName = result.UserName,
                    //    UserId = result.UserId,
                    //    IsOTPDisabled = result.IsOTPDisabled,
                    //    Phone = result.Phone,
                    //    FirstName = result.FirstName,
                    //    LastName = result.LastName,
                    //    ImageUrl = result.ImageUrl,
                    //    CurrentVersion = result.CurrentVersion,
                    //    Token = result.Token,
                    //    IsLogged = true,
                    //    TooManyAttempts = result.TooManyAttempts
                    //};
                    //_SessionUserInfo = sessionUserInfo;

                    result.Token = "";
                    if (result.TooManyAttempts)
                    {
                        /*"Çok sayıda hatalı giriş yaptığınız için sisteme girişiniz 3 dakika engellenmiştir. Yazılım ekibinden kısıtın kaldırılması için destek alabilirsiniz."*/
                        resultMsg = "Çok sayıda hatalı giriş yaptığınız için sisteme girişiniz 3 dakika engellenmiştir. Yazılım ekibinden kısıtın kaldırılması için destek alabilirsiniz.";
                    }
                }
                else
                {
                    //"Hatalı giriş yaptınız şifremi unuttum ile ilerleyebilirisiniz."
                    resultMsg = "Hatalı giriş yaptınız.";
                }

                return new ApiResult<LoginDTO>
                {
                    Data = result,
                    HasError = result == null || result.TooManyAttempts,
                    Message = resultMsg
                };
            }
            catch (Exception ex)
            {
                return new ApiResult<LoginDTO>
                {
                    Data = null,
                    HasError = true,
                    Message = ex.Message
                };
            }
        }
        public IActionResult Logout()
        {
            HttpContext.DeleteCookie("Token");
            //_SessionUserInfo = null;
            return RedirectToAction("Index");
        }
        //LoginPanel
        public IActionResult LoginPanel()
        {
            return PartialView("_LoginPanel");
        }

        //OTP Panel
        public IActionResult OTPPanel()
        {
            return PartialView("_OtpPanel");
        }

        //ForgotPasswordPanel
        public IActionResult ForgotPasswordPanel()
        {
            return PartialView("_ForgotPasswordPanel");
        }

        [HttpPost]
        public ApiResult<ForgotPasswordDTO> ForgotPassword(ForgotPasswordViewModel model)
        {
            var result = _userService.ForgotPassword(model);
            return new ApiResult<ForgotPasswordDTO>
            {
                //"Telefon numarası veya kullanıcı adı eşleşmesi bulunamadı!"
                Data = result,
                HasError = result == null,
                Message = result == null ? "login.popUps.alertForgotPasswordFormNotMatchInfo.text" : ""
            };
        }

        //ResetPasswordPanel
        public IActionResult ResetPasswordPanel()
        {
            return PartialView("_ResetPasswordPanel");
        }

        //ChangePassword
        [HttpPost]
        public ApiResult<bool> ChangePassword(ChangePasswordViewModel model)
        {
            var result = _userService.ChangePassword(model);

            return new ApiResult<bool>
            {
                Data = result == "",
                HasError = result != "",
                Message = result
            };
        }

        //OTP Auth
        [HttpPost]
        public ApiResult<OTPConfirmResultType> OTPConfirm(OTPViewModel model)
        {
            model.Ip = HttpContext.GetIpAddress();

            var result = _userService.OTPConfirm(model);

            var resultMsg = "";
            switch (result.Result)
            {
                case OTPConfirmResultType.Invalid:
                    //"Doğrulama kodu ile girmiş olduğunuz şifre eşleşmemektedir. Lütfen size gelen SMS'deki şifreyi kontrol edip tekrar deneyiniz."
                    resultMsg = "Doğrulama kodu ile girmiş olduğunuz şifre eşleşmemektedir. Lütfen size gelen SMS'deki şifreyi kontrol edip tekrar deneyiniz.";
                    break;
                case OTPConfirmResultType.TooManyAttempt:
                    //"Çok sayıda hatalı giriş yaptığınız için sisteme girişiniz 3 dakika engellenmiştir. Yazılım ekibinden kısıtın kaldırılması için destek alabilirsiniz."
                    resultMsg = "Çok sayıda hatalı giriş yaptığınız için sisteme girişiniz 3 dakika engellenmiştir. Yazılım ekibinden kısıtın kaldırılması için destek alabilirsiniz.";
                    break;
                default:
                    break;
            }

            if (result.Result == OTPConfirmResultType.Valid)
            {
                HttpContext.AddCookie("Token", result.Token);

            }

            return new ApiResult<OTPConfirmResultType>
            {
                Data = result.Result,
                HasError = result.Result != OTPConfirmResultType.Valid,
                Message = resultMsg
            };
        }

        //OTP Code Send
        public ApiResult<bool> OTPCodeSend()
        {
            var result = _userService.SendOTPCode(HttpContext.GetIpAddress());

            return new ApiResult<bool>
            {
                Data = result,
                HasError = !result,
                //"Çok fazla başarısız giriş denemesi yaptınız 3 dakika sonra tekrar deneyin!"
                Message = !result ? "login.popUps.alertUserLoginOTPFormManyIncorrectLoginTry2.text" : ""
            };
        }
        //OTP Info
        public ApiResult<OTPInfoDTO> OTPInfo()
        {
            var result = _userService.OTPInfo();

            return new ApiResult<OTPInfoDTO>
            {
                Data = result,
                HasError = result == null,
                Message = result == null ? "login.popUps.alertGlobalError.text" : ""
            };
        }

        //Check username
        public ApiResult<CheckUsernameResultType> CheckUsername(string email)
        {
            try
            {
                var result = _userService.CheckUsername(email);

                return new ApiResult<CheckUsernameResultType>
                {
                    Data = result,
                    HasError = result == CheckUsernameResultType.NotFound,
                    Message = result == CheckUsernameResultType.NotFound ? "Kullanıcı adı bulunamadı" : ""
                };
            }
            catch (Exception ex)
            {
                return new ApiResult<CheckUsernameResultType>
                {
                    Data = CheckUsernameResultType.NotFound,
                    HasError = true,
                    Message = ex.Message
                };
            }
        }

        //Azure Login
        [Authorize]
        public IActionResult AzureLogin()
        {
            var user = _userService.AzureLogin(HttpContext.User);
            HttpContext.AddCookie("Token", user.Token ?? "");


            if (user.IsOTPDisabled)
            {
                return Redirect("/?loggedin=1");
            }

            return Redirect("logged?isazurelogin=true&userId=" + _userService.CurrentUser.UserId);
        }


    }
}
