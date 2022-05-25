using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.LeadSysTypeMap;
using SigortaCini.UI.AdminPanel.Services.LeadSysTypeMap;

namespace SigortaCini.UI.AdminPanel.Controllers.Sys.SysMap
{
    public class SysMapController : BaseController
    {
        private readonly ILeadSysTypeMapService _leadSysTypeMapService;

        public SysMapController(ILeadSysTypeMapService leadSysTypeMapService)
        {
            _leadSysTypeMapService = leadSysTypeMapService;
        }

        public JsonResult GetByCatId(uint id)
        {
            return Json(_leadSysTypeMapService.GetByCatId(id));
        }

        public JsonResult CreateAndUpdate(LeadSysTypeMapRequestDTO model)
        {
            return Json(_leadSysTypeMapService.CreateAndUpdate(model));
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}