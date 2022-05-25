using Microsoft.Extensions.Caching.Distributed;
using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.DataManagement;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using SigortaCini.UI.Models.DTO;
using SigortaCini.UI.Models.Enum;
using SigortaCini.UI.Models.ViewModel;
using System;
using System.Security.Claims;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Options;
using SigortaCini.Framework.Extensions;
using SigortaCini.UI.Extensions;
using System.Collections.Generic;
using SigortaCini.UI.AdminPanel.Services.Permission;
using System.Linq;

namespace SigortaCini.UI.Services
{
    public interface IUserService
    {
        CurrentUserDTO CurrentUser { get; set; }
        LoginDTO Login(LoginViewModel model, bool isAzureLogin = false);
        ForgotPasswordDTO ForgotPassword(ForgotPasswordViewModel model);
        string ChangePassword(ChangePasswordViewModel model);
        OTPConfirmDTO OTPConfirm(OTPViewModel model);
        bool SendOTPCode(string ip);
        CheckUsernameResultType CheckUsername(string username);
        LoginDTO AzureLogin(ClaimsPrincipal user);
        OTPInfoDTO OTPInfo();
        ApiResult<IEnumerable<UserDTO>> GetAllUser();

    }
    public class UserService : IUserService, IScopedService
    {
        readonly IDistributedCache _cache;
        private readonly CustomOptions _options;
        readonly ISmsService _smsService;
        readonly ICryptoService _cryptoService;
        readonly RestfulClient _restfulClient;
        readonly IPermissionService _permissionService;


        public UserService(ICryptoService cryptoService,
            ISmsService smsService,
            IDistributedCache cache, IOptions<CustomOptions> options,
            IPermissionService permissionService)
        {
            _cache = cache;
            _options = options.Value;
            _cryptoService = cryptoService;
            _smsService = smsService;
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}user", cache: _cache);
            _permissionService = permissionService;
        }

        public CurrentUserDTO CurrentUser { get; set; }


        public CheckUsernameResultType CheckUsername(string username)
        {
            var data = _restfulClient.Get<ApiResult<UserDTO>>("getbyusername", new { username });

            if (data == null || data.Data == null || data.HasError)
            {
                throw new Exception(data.Message);
            }

            else if (data.Data.IsAzureIdEnabled)
            {
                return CheckUsernameResultType.AzureUser;
            }

            else
            {
                return CheckUsernameResultType.NormalUser;
            }
        }


        public LoginDTO AzureLogin(ClaimsPrincipal user)
        {
            var email = user.Identity.Name;
            if (!string.IsNullOrWhiteSpace(email))
            {
                return Login(new LoginViewModel { Username = email }, true);
            }

            return null;
        }

