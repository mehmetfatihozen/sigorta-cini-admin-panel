using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.LeadSysType;
using SigortaCini.UI.AdminPanel.Services.LeadSysType;

namespace SigortaCini.UI.AdminPanel.Controllers.Sys.SysParameters
{
    public class SysParametersController : BaseController
    {
        private readonly ILeadSysTypeService _leadSysTypeService;

        public SysParametersController(ILeadSysTypeService leadSysTypeService)
        {
            _leadSysTypeService = leadSysTypeService;
        }

        public JsonResult GetAll()
        {
            return Json(_leadSysTypeService.GetAll());
        }

        public JsonResult GetById(uint id)
        {
            return Json(_leadSysTypeService.GetById(id));
        }

        public JsonResult Update(LeadSysTypeDTO model)
        {
            return Json(_leadSysTypeService.Update(model));
        }

        public JsonResult Create(LeadSysTypeDTO model)
        {
            return Json(_leadSysTypeService.Create(model));
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}