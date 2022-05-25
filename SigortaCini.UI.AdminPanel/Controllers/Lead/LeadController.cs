using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO;
using SigortaCini.UI.AdminPanel.Services.Lead;

namespace SigortaCini.UI.AdminPanel.Controllers.Lead
{
    public class LeadController : BaseController
    {
        private readonly ILeadService _leadService;

        public LeadController(ILeadService leadService)
        {
            _leadService = leadService;
        }

        public JsonResult GetAll()
        {
            return Json(_leadService.GetAll());
        }

        [HttpPost]
        public JsonResult GetAllForExcel(DateTimeRangeDTO input)
        {
            return Json(_leadService.GetAllForExcel(input));
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}