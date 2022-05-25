using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Dashboard;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Services.Dashboard
{
    public interface IDashboardEnvironmentVariableService
    {
        ApiResult<DashboardEnvironmentVariableDTO> GetDashboardEnvironmentVariable();
        ApiResult<int> GetLeadCount();
        ApiResult<int> GetCustomerCount();
    }

    public class DashboardEnvironmentVariableService : IDashboardEnvironmentVariableService, IScopedService
    {
        RestfulClient _restfulClient;

        public DashboardEnvironmentVariableService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<DashboardEnvironmentVariableDTO> GetDashboardEnvironmentVariable()
        {
            return _restfulClient.Get<ApiResult<DashboardEnvironmentVariableDTO>>("DashboardEnvironmentVariable/GetDashboardEnvironmentVariable");
        }

        public ApiResult<int> GetLeadCount()
        {
            return _restfulClient.Get<ApiResult<int>>("DashboardEnvironmentVariable/GetLeadCount");
        }

        public ApiResult<int> GetCustomerCount()
        {
            return _restfulClient.Get<ApiResult<int>>("DashboardEnvironmentVariable/GetCustomerCount");
        }
    }
}
