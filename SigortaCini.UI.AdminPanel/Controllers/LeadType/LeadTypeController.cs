using Microsoft.AspNetCore.Mvc;
using SigortaCini.UI.AdminPanel.Services.LeadType;

namespace SigortaCini.UI.AdminPanel.Controllers.LeadType
{
    public class LeadTypeController : BaseController
    {
        private readonly ILeadTypeService _leadTypeService;

        public LeadTypeController(ILeadTypeService leadTypeService)
        {
            _leadTypeService = leadTypeService;
        }

        public JsonResult GetAll()
        {
            return Json(_leadTypeService.GetAll());
        }
    }
}