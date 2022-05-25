using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.User;
using SigortaCini.UI.AdminPanel.Services.User;

namespace SigortaCini.UI.AdminPanel.Controllers.ApiSettings
{
    public class ApiSettingsController : BaseController
    {
        IUserService _userService;

        public ApiSettingsController(IUserService userService)
        {
            _userService = userService;
        }
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllApiUser()
        {
            return Json(_userService.GetAllApiUser());
        }

        public JsonResult UpdateApiUser(AdminUserDTO input)
        {
            return Json(_userService.UpdateApiUser(input));
        }
    }
}