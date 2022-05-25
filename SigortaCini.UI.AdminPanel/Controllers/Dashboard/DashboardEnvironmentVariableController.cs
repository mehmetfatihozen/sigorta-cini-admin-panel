using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Dashboard;
using SigortaCini.UI.AdminPanel.Services.Dashboard;

namespace SigortaCini.UI.AdminPanel.Controllers.Dashboard
{
    public class DashboardEnvironmentVariableController : BaseController
    {
        IDashboardEnvironmentVariableService _dashboardEnvironmentVariableService;

        public DashboardEnvironmentVariableController(IDashboardEnvironmentVariableService dashboardEnvironmentVariableService)
        {
            _dashboardEnvironmentVariableService = dashboardEnvironmentVariableService;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ApiResult<DashboardEnvironmentVariableDTO> GetDashboardEnvironmentVariable()
        {
            return _dashboardEnvironmentVariableService.GetDashboardEnvironmentVariable();
        }

        [HttpGet]
        public ApiResult<int> GetLeadCount()
        {
            return _dashboardEnvironmentVariableService.GetLeadCount();
        }

        [HttpGet]
        public ApiResult<int> GetCustomerCount()
        {
            return _dashboardEnvironmentVariableService.GetCustomerCount();
        }

    }
}