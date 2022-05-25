using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Product;
using SigortaCini.UI.AdminPanel.Services.Product.CategoryGroup;

namespace SigortaCini.UI.AdminPanel.Controllers.Product
{
    public class ProductCategoryGroupController : BaseController
    {
        IProductCategoryGroupService ProductCategoryGroupService;
        public ProductCategoryGroupController(IProductCategoryGroupService productCategoryGroupService)
        {
            ProductCategoryGroupService = productCategoryGroupService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllProductCategoryGroups() {
            return Json(ProductCategoryGroupService.GetAllProductCategoryGroups());
        }
        public JsonResult GetProductCategoryGroupById(uint id) {
            return Json(ProductCategoryGroupService.GetProductCategoryGroupById(id));
        }
        public JsonResult InsertOrUpdateProductCategoryGroup(ProductCategoryGroupDTO input) {
            return Json(ProductCategoryGroupService.InsertOrUpdateProductCategoryGroup(input));
        }
        public JsonResult GetAllProductCategoryGroupListByCatGroupId(uint catGroupId) {
            return Json(ProductCategoryGroupService.GetAllProductCategoryGroupListByCatGroupId(catGroupId));
        }
        public JsonResult GetAllMidCategoriesByCategoryGroupId(uint catGroupId) {
            return Json(ProductCategoryGroupService.GetAllMidCategoriesByCategoryGroupId(catGroupId));
        }
        public JsonResult GetAllProductCategoryGroupList() {
            return Json(ProductCategoryGroupService.GetAllProductCategoryGroupList());
        }
        public JsonResult InsertOrDeleteProductCategoryGroupList(ProductCategoryGroupListRequestDTO input) {
            return Json(ProductCategoryGroupService.InsertOrDeleteProductCategoryGroupList(input));
        }

    }
}