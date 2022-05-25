using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.TenantCompanyProductMidCategory;
using SigortaCini.UI.AdminPanel.Services.TenantCompanyProductMidCategory;

namespace SigortaCini.UI.AdminPanel.Controllers.TenantCompanyProductMidCategory
{
    public class TenantCompanyProductMidCategoryController : BaseController
    {
        private readonly ITenantCompanyProductMidCategoryService _tenantCompanyProductMidCategoryService;

        public TenantCompanyProductMidCategoryController(ITenantCompanyProductMidCategoryService tenantCompanyProductMidCategoryService)
        {
            _tenantCompanyProductMidCategoryService = tenantCompanyProductMidCategoryService;
        }

        public JsonResult Create(TenantCompanyProductMidCategoryRequestDTO model)
        {
            return Json(_tenantCompanyProductMidCategoryService.Create(model));
        }

        public JsonResult Update(TenantCompanyProductMidCategoryRequestDTO model)
        {
            return Json(_tenantCompanyProductMidCategoryService.Update(model));
        }

        public JsonResult GetById(uint id)
        {
            return Json(_tenantCompanyProductMidCategoryService.GetById(id));
        }

        public JsonResult GetCompanyProductMidCategoriesByProductId(uint productId)
        {
            return Json(_tenantCompanyProductMidCategoryService.GetCompanyProductMidCategoriesByProductId(productId));
        }

        public JsonResult GetCompanyProductMidCategoryProducts()
        {
            return Json(_tenantCompanyProductMidCategoryService.GetCompanyProductMidCategoryProducts());
        }

        public JsonResult GetAll()
        {
            return Json(_tenantCompanyProductMidCategoryService.GetAll());
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}