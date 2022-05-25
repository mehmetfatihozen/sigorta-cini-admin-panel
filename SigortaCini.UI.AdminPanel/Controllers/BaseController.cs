using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using SigortaCini.Framework.Data.DTO.Admin.Permission;
using SigortaCini.UI.AdminPanel.Services.Permission;
using SigortaCini.UI.Models.DTO;
using SigortaCini.UI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;

namespace SigortaCini.UI.AdminPanel.Controllers
{
    public class BaseController : Controller
    {
        ICryptoService _cryptoService;
        IUserService _userService;
        IPermissionService _permissionService;
        IHostingEnvironment _currentEnvironment;


        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var token = HttpContext.Request.Cookies["Token"];
            if (token != null)
            {
                _cryptoService = (ICryptoService)context.HttpContext.RequestServices.GetService(typeof(ICryptoService));
                _permissionService = (IPermissionService)context.HttpContext.RequestServices.GetService(typeof(IPermissionService));
                _userService = (SigortaCini.UI.Services.IUserService)context.HttpContext.RequestServices.GetService(typeof(SigortaCini.UI.Services.IUserService));
                _currentEnvironment = (IHostingEnvironment)context.HttpContext.RequestServices.GetService(typeof(IHostingEnvironment));
                try
                {
                    CurrentUserDTO user = _cryptoService.JWTDecode<CurrentUserDTO>(token);
                    string controller = HttpContext.GetRouteData().Values["controller"].ToString();
                    string action = HttpContext.GetRouteData().Values["action"].ToString();

                    if (_currentEnvironment.IsDevelopment() == true)
                    {
                        // Yetki kontrolü
                        var response = _permissionService.CreatePermission(new Framework.Data.DTO.Admin.Permission.PermissionInsertRequestDTO
                        {
                            PermissionActon = action,
                            PermissionController = controller,
                            PermissionName = $"{controller} içerisindeki {action}",
                            State = true,
                        });
                    }

                    _userService.CurrentUser = user;

                    if (user.ExpireAt < DateTime.Now || user.IsNeedOTPAuth || user == null)
                    {
                        throw new Exception();
                    }

                    ViewData["UserName"] = $"{user.FirstName} {user.LastName}";
                    /*if (!IsAuthenticated(user, controller, action) && !_currentEnvironment.IsDevelopment())
                    {
                        context.Result = new JsonResult($"{user.Username} {controller} {action} methoduna girmeye yetkisi bulunmamaktadır.");
                        throw new AuthenticationException();
                    }*/
                }
                catch
                {
                }
            }
        }

        public bool IsAuthenticated(CurrentUserDTO user, string controller, string action)
        {
            if (_currentEnvironment.IsDevelopment())
                return true;
            if (StaticValues.Permissions.ContainsKey(user.RoleId))
            {
                var permissions = _permissionService.GetPermissionsByRoleId((uint)user.RoleId).Data.ToList();
                StaticValues.InsertPermissionToList(user.RoleId, permissions);
            }
            var isAuthenticated = StaticValues.Permissions.FirstOrDefault(x => x.Key == user.RoleId).Value.Where(x => x.PermissionActon == action
            && x.PermissionController == controller).Count();

            return isAuthenticated > 0;

        }



        public CurrentUserDTO GetCurrentUser()
        {
            var token = HttpContext.Request.Cookies["Token"];
            if (token != null)
            {
                try
                {
                    var user = _cryptoService.JWTDecode<CurrentUserDTO>(token);
                    _userService.CurrentUser = user;
                    if (user.ExpireAt < DateTime.Now || user.IsNeedOTPAuth || user == null)
                    {
                        throw new Exception();
                    }
                    return user;
                }
                catch
                {
                    return null;
                }
            }
            return null;
        }
        protected string GetProductName(uint productId)
        {
            switch (productId)
            {
                case 1:
                case 101:
                    return "Identity";
                case 2:
                case 102:
                    return "EgmTramer";
                case 6:
                    return "Traffic Quotation";
                case 3:
                    return "Casco Quotation";
                case 103:
                    return "Traffic Policy";
                case 104:
                    return "Casco Policy";
                default:
                    return "Bilinmiyor";
            }
        }
        protected string GetCompanyName(int companyId)
        {
            switch (companyId)
            {
                case 1:
                    return "Ray";
                case 2:
                    return "Sompo";
                case 3:
                    return "Doğa";
                case 4:
                    return "Güneş";
                case 5:
                    return "HDI";
                case 6:
                    return "Türk Nippon";
                case 7:
                    return "AXA";
                case 8:
                    return "Mapfre";
                case 9:
                    return "Koru";
                default:
                    return "Bilinmiyor";
            }
        }
    }
}
