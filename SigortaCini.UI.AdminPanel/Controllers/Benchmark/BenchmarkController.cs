using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Report;
using SigortaCini.UI.AdminPanel.Services.Report;

namespace SigortaCini.UI.AdminPanel.Controllers
{
    public class BenchmarkController : Controller
    {
        readonly IReportService _reportService;

        public BenchmarkController(IReportService reportService)
        {
            _reportService = reportService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult ProductReport(ProductReportRequestDTO input)
        {
            return Json(_reportService.ProductReport(input));
        }

        [HttpPost]
        public JsonResult CompanyReport(CompanyReportRequestDTO input)
        {
            return Json(_reportService.CompanyReport(input));
        }
    }
}