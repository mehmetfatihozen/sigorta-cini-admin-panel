using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Product;
using SigortaCini.UI.AdminPanel.Services.Product.MidCategory;

namespace SigortaCini.UI.AdminPanel.Controllers.Product
{
    public class ProductMidCategoryController : BaseController
    {
        readonly IProductMidCategoryService MidCategoryService;

        public ProductMidCategoryController(IProductMidCategoryService midCategoryService)
        {
            MidCategoryService = midCategoryService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetAll()
        {
            return Json(MidCategoryService.GetAll());
        }

        public JsonResult GetProductMidCategoryById(uint productMidCatId)
        {
            return Json(MidCategoryService.GetProductMidCategoryById(productMidCatId));
        }

        public JsonResult InsertOrUpdateMidCategory(ProductMidCategoryRequestDTO input)
        {
            return Json(MidCategoryService.InsertOrUpdateMidCategory(input));
        }

        public JsonResult GetAllByGroup()
        {
            return Json(MidCategoryService.GetAllByGroup());
        }

    }
}