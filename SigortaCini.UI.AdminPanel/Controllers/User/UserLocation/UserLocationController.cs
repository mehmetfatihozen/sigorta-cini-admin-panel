using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.User;
using SigortaCini.UI.AdminPanel.Services.User;

namespace SigortaCini.UI.AdminPanel.Controllers.User.UserLocation
{
    public class UserLocationController : Controller
    {
        IUserParameterService _userParameterService;

        public UserLocationController(IUserParameterService userParameterService)
        {
            _userParameterService = userParameterService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetUserLocation(uint id)
        {
            return Json(_userParameterService.GetLocationById(id));
        }

        public JsonResult CreateUserLocation(UserLocationDTO input)
        {
            return Json(_userParameterService.CreateUserLocation(input));
        }

        public JsonResult UpdateUserLocation(UserLocationDTO input)
        {
            return Json(_userParameterService.UpdateUserLocation(input));
        }

        public JsonResult GetAllUserLocations()
        {
            var serviceReponse = _userParameterService.GetAllUserLocations();
            return Json(serviceReponse);
        }
    }
}