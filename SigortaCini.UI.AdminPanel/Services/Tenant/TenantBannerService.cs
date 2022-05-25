using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Tenant;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Tenant
{
    public interface ITenantBannerService
    {
        ApiResult<TenantBannerDTO> Create(CreateTenantBannerRequestDTO model);
        ApiResult<TenantBannerDTO> Update(uint id, CreateTenantBannerRequestDTO model);
        ApiResult<IEnumerable<TenantBannerDTO>> GetAll();
        ApiResult<TenantBannerDTO> GetById(uint id);
    }
    public class TenantBannerService : ITenantBannerService, IScopedService
    {
        readonly RestfulClient _restfulClient;
        public TenantBannerService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<TenantBannerDTO> Create(CreateTenantBannerRequestDTO model)
        {
            return _restfulClient.Post<ApiResult<TenantBannerDTO>>("tenantbanner/Create", model);
        }


        public ApiResult<TenantBannerDTO> Update(uint id, CreateTenantBannerRequestDTO model)
        {
            return _restfulClient.Put<ApiResult<TenantBannerDTO>>("tenantbanner/update?id=" + id.ToString(), model);
        }

        public ApiResult<IEnumerable<TenantBannerDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<TenantBannerDTO>>>("tenantbanner/GetAll");
        }

        public ApiResult<TenantBannerDTO> GetById(uint id)
        {
            return _restfulClient.Get<ApiResult<TenantBannerDTO>>("tenantbanner/GetById", new { id });
        }
    }
}
