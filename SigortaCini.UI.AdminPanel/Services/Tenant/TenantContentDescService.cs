using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Tenant;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Tenant
{
    public interface ITenantContentDescService
    {
        ApiResult<TenantContentDescDTO> Create(CreateTenantContentDescRequestDTO model);
        ApiResult<TenantContentDescDTO> Update(uint id, CreateTenantContentDescRequestDTO model);
        ApiResult<IEnumerable<TenantContentDescDTO>> GetAll();
        ApiResult<TenantContentDescDTO> GetById(uint id);
    }
    public class TenantContentDescService : ITenantContentDescService, IScopedService
    {
        readonly RestfulClient _restfulClient;
        public TenantContentDescService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<TenantContentDescDTO> Create(CreateTenantContentDescRequestDTO model)
        {
            return _restfulClient.Post<ApiResult<TenantContentDescDTO>>("tenantcontentdesc/Create", model);
        }


        public ApiResult<TenantContentDescDTO> Update(uint id, CreateTenantContentDescRequestDTO model)
        {
            return _restfulClient.Put<ApiResult<TenantContentDescDTO>>("tenantcontentdesc/update?id=" + id.ToString(), model);
        }

        public ApiResult<IEnumerable<TenantContentDescDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<TenantContentDescDTO>>>("tenantcontentdesc/GetAll");
        }

        public ApiResult<TenantContentDescDTO> GetById(uint id)
        {
            return _restfulClient.Get<ApiResult<TenantContentDescDTO>>("tenantcontentdesc/GetById", new { id });
        }
    }
}
