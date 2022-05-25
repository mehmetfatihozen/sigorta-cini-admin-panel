using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO;
using SigortaCini.UI.AdminPanel.Models.DTO;
using SigortaCini.UI.AdminPanel.Services.PolicyReport;
using System;

namespace SigortaCini.UI.AdminPanel.Controllers.PolicyReport
{
    public class PolicyReportController : Controller
    {
        readonly IPolicyReportService _policyReportService;

        public PolicyReportController(IPolicyReportService policyReportService)
        {
            _policyReportService = policyReportService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetPolicyReport(PolicyReportFilterDTO input)
        {
            if (input.PolicyDateFrom != DateTime.MinValue && input.PolicyDateTo != DateTime.MinValue)
            {
                input.PolicyDateRange = new DateTimeRangeDTO { FromDate = input.PolicyDateFrom, ToDate = input.PolicyDateTo };
            }

            return Json(_policyReportService.GetPolicyReport(input));
        }
    }
}
