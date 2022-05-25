using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Report;
using SigortaCini.UI.AdminPanel.Services.UserPerformanceReport;

namespace SigortaCini.UI.AdminPanel.Controllers.UserPerformanceReport
{
    public class UserPerformanceReportController : Controller
    {
        readonly IUserPerformanceReportService _userPerformanceReportService;

        public UserPerformanceReportController(IUserPerformanceReportService userPerformanceReportService)
        {
            _userPerformanceReportService = userPerformanceReportService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetUserPerformanceReport(UserPerformanceReportRequestDTO input)
        {
            return Json(_userPerformanceReportService.GetUserPerformanceReport(input));
        }
    }
}
