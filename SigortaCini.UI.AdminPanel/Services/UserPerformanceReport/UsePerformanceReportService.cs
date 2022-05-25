using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Report;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.UserPerformanceReport
{
    public interface IUserPerformanceReportService
    {
        ApiResult<List<UserPerformanceReportResponseDTO>> GetUserPerformanceReport(UserPerformanceReportRequestDTO input);
    }

    public class UsePerformanceReportService : IUserPerformanceReportService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public UsePerformanceReportService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}"); ;
        }

        public ApiResult<List<UserPerformanceReportResponseDTO>> GetUserPerformanceReport(UserPerformanceReportRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<List<UserPerformanceReportResponseDTO>>>("UserPerformanceReport/GetUserPerformanceReport", input);
        }
    }
}
