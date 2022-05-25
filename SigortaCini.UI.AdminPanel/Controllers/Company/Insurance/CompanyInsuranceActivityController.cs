using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Company.Insurance;
using SigortaCini.UI.AdminPanel.Models.ViewModel.Company.Insurance;
using SigortaCini.UI.AdminPanel.Services.Company;
using SigortaCini.UI.AdminPanel.Services.Insurance;

namespace SigortaCini.UI.AdminPanel.Controllers.Company.Insurance
{
    public class CompanyInsuranceActivityController : BaseController
    {
        ICompanyService _companyService;
        ICompanyInsuranceActivityService _companyInsuranceActivityService;

        public CompanyInsuranceActivityController(
            ICompanyService companyService,
            ICompanyInsuranceActivityService companyInsuranceActivityService)
        {
            _companyService = companyService;
            _companyInsuranceActivityService = companyInsuranceActivityService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetSettingsByCompanyId(uint companyId)
        {
            var allWsConfigs = _companyInsuranceActivityService.GetByCompanyId(companyId);

            if (allWsConfigs == null || allWsConfigs.Data == null || allWsConfigs.HasError)
            {
                return Json(allWsConfigs);
            }

            return Json(new
            {
                Data = allWsConfigs.Data.Select(x => new
                {
                    x.CompanyId,
                    CompanyName = GetCompanyName(x.CompanyId),
                    x.IsActive,
                    ActiveString = x.IsActive ? "Aktif" : "Aktif Değil",
                    x.CompanyInsuranceActivityId,
                    x.ProductId,
                    ProductName = GetProductNameActivity((uint)x.ProductId),
                    x.VariantId
                })?.OrderBy(x => x.ProductName)?.ThenBy(x => x.CompanyInsuranceActivityId),
                allWsConfigs.HasError,
                allWsConfigs.Message
            });
        }

        private object GetProductNameActivity(uint productId)
        {
            switch (productId)
            {
                
                case 3:
                    return "Casco Quotation";
                case 4:
                    return "Traffic Quotation";
                default:
                    return "Bilinmiyor";
            }
        }

        [HttpPost]
        public JsonResult SaveCompanyInsuranceActivity(CompanyInsuranceActivityModel input)
        {
            var serviceInput = new List<CompanyInsuranceActivityDTO>();
            foreach (var productId in input.ProductIds)
            {
                serviceInput.Add(new CompanyInsuranceActivityDTO()
                {
                    CompanyId = (int)input.CompanyId,
                    CompanyInsuranceActivityId = (int)productId,
                    IsActive = true
                });
            }
            var result = _companyInsuranceActivityService.SaveCompanyInsuranceActivities(serviceInput);
            return Json(result);
        }
    }
}