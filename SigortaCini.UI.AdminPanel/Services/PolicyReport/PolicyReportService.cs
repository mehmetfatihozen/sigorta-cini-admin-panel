using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.PolicyReport;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;

namespace SigortaCini.UI.AdminPanel.Services.PolicyReport
{
    public interface IPolicyReportService
    {
        ApiResult<PolicyReportResponseDTO> GetPolicyReport(PolicyReportRequestDTO input);
    }

    public class PolicyReportService : IPolicyReportService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public PolicyReportService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}"); ;
        }

        public ApiResult<PolicyReportResponseDTO> GetPolicyReport(PolicyReportRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<PolicyReportResponseDTO>>("PolicyReport/GetPolicyReport", input);
        }
    }
}
