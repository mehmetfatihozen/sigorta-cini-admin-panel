using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.LeadSysTypeCat;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.LeadSysTypeCat
{
    public interface ILeadSysTypeCatService
    {
        ApiResult<IEnumerable<LeadSysTypeCatDTO>> GetAll();
        ApiResult<LeadSysTypeCatDTO> GetById(uint id);
        ApiResult<LeadSysTypeCatDTO> Update(LeadSysTypeCatDTO model);
        ApiResult<LeadSysTypeCatDTO> Create(LeadSysTypeCatDTO model);
    }

    public class LeadSysTypeCatService : ILeadSysTypeCatService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public LeadSysTypeCatService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<IEnumerable<LeadSysTypeCatDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<LeadSysTypeCatDTO>>>("LeadSysTypeCat/GetAll");
        }

        public ApiResult<LeadSysTypeCatDTO> GetById(uint id)
        {
            return _restfulClient.Get<ApiResult<LeadSysTypeCatDTO>>("LeadSysTypeCat/GetById", new { id });
        }

        public ApiResult<LeadSysTypeCatDTO> Update(LeadSysTypeCatDTO model)
        {
            return _restfulClient.Put<ApiResult<LeadSysTypeCatDTO>>("LeadSysTypeCat/Update", model);
        }

        public ApiResult<LeadSysTypeCatDTO> Create(LeadSysTypeCatDTO model)
        {
            return _restfulClient.Post<ApiResult<LeadSysTypeCatDTO>>("LeadSysTypeCat/Create", model);
        }
    }
}
