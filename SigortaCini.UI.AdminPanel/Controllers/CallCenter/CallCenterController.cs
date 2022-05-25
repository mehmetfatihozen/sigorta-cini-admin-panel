using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.CallCenter;
using SigortaCini.UI.AdminPanel.Services.CallCenter;

namespace SigortaCini.UI.AdminPanel.Controllers
{
    public class CallCenterController : BaseController
    {
        private readonly ICallCenterService _callCenterService;

        public CallCenterController(ICallCenterService callCenterService)
        {
            _callCenterService = callCenterService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ApiResult<IEnumerable<AdminCallCenterLeadDTO>> GetAllLead()
        {
            return _callCenterService.GetAllLead();
        }
    }
}