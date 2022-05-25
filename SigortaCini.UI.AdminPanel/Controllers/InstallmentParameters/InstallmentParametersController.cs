using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.CompanyProduct;
using SigortaCini.UI.AdminPanel.Services.Company.ProductInstallment;

namespace SigortaCini.UI.AdminPanel.Controllers.InstallmentParameters
{
    public class InstallmentParametersController : Controller
    {
        public ICompanyProductInstallmentService _companyProductInstallmentService;

        public InstallmentParametersController(ICompanyProductInstallmentService companyProductInstallmentService)
        {
            _companyProductInstallmentService = companyProductInstallmentService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetAll()
        {
            return Json(_companyProductInstallmentService.GetAll());
        }

        public JsonResult GetById(uint id)
        {
            return Json(_companyProductInstallmentService.Get(id));
        }

        public JsonResult Create(CreateCompanyProductInstallmentRequestDTO input)
        {
            return Json(_companyProductInstallmentService.Create(input));
        }

        public JsonResult Update(CreateCompanyProductInstallmentRequestDTO input)
        {
            return Json(_companyProductInstallmentService.Update(input.CompanyProductInstallmentId, input));
        }

    }
}