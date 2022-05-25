using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Role;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Services.Role
{
    public interface IRoleService
    {
        ApiResult<RoleCreateResponseDTO> Create(RoleCreateRequestDTO input);
        ApiResult<RoleUpdateResponseDTO> Update(uint id, RoleUpdateRequestDTO input);
        void Delete(uint id);
        ApiResult<IEnumerable<RoleDTO>> GetAll();
        ApiResult<RoleDTO> Get(uint id);
    }
    public class RoleService : IRoleService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public RoleService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<RoleCreateResponseDTO> Create(RoleCreateRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<RoleCreateResponseDTO>>("role/roles/", input);
        }

        public void Delete(uint id)
        {
            _restfulClient.Delete<ApiResult<RoleDTO>>("role/roles/" + id.ToString(), id);
        }

        public ApiResult<RoleDTO> Get(uint id)
        {
            return _restfulClient.Get<ApiResult<RoleDTO>>("role/roles/" + id.ToString(), null);
        }

        public ApiResult<IEnumerable<RoleDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<RoleDTO>>>("role/roles/getAll");
        }

        public ApiResult<RoleUpdateResponseDTO> Update(uint id, RoleUpdateRequestDTO input)
        {
            return _restfulClient.Put<ApiResult<RoleUpdateResponseDTO>>("role/roles/" + id.ToString(), input);
        }
    }
}
