using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.CallCenter;
using SigortaCini.UI.AdminPanel.Services.CallCenter;

namespace SigortaCini.UI.AdminPanel.Controllers.LeadReports
{
    public class LeadReportsController : Controller
    {
        private readonly ICallCenterService _callCenterService;

        public LeadReportsController(ICallCenterService callCenterService)
        {
            _callCenterService = callCenterService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetLeadReports(AdminCallCenterLeadReportRequestDTO input)
        {
            return Json(_callCenterService.LeadReports(input));
        }
    }
}