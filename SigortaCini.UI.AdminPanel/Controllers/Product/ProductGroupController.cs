using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Product;
using SigortaCini.UI.AdminPanel.Services.Product.Group;

namespace SigortaCini.UI.AdminPanel.Controllers.Product
{
    public class ProductGroupController : BaseController
    {

        readonly IProductGroupService ProductGroupService;

        public ProductGroupController(IProductGroupService productGroupService)
        {
            ProductGroupService = productGroupService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllProductGroups()
        {
            return Json(ProductGroupService.GetAllProductGroups());
        }

        public JsonResult GetProductGroupById(uint id)
        {
            return Json(ProductGroupService.GetProductGroupById(id));
        }

        public JsonResult InsertOrUpdateProductGroup(ProductGroupDTO input)
        {
            return Json(ProductGroupService.InsertOrUpdateProductGroup(input));
        }

    }
}