using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.CompanyProduct;
using SigortaCini.UI.AdminPanel.Extensions;
using SigortaCini.UI.AdminPanel.Services.Product.Term;

namespace SigortaCini.UI.AdminPanel.Controllers.ProductTerms
{
    public class ProductTermsController : Controller
    {
        private readonly ICompanyProductTermService _companyProductTermService;

        public ProductTermsController(ICompanyProductTermService companyProductTermService)
        {
            _companyProductTermService = companyProductTermService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetAll()
        {
            var result = _companyProductTermService.GetAll();
            if (result.HasError)
            {
                return Json(result);
            }
            return Json(result.Data.Select(x => new
            {
                BirthState = SigortaCiniEnumExtensions.GetEnumDescription(x.BirthState),
                x.CompanyId,
                HasRenewalPeriod = x.HasRenewalPeriod ? "Var" : "Yok",
                x.IsInpatientLimitless,
                x.LayTime,
                x.NumberOfInpatient,
                x.NumberOfOutpatient,
                x.ProductMidCatId,
                x.VariantId,
                x.CompanyProductTermId,
                x.TermLink,
                x.RenewalPeriod,
                x.EntryAge,
                x.EntryAgeRange,
                x.IsBirthTermLimitless,
                x.NumberOfBirthTerm,
                x.HasDieticianService,
                x.HasPsychologicalSupport,
                x.PastDiseases,
                x.ProductMidCat,
                x.Company
            }));
        }
        public JsonResult Create(CreateCompanyProductTermRequestDTO input)
        {
            return Json(_companyProductTermService.Create(input));
        }
        public JsonResult Update(CompanyProductTermDTO model)
        {
            return Json(_companyProductTermService.Update(model.CompanyProductTermId, new CreateCompanyProductTermRequestDTO()
            {
                BirthState = model.BirthState,
                CompanyId = model.CompanyId,
                HasRenewalPeriod = model.HasRenewalPeriod,
                IsInpatientLimitless = model.IsInpatientLimitless,
                LayTime = model.LayTime,
                NumberOfInpatient = model.NumberOfInpatient,
                NumberOfOutpatient = model.NumberOfOutpatient,
                ProductMidCatId = model.ProductMidCatId,
                VariantId = model.VariantId,
                TermLink = model.TermLink,
                RenewalPeriod = model.RenewalPeriod,
                EntryAge = model.EntryAge,
                EntryAgeRange = model.EntryAgeRange,
                IsBirthTermLimitless = model.IsBirthTermLimitless,
                NumberOfBirthTerm = model.NumberOfBirthTerm,
                HasDieticianService = model.HasDieticianService,
                HasPsychologicalSupport = model.HasPsychologicalSupport,
                PastDiseases = model.PastDiseases
            }));
        }

        public JsonResult GetById(uint id)
        {
            return Json(_companyProductTermService.Get(id));
        }

        public JsonResult GetVariantsByCompanyAndProduct(GetVariantRequestDTO model)
        {
            return Json(_companyProductTermService.GetVariantsByCompanyAndProduct(model));
        }
    }
}