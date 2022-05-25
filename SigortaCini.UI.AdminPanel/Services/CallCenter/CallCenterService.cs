using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.CallCenter;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.CallCenter
{
    public interface ICallCenterService
    {
        ApiResult<IEnumerable<AdminCallCenterLeadDTO>> GetAllLead();
        ApiResult<IEnumerable<AdminCallCenterLeadReportResponseDTO>> LeadReports(AdminCallCenterLeadReportRequestDTO input);
    }
    public class CallCenterService : ICallCenterService, IScopedService
    {
        private readonly RestfulClient _restfulClient;

        public CallCenterService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<IEnumerable<AdminCallCenterLeadDTO>> GetAllLead()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<AdminCallCenterLeadDTO>>>("CallCenter/GetAllLead");
        }

        public ApiResult<IEnumerable<AdminCallCenterLeadReportResponseDTO>> LeadReports(AdminCallCenterLeadReportRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<IEnumerable<AdminCallCenterLeadReportResponseDTO>>>("CallCenter/LeadReports", input);
        }
    }
}
