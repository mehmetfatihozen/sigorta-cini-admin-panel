using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Tenant;
using SigortaCini.UI.AdminPanel.Services.Tenant;

namespace SigortaCini.UI.AdminPanel.Controllers.Tenant
{
    public class TenantProductMidCategoryController : BaseController
    {
        private readonly ITenantProductMidCategoryService _tenantProductMidCategoryService;

        public TenantProductMidCategoryController(ITenantProductMidCategoryService tenantProductMidCategoryService)
        {
            _tenantProductMidCategoryService = tenantProductMidCategoryService;
        }

        public JsonResult Create(TenantProductMidCategoryRequestDTO model)
        {
            return Json(_tenantProductMidCategoryService.Create(model));
        }

        public JsonResult Update(TenantProductMidCategoryRequestDTO model)
        {
            return Json(_tenantProductMidCategoryService.Update(model));
        }

        public JsonResult GetById(uint id)
        {
            return Json(_tenantProductMidCategoryService.GetById(id));
        }

        public JsonResult GetAll()
        {
            return Json(_tenantProductMidCategoryService.GetAll());
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}