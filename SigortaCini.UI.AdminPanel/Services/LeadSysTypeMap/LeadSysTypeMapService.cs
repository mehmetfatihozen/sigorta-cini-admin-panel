using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.LeadSysTypeMap;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.LeadSysTypeMap
{
    public interface ILeadSysTypeMapService
    {
        ApiResult<LeadSysTypeMapDTO> GetByCatId(uint id);
        ApiResult<LeadSysTypeMapDTO> CreateAndUpdate(LeadSysTypeMapRequestDTO model);
    }

    public class LeadSysTypeMapService : ILeadSysTypeMapService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public LeadSysTypeMapService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<LeadSysTypeMapDTO> GetByCatId(uint id)
        {
            return _restfulClient.Get<ApiResult<LeadSysTypeMapDTO>>("LeadSysTypeMap/GetByCatId", new { id });
        }

        public ApiResult<LeadSysTypeMapDTO> CreateAndUpdate(LeadSysTypeMapRequestDTO model)
        {
            return _restfulClient.Post<ApiResult<LeadSysTypeMapDTO>>("LeadSysTypeMap/CreateAndUpdate", model);
        }
    }
}
