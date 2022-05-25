using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Parameter;
using SigortaCini.UI.AdminPanel.Services.Quotation;

namespace SigortaCini.UI.AdminPanel.Controllers.DynamicInsurance
{
    public class DynamicInsuranceController : Controller
    {
        IQuotationParameterCompanyService _quotationParameterCompanyService;

        public DynamicInsuranceController(IQuotationParameterCompanyService quotationParameterCompanyService)
        {
            _quotationParameterCompanyService = quotationParameterCompanyService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetAll()
        {
            return Json(_quotationParameterCompanyService.GetAll());
        }

        public JsonResult Update(QuotationParameterCompanyDTO model)
        {
            return Json(_quotationParameterCompanyService.Update(model));
        }

        public JsonResult GetById(uint id)
        {
            return Json(_quotationParameterCompanyService.GetById(id));
        }

    }
}