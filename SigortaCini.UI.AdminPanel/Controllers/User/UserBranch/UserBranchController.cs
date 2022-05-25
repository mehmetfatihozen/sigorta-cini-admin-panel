using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.User;
using SigortaCini.UI.AdminPanel.Services.User;

namespace SigortaCini.UI.AdminPanel.Controllers.User.UserBranch
{
    public class UserBranchController : Controller
    {

        IUserParameterService _userParameterService;

        public UserBranchController(IUserParameterService userParameterService)
        {
            _userParameterService = userParameterService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetUserBranch(uint id)
        {
            return Json(_userParameterService.GetBranchById(id));
        }

        public JsonResult CreateUserBranch(UserBranchDTO input)
        {
            return Json(_userParameterService.CreateUserBranch(input));
        }

        public JsonResult UpdateUserBranch(UserBranchDTO input)
        {
            return Json(_userParameterService.UpdateUserBranch(input));
        }

        public JsonResult GetAllUserBranches()
        {
            var serviceReponse = _userParameterService.GetAllUserBranches();
            return Json(serviceReponse);
        }
    }
}