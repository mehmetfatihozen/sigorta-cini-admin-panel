using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.LeadAssignGroup;
using SigortaCini.UI.AdminPanel.Services.LeadAssignGroup;

namespace SigortaCini.UI.AdminPanel.Controllers.LeadAssignGroup
{
    public class LeadAssignGroupController : BaseController
    {
        ILeadAssignGroupService _leadAssignGroupService;

        public LeadAssignGroupController(ILeadAssignGroupService leadAssignGroupService)
        {
            _leadAssignGroupService = leadAssignGroupService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult Create(LeadAssignGroupDTO model)
        {
            return Json(_leadAssignGroupService.Create(model));
        }

        public JsonResult Update(LeadAssignGroupDTO model)
        {
            return Json(_leadAssignGroupService.Update(model));
        }

        public JsonResult Delete(uint id)
        {
            _leadAssignGroupService.Delete(id);
            return Json("succedded");
        }

        public JsonResult GetById(uint id)
        {
            return Json(_leadAssignGroupService.GetById(id));
        }

        public JsonResult GetAll()
        {
            return Json(_leadAssignGroupService.GetAll());
        }

        public JsonResult GetAllByParentId()
        {
            return Json(_leadAssignGroupService.GetAll());
        }
    }
}