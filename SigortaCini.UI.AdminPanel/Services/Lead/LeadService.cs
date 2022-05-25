using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Lead;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Lead
{
    public interface ILeadService
    {
        ApiResult<IEnumerable<LeadDTO>> GetAll();
        ApiResult<IEnumerable<LeadExcelDTO>> GetAllForExcel(DateTimeRangeDTO input);
    }

    public class LeadService : ILeadService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public LeadService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<IEnumerable<LeadDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<LeadDTO>>>("Lead/GetAll");
        }

        public ApiResult<IEnumerable<LeadExcelDTO>> GetAllForExcel(DateTimeRangeDTO input)
        {
            return _restfulClient.Post<ApiResult<IEnumerable<LeadExcelDTO>>>("Lead/GetAllForExcel", input);
        }
    }
}
