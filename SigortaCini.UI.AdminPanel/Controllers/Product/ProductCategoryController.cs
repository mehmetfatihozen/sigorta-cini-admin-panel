using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Product;
using SigortaCini.UI.AdminPanel.Services.Product.Category;

namespace SigortaCini.UI.AdminPanel.Controllers.Product
{
    public class ProductCategoryController : BaseController
    {

        readonly IProductCategoryService ProductCategoryService;

        public ProductCategoryController(IProductCategoryService productCategoryService)
        {
            ProductCategoryService = productCategoryService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllProductCategories()
        {
            return Json(ProductCategoryService.GetAllProductCategories());
        }

        public JsonResult GetProductCategoryById(uint id)
        {
            return Json(ProductCategoryService.GetProductCategoryById(id));
        }

        public JsonResult InsertOrUpdateProductCategory(ProductCategoryDTO input)
        {
            return Json(ProductCategoryService.InsertOrUpdateProductCategory(input));
        }

    }
}