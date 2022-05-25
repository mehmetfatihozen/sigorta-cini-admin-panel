using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Tenant;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Tenant
{
    public interface ITenantBannerTypeService
    {
        ApiResult<IEnumerable<TenantBannerTypeDTO>> GetAll();
    }
    public class TenantBannerTypeService : ITenantBannerTypeService, IScopedService
    {
        readonly RestfulClient _restfulClient;
        public TenantBannerTypeService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<IEnumerable<TenantBannerTypeDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<TenantBannerTypeDTO>>>("tenantbannertype/GetAll");
        }
    }
}
