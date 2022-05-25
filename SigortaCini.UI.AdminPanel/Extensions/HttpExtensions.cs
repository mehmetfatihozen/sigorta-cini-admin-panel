using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.Extensions
{
    public static class HttpExtensions
    {
        public static void AddCookie(this HttpContext context, string key, string value)
        {
            context.Response.Cookies.Append(key, value, new CookieOptions { HttpOnly = true });
        }
        public static void DeleteCookie(this HttpContext context, string key)
        {
            context.Response.Cookies.Delete(key);
        }
        public static string GetIpAddress(this HttpContext context)
        {
            return context.Connection.RemoteIpAddress.ToString().Replace("::1", "localhost");
        }
    }
}
