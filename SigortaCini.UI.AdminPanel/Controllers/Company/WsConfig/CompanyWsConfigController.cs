using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Company.WsConfig;
using SigortaCini.UI.AdminPanel.Services.Company;
using SigortaCini.UI.AdminPanel.Services.Company.WsConfig;

namespace SigortaCini.UI.AdminPanel.Controllers.Company.WsConfig
{
    public class CompanyWsConfigController : BaseController
    {
        ICompanyService _companyService;
        ICompanyWsConfigService _companyWsConfigService;

        public CompanyWsConfigController(ICompanyService companyService, ICompanyWsConfigService companyWsConfigService)
        {
            _companyService = companyService;
            _companyWsConfigService = companyWsConfigService;
        }

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult CompanyBased()
        {
            return View();
        }
        [HttpPost]
        public JsonResult SaveCompanyWsConfig(CompanyWsConfigDTO input)
        {
            if (input.CompanyWsId <= 0 || string.IsNullOrEmpty(input.Key) || string.IsNullOrEmpty(input.Value))
            {
                return Json(new
                {
                    Data = new Object(),
                    HasError = true,
                    Message = "Input geçerli değil"
                });
            }
            var result = _companyWsConfigService.Update((uint)input.CompanyWsId, input);
            return Json(result);
        }

        public JsonResult GetSettingsByCompanyId(uint companyId)
        {
            var allWsConfigs = _companyWsConfigService.GetByCompanyId(companyId);

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
                    x.Active,
                    ActiveString = x.Active ? "Aktif" : "Aktif Değil",
                    x.CompanyWsId,
                    x.Key,
                    x.ProductId,
                    ProductName = GetProductName(x.ProductId),
                    x.Value,
                    x.VariantId
                })?.OrderBy(x => x.ProductName)?.ThenBy(x => x.CompanyWsId),
                allWsConfigs.HasError,
                allWsConfigs.Message
            });
        }

        public JsonResult GetAllWsConfigs(uint companyId)
        {
            var allWsConfigs = _companyWsConfigService.GetByCompanyId(companyId);

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
                    x.Active,
                    ActiveString = x.Active ? "Aktif" : "Aktif Değil",
                    x.CompanyWsId,
                    x.Key,
                    x.ProductId,
                    ProductName = GetProductName(x.ProductId),
                    x.Value,
                    x.VariantId
                })?.OrderBy(x => x.ProductName)?.ThenBy(x => x.CompanyWsId),
                allWsConfigs.HasError,
                allWsConfigs.Message
            });
        }
    }
}