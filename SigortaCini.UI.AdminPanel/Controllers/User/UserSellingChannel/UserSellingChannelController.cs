using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.User;
using SigortaCini.UI.AdminPanel.Services.User;

namespace SigortaCini.UI.AdminPanel.Controllers.User.UserSellingChannel
{
    public class UserSellingChannelController : Controller
    {

        IUserParameterService _userParameterService;

        public UserSellingChannelController(IUserParameterService userParameterService)
        {
            _userParameterService = userParameterService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetSellingChannelType(uint id)
        {
            return Json(_userParameterService.GetSellingChannelTypeById(id));
        }

        public JsonResult CreateUserSellingChannelType(UserSellingChannelDTO input)
        {
            return Json(_userParameterService.CreateUserSellingChannelType(input));
        }

        public JsonResult UpdateUserSellingChannelType(UserSellingChannelDTO input)
        {
            return Json(_userParameterService.UpdateUserSellingChannelType(input));
        }

        public JsonResult GetAllUserSellingChannelType()
        {
            var serviceReponse = _userParameterService.GetAllUserSellingChannelType();
            return Json(serviceReponse);
        }
    }
}