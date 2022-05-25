using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.LeadAssignGroup;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.LeadAssignGroup
{
    public interface ILeadAssignGroupService
    {
        ApiResult<LeadAssignGroupDTO> Create(LeadAssignGroupDTO model);
        ApiResult<LeadAssignGroupDTO> Update(LeadAssignGroupDTO model);
        void Delete(uint id);
        ApiResult<LeadAssignGroupDTO> GetById(uint id);
        ApiResult<IEnumerable<LeadAssignGroupDTO>> GetAll();
        ApiResult<IEnumerable<LeadAssignGroupDTO>> GetAllByParentId(uint id);
    }
    public class LeadAssignGroupService : ILeadAssignGroupService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public LeadAssignGroupService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<LeadAssignGroupDTO> Create(LeadAssignGroupDTO model)
        {
            return _restfulClient.Post<ApiResult<LeadAssignGroupDTO>>("LeadAssignGroup/Create", model);
        }

        public ApiResult<LeadAssignGroupDTO> Update(LeadAssignGroupDTO model)
        {
            return _restfulClient.Put<ApiResult<LeadAssignGroupDTO>>("LeadAssignGroup/Update", model);
        }

        public void Delete(uint id)
        {
            _restfulClient.Delete<ApiResult<LeadAssignGroupDTO>>("LeadAssignGroup/" + id.ToString(), id);
        }

        public ApiResult<LeadAssignGroupDTO> GetById(uint id)
        {
            return _restfulClient.Get<ApiResult<LeadAssignGroupDTO>>("LeadAssignGroup/GetById", new { id });
        }

        public ApiResult<IEnumerable<LeadAssignGroupDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<LeadAssignGroupDTO>>>("LeadAssignGroup/GetAll");
        }

        public ApiResult<IEnumerable<LeadAssignGroupDTO>> GetAllByParentId(uint id)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<LeadAssignGroupDTO>>>("LeadAssignGroup/GetAllByParentId", new { id });
        }
    }
}
