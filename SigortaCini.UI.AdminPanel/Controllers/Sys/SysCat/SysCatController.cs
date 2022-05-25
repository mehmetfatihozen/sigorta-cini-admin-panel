using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.LeadSysTypeCat;
using SigortaCini.UI.AdminPanel.Services.LeadSysTypeCat;

namespace SigortaCini.UI.AdminPanel.Controllers.Sys.SysCat
{
    public class SysCatController : BaseController
    {
        private readonly ILeadSysTypeCatService _leadSysTypeCatService;

        public SysCatController(ILeadSysTypeCatService leadSysTypeCatService)
        {
            _leadSysTypeCatService = leadSysTypeCatService;
        }

        public JsonResult GetAll()
        {
            return Json(_leadSysTypeCatService.GetAll());
        }

        public JsonResult GetById(uint id)
        {
            return Json(_leadSysTypeCatService.GetById(id));
        }

        public JsonResult Update(LeadSysTypeCatDTO model)
        {
            return Json(_leadSysTypeCatService.Update(model));
        }

        public JsonResult Create(LeadSysTypeCatDTO model)
        {
            return Json(_leadSysTypeCatService.Create(model));
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}