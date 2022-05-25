using Microsoft.AspNetCore.Mvc;
using SigortaCini.UI.AdminPanel.Services.LeadSourceType;

namespace SigortaCini.UI.AdminPanel.Controllers.LeadSourceType
{
    public class LeadSourceTypeController : BaseController
    {
        private readonly ILeadSourceTypeService _leadSourceTypeService;

        public LeadSourceTypeController(ILeadSourceTypeService leadSourceTypeService)
        {
            _leadSourceTypeService = leadSourceTypeService;
        }

        public JsonResult GetAll()
        {
            return Json(_leadSourceTypeService.GetAll());
        }
    }
}