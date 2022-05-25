using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using SigortaCini.UI.AdminPanel.Attributes;
using SigortaCini.UI.Models.DTO;
using SigortaCini.UI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Filters
{
    public class AuthFilter : ActionFilterAttribute
    {
        ICryptoService _cryptoService;
        IUserService _userService;

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var token = context.HttpContext.Request.Cookies["Token"];
            if (token != null)
            {
                _cryptoService = (ICryptoService)context.HttpContext.RequestServices.GetService(typeof(ICryptoService));
                _userService = (IUserService)context.HttpContext.RequestServices.GetService(typeof(IUserService));

                var hasSkipAttribute = (context.ActionDescriptor as ControllerActionDescriptor)
                    .MethodInfo
                    .CustomAttributes
                    .Any(x => x.AttributeType == typeof(SkipAuthAttribute));

                hasSkipAttribute |= (context.ActionDescriptor as ControllerActionDescriptor)
                    .MethodInfo
                    .DeclaringType
                    .CustomAttributes
                    .Any(x => x.AttributeType == typeof(SkipAuthAttribute));
                try
                {
                    var user = _cryptoService.JWTDecode<CurrentUserDTO>(token);
                    _userService.CurrentUser = user;
                    if (user.ExpireAt < DateTime.Now || user.IsNeedOTPAuth || user == null)
                    {
                        throw new Exception();
                    }
                }
                catch
                {
                    if (!hasSkipAttribute)
                    {
                        context.Result = new RedirectToRouteResult(new RouteValueDictionary { { "Controller", "Login" }, { "Action", "Index" } });
                    }
                }
            }
            else
            {
                if (context.RouteData.Values["controller"].ToString() != "Login")
                {
                    context.Result = new RedirectToRouteResult(new RouteValueDictionary { { "Controller", "Login" }, { "Action", "Index" } });
                }

            }
        }

    }
}
