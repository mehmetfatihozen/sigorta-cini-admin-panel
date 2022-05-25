using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO;
using SigortaCini.UI.AdminPanel.Models.DTO;
using SigortaCini.UI.AdminPanel.Services.DlpcReport;
using System;

namespace SigortaCini.UI.AdminPanel.Controllers.DlpcReport
{
    public class DlpReportController : Controller
    {
        readonly IDlpcReportService _dlpcReportService;

        public DlpReportController(IDlpcReportService dlpcReportService)
        {
            _dlpcReportService = dlpcReportService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetDLPCReport(DlpcReportFilterDTO input)
        {
            if (input.CreatedDateFrom != DateTime.MinValue && input.CreatedDateTo != DateTime.MinValue)
            {
                input.CreatedDateRange = new DateTimeRangeDTO { FromDate = input.CreatedDateFrom, ToDate = input.CreatedDateTo };
            }
            if (input.UpdatedDateFrom != DateTime.MinValue && input.UpdatedDateTo != DateTime.MinValue)
            {
                input.UpdatedDateRange = new DateTimeRangeDTO { FromDate = input.UpdatedDateFrom, ToDate = input.UpdatedDateTo };
            }

            return Json(_dlpcReportService.GetDLPCReport(input));
        }
    }
}
