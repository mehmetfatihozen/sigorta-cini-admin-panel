using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Product;
using SigortaCini.UI.AdminPanel.Services.Product.MidType;

namespace SigortaCini.UI.AdminPanel.Controllers.Product
{
    public class ProductMidTypeController : BaseController
    {
        readonly IProductMidTypeService MidTypeService;

        public ProductMidTypeController(IProductMidTypeService midTypeService)
        {
            MidTypeService = midTypeService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllProductMidTypes()
        {
            return Json(MidTypeService.GetAllProductMidTypes());
        }

        public JsonResult GetProductMidTypeById(uint id)
        {
            return Json(MidTypeService.GetProductMidTypeById(id));
        }

        public JsonResult InsertOrUpdateProductMidType(ProductMidTypeDTO input)
        {
            return Json(MidTypeService.InsertOrUpdateProductMidType(input));
        }
    }
}