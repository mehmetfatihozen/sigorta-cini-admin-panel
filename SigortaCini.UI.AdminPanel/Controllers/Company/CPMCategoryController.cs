using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Company.ProductMidCategory;
using SigortaCini.Framework.Data.DTO.Admin.PaymentProvider;
using SigortaCini.UI.AdminPanel.Models.ViewModel.Company.ProductMidCategory;
using SigortaCini.UI.AdminPanel.Services.Company;
using SigortaCini.UI.AdminPanel.Services.Company.ProductMidCategory;
using SigortaCini.UI.AdminPanel.Services.Product.MidCategory;
using System.Collections.Generic;
using System.Linq;

namespace SigortaCini.UI.AdminPanel.Controllers.Company
{
    //CompanyProductMidCategoryController: CPM
    public class CPMCategoryController : BaseController
    {
        ICompanyService _companyService;
        IProductMidCategoryService _productMidCategoryService;
        ICompanyProductMidCategoryService _companyProductMidCategoryService;

        public CPMCategoryController(
            ICompanyService companyService,
            IProductMidCategoryService productMidCategoryService,
            ICompanyProductMidCategoryService companyProductMidCategoryService)
        {
            _companyService = companyService;
            _productMidCategoryService = productMidCategoryService;
            _companyProductMidCategoryService = companyProductMidCategoryService;
        }

