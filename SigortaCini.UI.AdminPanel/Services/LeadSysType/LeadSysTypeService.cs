using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.LeadSysType;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.LeadSysType
{
    public interface ILeadSysTypeService
    {
        ApiResult<IEnumerable<LeadSysTypeDTO>> GetAll();
        ApiResult<LeadSysTypeDTO> GetById(uint id);
        ApiResult<LeadSysTypeDTO> Update(LeadSysTypeDTO model);
        ApiResult<LeadSysTypeDTO> Create(LeadSysTypeDTO model);
    }

    public class LeadSysTypeService : ILeadSysTypeService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public LeadSysTypeService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<IEnumerable<LeadSysTypeDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<LeadSysTypeDTO>>>("LeadSysType/GetAll");
        }

        public ApiResult<LeadSysTypeDTO> GetById(uint id)
        {
            return _restfulClient.Get<ApiResult<LeadSysTypeDTO>>("LeadSysType/GetById", new { id });
        }

        public ApiResult<LeadSysTypeDTO> Update(LeadSysTypeDTO model)
        {
            return _restfulClient.Put<ApiResult<LeadSysTypeDTO>>("LeadSysType/Update", model);
        }

        public ApiResult<LeadSysTypeDTO> Create(LeadSysTypeDTO model)
        {
            return _restfulClient.Post<ApiResult<LeadSysTypeDTO>>("LeadSysType/Create", model);
        }
    }
}