        public string ChangePassword(ChangePasswordViewModel model)
        {
            #region RateLimiting
            var otpLock = _cache.GetString($"ChangePasswordLock-{model.UserId}-{model.Ip}");

            if (otpLock != null)
            {
                return "Çok sayıda hatalı giriş yaptığınız için sisteme girişiniz 3 dakika engellenmiştir. Yazılım ekibinden kısıtın kaldırılması için destek alabilirsiniz.";
            }

            var attemptCount = Convert.ToInt16(_cache.GetString($"ChangePasswordAttemptCount-{model.UserId}-{model.Ip}"));

            if (attemptCount == 4)
            {
                _cache.SetString($"ChangePasswordLock-{model.UserId}-{model.Ip}", "1", new DistributedCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(3)));
            }
            else
            {
                _cache.SetString($"ChangePasswordAttemptCount-{model.UserId}-{model.Ip}", (attemptCount + 1).ToString(), new DistributedCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(5)));
            }
            #endregion

            var code = _cache.GetString($"ForgotPasswordCode-{model.UserId}");

            if (code == null || code != model.Code)
            {
                return "Doğrulama kodu hatalı!";
            }

            if (!new Regex(StaticValues.PASSWORD_POLICY_REGEX).Match(model.Password).Success)
            {
                return "Parola yeteri kadar karışık değil! (En az 8 haneli, büyük, küçük harf ve rakam)";
            }

            var data = _restfulClient.Put<ApiResult<bool>>("updatepassword", new UserPasswordUpdateDTO
            {
                UserId = model.UserId,
                Password = _cryptoService.BCryptHash(model.Password)
            });

            return (!data.HasError && data.Data) ? "" : "Parola değiştirirken bir hata oluştu!";
        }

        public ForgotPasswordDTO ForgotPassword(ForgotPasswordViewModel model)
        {
            var data = _restfulClient.Get<ApiResult<UserDTO>>("getbyphone", new { phone = model.Phone });

            if (data == null || data.HasError || data.Data == null || data.Data.Username != model.Username)
            {
                return null;
            }

            var user = data.Data;

            var code = Utilities.GenerateRandomPin(8);

            _cache.SetString($"ForgotPasswordCode-{user.UserId}", code, new DistributedCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(10)));

            if (_smsService.SendSms(model.Phone, $"Doğrulama Kodunuz: {code}"))
            {
                return new ForgotPasswordDTO
                {
                    UserId = user.UserId
                };
            }

            return null;
        }

        public LoginDTO Login(LoginViewModel model, bool isAzureLogin = false)
        {
            var data = _restfulClient.Get<ApiResult<UserDTO>>("getbyusername", new { username = model.Username },
                $"{nameof(UserService)}-{nameof(CheckUsername)}-{model.Username}",
                TimeSpan.FromMinutes(1));


            if (data == null || data.HasError || data.Data == null)
            {
                return null;
            }

            var user = data.Data;

            var loginLock = _cache.GetString($"LoginLock-{user.UserId}-{model.Ip}");


            if (loginLock != null)
            {
                return new LoginDTO
                {
                    TooManyAttempts = true
                };
            }

            if (user.IsAzureIdEnabled && !isAzureLogin)
            {
                return new LoginDTO { IsAzureLogin = true };
            }

            if (isAzureLogin || _cryptoService.BCryptVerify(model.Password, user.Password))
            {
                CurrentUser = new CurrentUserDTO
                {
                    IsAzureIdEnabled = user.IsAzureIdEnabled,
                    ExpireAt = DateTime.Now.AddDays(7),
                    Username = user.Username,
                    UserId = user.UserId,
                    IsNeedOTPAuth = !user.IsOTPDisabled,
                    Phone = user.GsmNo,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    //ImageUrl = user.ImageUrl,
                    CurrentVersion = _options.Version,
                    RoleId = (int)user.RoleId
                };

                var permissions = _permissionService.GetPermissionsByRoleId((uint)CurrentUser.RoleId).Data.ToList();

                if (!user.IsOTPDisabled)
                {
                    SendOTPCode(model.Ip);
                }

                var login =  new LoginDTO
                {
                    Token = _cryptoService.JWTEncode(new CurrentUserDTO
                    {
                        IsAzureIdEnabled = user.IsAzureIdEnabled,
                        ExpireAt = DateTime.Now.AddDays(7),
                        Username = user.Username,
                        UserId = user.UserId,
                        IsNeedOTPAuth = !user.IsOTPDisabled,
                        Phone = user.GsmNo,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        CurrentVersion = _options.Version,
                        RoleId = (int)user.RoleId.GetValueOrDefault(1)
                    }),
                    IsOTPDisabled = user.IsOTPDisabled,
                    UserId = user.UserId,
                    Phone = user.GsmNo.GenerateMaskedPhone(),
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    //ImageUrl = user.ImageUrl,
                    UserName = user.Username,
                    CurrentVersion = _options.Version

                };

                StaticValues.InsertPermissionToList(CurrentUser.RoleId, permissions);

                var permissionString = _cache.GetString($"PermissionRoles{user.RoleId}");
                return login;
            }

            var attemptCount = Convert.ToInt16(_cache.GetString($"LoginAttemptCount-{user.UserId}-{model.Ip}"));

            if (attemptCount == 4)
            {
                _cache.SetString($"LoginLock-{user.UserId}-{model.Ip}", "1", new DistributedCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(3)));
            }
            else
            {
                _cache.SetString($"LoginAttemptCount-{user.UserId}-{model.Ip}", (attemptCount + 1).ToString(), new DistributedCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(5)));
            }

            return null;
        }

        public bool SendOTPCode(string ip)
        {
            #region RateLimiting
            var otpLock = _cache.GetString($"OTPLock-{CurrentUser.UserId}-{ip}");

            if (otpLock != null)
            {
                return false;
            }
            #endregion

            var code = Utilities.GenerateRandomPin(6, true);
            _cache.SetString($"OTPCode-{CurrentUser.UserId}", code, new DistributedCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(3)));

            return _smsService.SendSms(CurrentUser.Phone, $"Doğrulama Kodunuz: {code}");
        }

        public OTPConfirmDTO OTPConfirm(OTPViewModel model)
        {
            #region RateLimiting
            var otpLock = _cache.GetString($"OTPLock-{model.UserId}-{model.Ip}");

            if (otpLock != null)
            {
                return new OTPConfirmDTO
                {
                    Result = OTPConfirmResultType.TooManyAttempt
                };
            }

            var attemptCount = Convert.ToInt16(_cache.GetString($"OTPAttemptCount-{model.UserId}-{model.Ip}"));

            if (attemptCount == 4)
            {
                _cache.SetString($"OTPLock-{model.UserId}-{model.Ip}", "1", new DistributedCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(3)));
            }
            else
            {
                _cache.SetString($"OTPAttemptCount-{model.UserId}-{model.Ip}", (attemptCount + 1).ToString(), new DistributedCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(3)));
            }
            #endregion

            var code = _cache.GetString($"OTPCode-{model.UserId}");

            if (code == null || code != model.Code || model.UserId != CurrentUser.UserId)
            {
                return new OTPConfirmDTO
                {
                    Result = OTPConfirmResultType.Invalid
                };
            }

            CurrentUser.IsNeedOTPAuth = false;

            return new OTPConfirmDTO
            {
                Result = OTPConfirmResultType.Valid,
                Token = _cryptoService.JWTEncode(CurrentUser)
            };
        }

        public OTPInfoDTO OTPInfo()
        {
            if (CurrentUser == null) return null;

            return new OTPInfoDTO
            {
                UserId = CurrentUser.UserId,
                Phone = CurrentUser.Phone.GenerateMaskedPhone(),
                FirstName = CurrentUser.FirstName,
                LastName = CurrentUser.LastName,
                UserName = CurrentUser.Username
            };
        }

        public ApiResult<IEnumerable<UserDTO>> GetAllUser()
        {
            var result = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}user/").Get<ApiResult<IEnumerable<UserDTO>>>("/getAll");
            return result;
        }

    }
}
