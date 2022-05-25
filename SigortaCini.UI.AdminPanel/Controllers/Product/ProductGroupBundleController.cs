using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Product;
using SigortaCini.UI.AdminPanel.Services.Product.GroupBundle;

namespace SigortaCini.UI.AdminPanel.Controllers.Product
{
    public class ProductGroupBundleController : BaseController
    {
        readonly IProductGroupBundleService ProductGroupBundleService;
        public ProductGroupBundleController(IProductGroupBundleService productGroupBundleService)
        {
            ProductGroupBundleService = productGroupBundleService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllProductGroupBundleList()
        {
            return Json(ProductGroupBundleService.GetAllProductGroupBundleList());
        }

        public JsonResult GetAllProductGroupBundleListGroupId(uint groupId)
        {
            return Json(ProductGroupBundleService.GetAllProductGroupBundleListGroupId(groupId));
        }

        public JsonResult InsertOrDeleteProductGroupBundle(ProductGroupBundleIORequest input)
        {
            return Json(ProductGroupBundleService.InsertOrDeleteProductGroupBundle(input));
        }

        public JsonResult GetAllMidCategoriesByGroupId(uint groupId)
        {
            return Json(ProductGroupBundleService.GetAllMidCategoriesByGroupId(groupId));
        }

    }
}