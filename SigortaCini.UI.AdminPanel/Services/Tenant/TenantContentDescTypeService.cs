using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Tenant;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Tenant
{
    public interface ITenantContentDescTypeService
    {
        ApiResult<IEnumerable<TenantContentDescTypeDTO>> GetAll();
    }
    public class TenantContentDescTypeService : ITenantContentDescTypeService, IScopedService
    {
        readonly RestfulClient _restfulClient;
        public TenantContentDescTypeService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<IEnumerable<TenantContentDescTypeDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<TenantContentDescTypeDTO>>>("tenantcontentdesctype/GetAll");
        }
    }
}
