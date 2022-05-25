using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.UI.AdminPanel.Services.Clicky;

namespace SigortaCini.UI.AdminPanel.Controllers.Clicky
{
    public class ClickyController : Controller
    {
        readonly IClickyService _clickyService;

        public ClickyController(IClickyService clickyService)
        {
            _clickyService = clickyService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetStatAllType()
        {
            return Json(_clickyService.GetStatAllType());
        }

        public JsonResult GetStatByActionType()
        {
            return Json(_clickyService.GetStatByActionType());
        }

        public JsonResult GetStatByVisitorsType()
        {
            return Json(_clickyService.GetStatByVisitorsType());
        }
    }
}