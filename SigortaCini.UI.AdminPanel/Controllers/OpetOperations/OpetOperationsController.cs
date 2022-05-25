using Microsoft.AspNetCore.Mvc;
using SigortaCini.UI.AdminPanel.Services.Opet;

namespace SigortaCini.UI.AdminPanel.Controllers.OpetOperations
{
    public class OpetOperationsController : Controller
    {
        private readonly IOpetService _opetService;

        public OpetOperationsController(IOpetService opetService)
        {
            _opetService = opetService;
        }

        public JsonResult GetById(uint id)
        {
            return Json(_opetService.GetById(id));
        }

        public JsonResult GetAll()
        {
            return Json(_opetService.GetAll());
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult ResendParapuan(uint id)
        {
            return Json(_opetService.ResendParapuan(id));
        }
    }
}