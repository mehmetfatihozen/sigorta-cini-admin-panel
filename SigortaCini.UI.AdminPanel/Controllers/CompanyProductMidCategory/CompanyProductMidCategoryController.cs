using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Company.ProductMidCategory;
using SigortaCini.UI.AdminPanel.Models.DTO;
using SigortaCini.UI.AdminPanel.Services.Company.ProductMidCategory;

namespace SigortaCini.UI.AdminPanel.Controllers.CompanyProductMidCategory
{
    public class CompanyProductMidCategoryController : Controller
    {
        readonly ICompanyProductMidCategoryService _companyProductMidCategoryService;

        public CompanyProductMidCategoryController(ICompanyProductMidCategoryService companyProductMidCategoryService)
        {
            _companyProductMidCategoryService = companyProductMidCategoryService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetAll()
        {
            return Json(_companyProductMidCategoryService.GetAll());
        }

        public JsonResult GetAllByEgmTramer()
        {
            return Json(_companyProductMidCategoryService.GetAllByEgmTramer());
        }

        public JsonResult GetAllByIdentity()
        {
            return Json(_companyProductMidCategoryService.GetAllByIdentity());
        }

        public JsonResult GetByCompanyId(uint companyId)
        {
            return Json(_companyProductMidCategoryService.GetByCompanyId(companyId));
        }

        public JsonResult Get(uint id)
        {
            return Json(_companyProductMidCategoryService.Get(id));
        }

        public JsonResult Create(CompanyProductMidCategoryCreateRequestDTO input)
        {
            return Json(_companyProductMidCategoryService.Create(input));
        }

        public JsonResult Update(uint id, CompanyProductMidCategoryUpdateRequestDTO input)
        {
            return Json(_companyProductMidCategoryService.Update(id, input));
        }

        public JsonResult Delete(uint id)
        {
            _companyProductMidCategoryService.Delete(id);
            return Json("succedded");
        }

        public JsonResult SaveCompanyProductMidCategories(IEnumerable<CompanyProductMidCategoryDTO> input)
        {
            return Json(_companyProductMidCategoryService.SaveCompanyProductMidCategoriesByIsB2BActive(input));
        }

        public JsonResult UpdateCompanyProductMidCategoriesByIdentity(CompanyMidCatEgmIdentityModelDto input)
        {
            if (input.CompanyMidCatIds == null)
                input.CompanyMidCatIds = new List<uint>();

            var request = input.CompanyMidCatIds.Select(x => new CompanyProductMidCategoryDTO()
            {
                CompanyProductMidCatId = x
            });
            return Json(_companyProductMidCategoryService.UpdateCompanyProductMidCategoriesByIdentity(request));
        }

        public JsonResult UpdateCompanyProductMidCategoriesByEgmTramer(CompanyMidCatEgmIdentityModelDto input)
        {
            var request = input.CompanyMidCatIds.Select(x => new CompanyProductMidCategoryDTO()
            {
                CompanyProductMidCatId = x
            });
            return Json(_companyProductMidCategoryService.UpdateCompanyProductMidCategoriesByEgmTramer(request));
        }
    }
}