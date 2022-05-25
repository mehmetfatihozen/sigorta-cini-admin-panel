using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Tenant;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Tenant
{
    public interface ITenantService
    {
        ApiResult<TenantCreateResponseDTO> Create(TenantCreateRequestDTO model);
        ApiResult<TenantCreateResponseDTO> Update(TenantCreateRequestDTO model);
        ApiResult<IEnumerable<TenantDTO>> GetAll();
        ApiResult<TenantDTO> GetById(uint id);
        ApiResult<TenantDTO> GetTenantProductLink(TenantDTO model);
        ApiResult<TenantCompanyMidCatMultipleResponseDTO> CreateMany(TenantCompanyMidCatMultipleRequestDTO input);
    }
    public class TenantService : ITenantService, IScopedService
    {
        readonly RestfulClient _restfulClient;
        public TenantService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<TenantCreateResponseDTO> Create(TenantCreateRequestDTO model)
        {
            return _restfulClient.Post<ApiResult<TenantCreateResponseDTO>>("tenant/Create", model);
        }

        public ApiResult<TenantDTO> GetTenantProductLink(TenantDTO model)
        {
            return _restfulClient.Post<ApiResult<TenantDTO>>("tenant/GetTenantProductLink", model);
        }

        public ApiResult<TenantCreateResponseDTO> Update(TenantCreateRequestDTO model)
        {
            return _restfulClient.Put<ApiResult<TenantCreateResponseDTO>>("tenant/update", model);
        }

        public ApiResult<TenantCompanyMidCatMultipleResponseDTO> CreateMany(TenantCompanyMidCatMultipleRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<TenantCompanyMidCatMultipleResponseDTO>>("tenant/CreateMany", input);
        }

        public ApiResult<IEnumerable<TenantDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<TenantDTO>>>("tenant/GetAll");
        }

        public ApiResult<TenantDTO> GetById(uint id)
        {
            return _restfulClient.Get<ApiResult<TenantDTO>>("tenant/GetById", new { id });
        }
    }
}
