using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.User;
using SigortaCini.UI.AdminPanel.Services.User;

namespace SigortaCini.UI.AdminPanel.Controllers.User.UserArea
{
    public class UserAreaController : Controller
    {
        IUserParameterService _userParameterService;

        public UserAreaController(IUserParameterService userParameterService)
        {
            _userParameterService = userParameterService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetUserArea(uint id)
        {
            return Json(_userParameterService.GetAreaById(id));
        }

        public JsonResult CreateUserArea(UserAreaDTO input)
        {
            return Json(_userParameterService.CreateUserArea(input));
        }

        public JsonResult UpdateUserArea(UserAreaDTO input)
        {
            return Json(_userParameterService.UpdateUserArea(input));
        }

        public JsonResult GetAllUserAreas()
        {
            var serviceReponse = _userParameterService.GetAllUserAreas();
            return Json(serviceReponse);
        }
    }
}