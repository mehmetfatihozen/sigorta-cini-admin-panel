using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO;
using SigortaCini.UI.AdminPanel.Models.DTO;
using SigortaCini.UI.AdminPanel.Services.MarketingReport;
using System;

namespace SigortaCini.UI.AdminPanel.Controllers.MarketingReport
{
    public class MarketingReportController : Controller
    {
        readonly IMarketingReportService _marketingReportService;

        public MarketingReportController(IMarketingReportService marketingReportService)
        {
            _marketingReportService = marketingReportService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetMarketingReport(MarketingReportFilterDTO input)
        {
            input.DateRangeList.Add(new DateTimeRangeDTO { FromDate = input.DateFrom, ToDate = input.DateTo });
            return Json(_marketingReportService.GetMarketingReport(input));
        }
    }
}
