using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO;
using SigortaCini.UI.AdminPanel.Models.DTO;
using SigortaCini.UI.AdminPanel.Services.OfferReport;
using System;

namespace SigortaCini.UI.AdminPanel.Controllers.OfferReport
{
    public class OfferReportController : Controller
    {
        readonly IOfferReportService _offerReportService;

        public OfferReportController(IOfferReportService offerReportService)
        {
            _offerReportService = offerReportService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetOfferReportByProduct(OfferReportByProductDTO input)
        {
            if (input.CreatedDateFrom != DateTime.MinValue && input.CreatedDateTo != DateTime.MinValue)
            {
                input.CreatedDateRange = new DateTimeRangeDTO { FromDate = input.CreatedDateFrom, ToDate = input.CreatedDateTo };
            }

            return Json(_offerReportService.GetOfferReportByProduct(input));
        }

        [HttpPost]
        public JsonResult GetOfferReportByCompany(OfferReportByCompanyDTO input)
        {
            if (input.CreatedDateFrom != DateTime.MinValue && input.CreatedDateTo != DateTime.MinValue)
            {
                input.CreatedDateRange = new DateTimeRangeDTO { FromDate = input.CreatedDateFrom, ToDate = input.CreatedDateTo };
            }

            return Json(_offerReportService.GetOfferReportByCompany(input));
        }

        [HttpPost]
        public JsonResult CreateOfferReportExcelFile(OfferReportByProductDTO input)
        {
            if (input.CreatedDateFrom != DateTime.MinValue && input.CreatedDateTo != DateTime.MinValue)
            {
                input.CreatedDateRange = new DateTimeRangeDTO { FromDate = input.CreatedDateFrom, ToDate = input.CreatedDateTo };
            }

            return Json(_offerReportService.CreateOfferReportExcelFile(input));
        }
    }
}