        [HttpPost]
        public JsonResult SaveCompanyProductMidCategoriesByIsB2BActive(CompanyProductMidCategoryModel input)
        {
            var serviceInput = new List<CompanyProductMidCategoryDTO>();
            foreach (var categoryId in input.CategoryIds)
            {
                serviceInput.Add(new CompanyProductMidCategoryDTO()
                {
                    Company = new Framework.Data.DTO.Admin.Company.AdminCompanyDTO()
                    {
                        CompanyId = input.CompanyId
                    },
                    ProductMidCategory = new Framework.Data.DTO.DataManagement.ProductMidCategoryDTO()
                    {
                        ProductMidCatId = categoryId
                    },
                    IsB2bActive = true
                });
            }
            var result = _companyProductMidCategoryService.SaveCompanyProductMidCategoriesByIsB2BActive(serviceInput);
            return Json(result);
        }
        [HttpPost]
        public JsonResult SaveCompanyProductMidCategoriesByIsB2CActive(CompanyProductMidCategoryModel input)
        {
            var serviceInput = new List<CompanyProductMidCategoryDTO>();
            foreach (var categoryId in input.CategoryIds)
            {
                serviceInput.Add(new CompanyProductMidCategoryDTO()
                {
                    Company = new Framework.Data.DTO.Admin.Company.AdminCompanyDTO()
                    {
                        CompanyId = input.CompanyId
                    },
                    ProductMidCategory = new Framework.Data.DTO.DataManagement.ProductMidCategoryDTO()
                    {
                        ProductMidCatId = categoryId
                    },
                    IsB2cActive = true
                });
            }
            var result = _companyProductMidCategoryService.SaveCompanyProductMidCategoriesByIsB2CActive(serviceInput);
            return Json(result);
        }
        [HttpPost]
        public JsonResult SaveCompanyProductMidCategoriesByIsB2BPolicy(CompanyProductMidCategoryModel input)
        {
            var serviceInput = new List<CompanyProductMidCategoryDTO>();
            foreach (var categoryId in input.CategoryIds)
            {
                serviceInput.Add(new CompanyProductMidCategoryDTO()
                {
                    Company = new Framework.Data.DTO.Admin.Company.AdminCompanyDTO()
                    {
                        CompanyId = input.CompanyId
                    },
                    ProductMidCategory = new Framework.Data.DTO.DataManagement.ProductMidCategoryDTO()
                    {
                        ProductMidCatId = categoryId
                    },
                    IsB2bPolicy = true
                });
            }
            var result = _companyProductMidCategoryService.SaveCompanyProductMidCategoriesByIsB2BPolicy(serviceInput);
            return Json(result);
        }
        [HttpPost]
        public JsonResult SaveCompanyProductMidCategoriesByIsB2CPolicy(CompanyProductMidCategoryModel input)
        {
            var serviceInput = new List<CompanyProductMidCategoryDTO>();
            foreach (var categoryId in input.CategoryIds)
            {
                serviceInput.Add(new CompanyProductMidCategoryDTO()
                {
                    Company = new Framework.Data.DTO.Admin.Company.AdminCompanyDTO()
                    {
                        CompanyId = input.CompanyId
                    },
                    ProductMidCategory = new Framework.Data.DTO.DataManagement.ProductMidCategoryDTO()
                    {
                        ProductMidCatId = categoryId
                    },
                    IsB2cPolicy = true
                });
            }
            var result = _companyProductMidCategoryService.SaveCompanyProductMidCategoriesByIsB2CPolicy(serviceInput);
            return Json(result);
        }
        [HttpPost]
        public JsonResult SaveCompanyProductMidCategoriesByIsB2B3D(CPMCModel input)
        {
            var serviceInput = new List<CompanyProductMidCategoryDTO>();
            foreach (var categoryId in input.CategoryIds)
            {
                serviceInput.Add(new CompanyProductMidCategoryDTO()
                {
                    Company = new Framework.Data.DTO.Admin.Company.AdminCompanyDTO()
                    {
                        CompanyId = input.CompanyId
                    },
                    ProductMidCategory = new Framework.Data.DTO.DataManagement.ProductMidCategoryDTO()
                    {
                        ProductMidCatId = categoryId.ProductId
                    },
                    ProductMidCatId = categoryId.ProductId,
                    VariantId = (int)categoryId.VariantId,
                    IsB2b3d = true
                });
            }
            var result = _companyProductMidCategoryService.SaveCompanyProductMidCategoriesByIsB2B3D(serviceInput);
            return Json(result);
        }
        [HttpPost]
        public JsonResult SaveCompanyProductMidCategoriesByIsB2C3D(CPMCModel input)
        {
            var serviceInput = new List<CompanyProductMidCategoryDTO>();
            foreach (var categoryId in input.CategoryIds)
            {
                serviceInput.Add(new CompanyProductMidCategoryDTO()
                {
                    Company = new Framework.Data.DTO.Admin.Company.AdminCompanyDTO()
                    {
                        CompanyId = input.CompanyId
                    },
                    ProductMidCategory = new Framework.Data.DTO.DataManagement.ProductMidCategoryDTO()
                    {
                        ProductMidCatId = categoryId.ProductId
                    },
                    ProductMidCatId = categoryId.ProductId,
                    VariantId = (int)categoryId.VariantId,
                    IsB2c3d = true
                });
            }
            var result = _companyProductMidCategoryService.SaveCompanyProductMidCategoriesByIsB2C3D(serviceInput);
            return Json(result);
        }
        public JsonResult GetAllCompanies()
        {
            var allCompanies = _companyService.GetAll();
            if (allCompanies == null || allCompanies.Data == null || allCompanies.HasError)
            {
                return Json(allCompanies);
            }
            return Json(new
            {
                Data = allCompanies.Data.Select(x => new
                {
                    x.CompanyId,
                    x.CompanyName
                })?.OrderBy(x => x.CompanyName),
                allCompanies.HasError,
                allCompanies.Message
            });

        }
        public JsonResult GetAllProductMidCategories(uint companyId)
        {
            var allCategories = _productMidCategoryService.GetAll();
            var companyCategories = _companyProductMidCategoryService.GetByCompanyId(companyId);
            var companyCategoryIds = new List<uint>();
            if (companyCategories != null && companyCategories.Data != null)
            {
                companyCategoryIds = companyCategories.Data.Where(x => x.ProductMidCategory != null && x.IsB2bActive.HasValue && x.IsB2bActive.Value).Select(x => x.ProductMidCategory.ProductMidCatId).ToList();
            }

            if (allCategories == null || allCategories.Data == null || allCategories.HasError)
            {
                return Json(allCategories);
            }
            return Json(new
            {
                Data = allCategories.Data.Select(x => new
                {
                    x.ProductMidCatDesc,
                    x.ProductMidCatId,
                    IsIncludedByCompany = companyCategoryIds.Contains(x.ProductMidCatId)
                })?.OrderBy(x => x.ProductMidCatDesc),
                allCategories.HasError,
                allCategories.Message
            });

        }
        public JsonResult GetAllProductMidCategoriesByIsB2cActive(uint companyId)
        {
            var allCategories = _productMidCategoryService.GetAll();
            var companyCategories = _companyProductMidCategoryService.GetByCompanyId(companyId);
            var companyCategoryIds = new List<uint>();
            if (companyCategories != null && companyCategories.Data != null)
            {
                companyCategoryIds = companyCategories.Data.Where(x => x.ProductMidCategory != null && x.IsB2cActive.HasValue && x.IsB2cActive.Value).Select(x => x.ProductMidCategory.ProductMidCatId).ToList();
            }

            if (allCategories == null || allCategories.Data == null || allCategories.HasError)
            {
                return Json(allCategories);
            }
            return Json(new
            {
                Data = allCategories.Data.Select(x => new
                {
                    x.ProductMidCatDesc,
                    x.ProductMidCatId,
                    IsIncludedByCompany = companyCategoryIds.Contains(x.ProductMidCatId)
                })?.OrderBy(x => x.ProductMidCatDesc),
                allCategories.HasError,
                allCategories.Message
            });

        }
        public JsonResult GetAllProductMidCategoriesByIsB2bPolicy(uint companyId)
        {
            var allCategories = _productMidCategoryService.GetAll();
            var companyCategories = _companyProductMidCategoryService.GetByCompanyId(companyId);
            var companyCategoryIds = new List<uint>();
            if (companyCategories != null && companyCategories.Data != null)
            {
                companyCategoryIds = companyCategories.Data.Where(x => x.ProductMidCategory != null && x.IsB2bPolicy.HasValue && x.IsB2bPolicy.Value).Select(x => x.ProductMidCategory.ProductMidCatId).ToList();
            }

            if (allCategories == null || allCategories.Data == null || allCategories.HasError)
            {
                return Json(allCategories);
            }
            return Json(new
            {
                Data = allCategories.Data.Select(x => new
                {
                    x.ProductMidCatDesc,
                    x.ProductMidCatId,
                    IsIncludedByCompany = companyCategoryIds.Contains(x.ProductMidCatId)
                })?.OrderBy(x => x.ProductMidCatDesc),
                allCategories.HasError,
                allCategories.Message
            });

        }
        public JsonResult GetAllProductMidCategoriesByIsB2cPolicy(uint companyId)
        {
            var allCategories = _productMidCategoryService.GetAll();
            var companyCategories = _companyProductMidCategoryService.GetByCompanyId(companyId);
            var companyCategoryIds = new List<uint>();
            if (companyCategories != null && companyCategories.Data != null)
            {
                companyCategoryIds = companyCategories.Data.Where(x => x.ProductMidCategory != null && x.IsB2cPolicy.HasValue && x.IsB2cPolicy.Value).Select(x => x.ProductMidCategory.ProductMidCatId).ToList();
            }

            if (allCategories == null || allCategories.Data == null || allCategories.HasError)
            {
                return Json(allCategories);
            }
            return Json(new
            {
                Data = allCategories.Data.Select(x => new
                {
                    x.ProductMidCatDesc,
                    x.ProductMidCatId,
                    IsIncludedByCompany = companyCategoryIds.Contains(x.ProductMidCatId)
                })?.OrderBy(x => x.ProductMidCatDesc),
                allCategories.HasError,
                allCategories.Message
            });

        }
        public JsonResult GetAllProductMidCategoriesByIsB2b3D(uint companyId)
        {
            var allCategories = _productMidCategoryService.GetAll();
            var companyCategories = _companyProductMidCategoryService.GetWithoutVariantByCompanyId(companyId);
            var companyCategoryIds = new List<uint>();
            var variantProducts = _companyProductMidCategoryService.GetVariantProductMidCategoryByCompanyId(companyId);
            if (companyCategories != null && companyCategories.Data != null)
            {
                companyCategoryIds = companyCategories.Data.Where(x => x.ProductMidCategory != null && x.IsB2b3d.HasValue && x.IsB2b3d.Value).Select(x => x.ProductMidCategory.ProductMidCatId).ToList();
            }

            if ((allCategories == null || allCategories.Data == null || allCategories.HasError ) && ( variantProducts == null || variantProducts.Data == null || variantProducts.HasError))
            {
                return Json(allCategories);
            }
            var result = new List<CompanyProductMidCategoryDTO>();
            result.AddRange(allCategories.Data.Select(x => new CompanyProductMidCategoryDTO()
            {
                ProductMidCategory = x,
                VariantId = 1,
                ProductMidCatId = x.ProductMidCatId
            }));
            result.AddRange(variantProducts.Data);           

            return Json(new
            {
                Data = result.Select(x=> new {
                    x.ProductMidCategory,
                    ProductName = x.VariantId == 1 ? x.ProductMidCategory.ProductMidCatDesc : x.ProductName,
                    x.VariantId,
                    x.CompanyProductMidCatId,
                    IsIncludedByCompany = (x.VariantId == 1)? companyCategoryIds.Contains(x.ProductMidCategory.ProductMidCatId): x.IsB2b3d,
                    x.ProductMidCatId
                })?.OrderBy(x=> x.ProductName),
                allCategories.HasError,
                allCategories.Message
            });

        }
        public JsonResult GetAllProductMidCategoriesByIsB2c3D(uint companyId)
        {
            var allCategories = _productMidCategoryService.GetAll();
            var companyCategories = _companyProductMidCategoryService.GetWithoutVariantByCompanyId(companyId);
            var companyCategoryIds = new List<uint>();
            var variantProducts = _companyProductMidCategoryService.GetVariantProductMidCategoryByCompanyId(companyId);

            if (companyCategories != null && companyCategories.Data != null)
            {
                companyCategoryIds = companyCategories.Data.Where(x => x.ProductMidCategory != null && x.IsB2c3d.HasValue && x.IsB2c3d.Value).Select(x => x.ProductMidCategory.ProductMidCatId).ToList();
            }

            if ((allCategories == null || allCategories.Data == null || allCategories.HasError) && (variantProducts == null || variantProducts.Data == null || variantProducts.HasError))
            {
                return Json(allCategories);
            }

            var result = new List<CompanyProductMidCategoryDTO>();
            result.AddRange(allCategories.Data.Select(x => new CompanyProductMidCategoryDTO()
            {
                ProductMidCategory = x,
                VariantId = 1,
                ProductMidCatId = x.ProductMidCatId
            }));
            result.AddRange(variantProducts.Data);

            return Json(new
            {
                Data = result.Select(x => new {
                    x.ProductMidCategory,
                    ProductName = x.VariantId == 1 ? x.ProductMidCategory.ProductMidCatDesc : x.ProductName,
                    x.VariantId,
                    x.CompanyProductMidCatId,
                    IsIncludedByCompany = (x.VariantId == 1) ? companyCategoryIds.Contains(x.ProductMidCategory.ProductMidCatId) : x.IsB2c3d,
                    x.ProductMidCatId
                })?.OrderBy(x => x.ProductName),
                allCategories.HasError,
                allCategories.Message
            });

        }
        public JsonResult GetAllByProductId(uint productid)
        {
            var allCompanies = _companyService.GetAllByProductId(productid);
            if (allCompanies == null || allCompanies.Data == null || allCompanies.HasError)
            {
                return Json(allCompanies);
            }
            return Json(new
            {
                Data = allCompanies.Data.Select(x => new
                {
                    x.CompanyId,
                    x.CompanyName
                })?.OrderBy(x => x.CompanyName),
                allCompanies.HasError,
                allCompanies.Message
            });

        }
        public JsonResult GetShowCreditCardInfoByCompanyId(uint companyId)
        {
            return Json(_companyProductMidCategoryService.GetShowCreditCardInfoByCompanyId(companyId));
        }
        [HttpPost]
        public JsonResult SaveShowCreditCardInfo(PaymentProviderDTO input)
        {
            return Json(_companyProductMidCategoryService.SaveShowCreditCardInfo(input));
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult IsPolicy()
        {
            return View();
        }
        public IActionResult Is3D()
        {
            return View();
        }
    }
}
