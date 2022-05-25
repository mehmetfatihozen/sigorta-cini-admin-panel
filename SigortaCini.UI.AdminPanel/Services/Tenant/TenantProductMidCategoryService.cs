using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Tenant;
using SigortaCini.Framework.Data.DTO.DataManagement;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Tenant
{
    public interface ITenantProductMidCategoryService
    {
        ApiResult<TenantProductMidCategoryDTO> Create(TenantProductMidCategoryRequestDTO model);
        ApiResult<TenantProductMidCategoryDTO> Update(TenantProductMidCategoryRequestDTO model);
        ApiResult<TenantProductMidCategoryDTO> GetById(uint id);
        ApiResult<IEnumerable<TenantProductMidCategoryDTO>> GetAll();
    }

    public class TenantProductMidCategoryService : ITenantProductMidCategoryService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public TenantProductMidCategoryService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<TenantProductMidCategoryDTO> Create(TenantProductMidCategoryRequestDTO model)
        {
            return _restfulClient.Post<ApiResult<TenantProductMidCategoryDTO>>("TenantProductMidCategory/Create", model);
        }

        public ApiResult<TenantProductMidCategoryDTO> Update(TenantProductMidCategoryRequestDTO model)
        {
            return _restfulClient.Put<ApiResult<TenantProductMidCategoryDTO>>("TenantProductMidCategory/Update", model);
        }

        public ApiResult<TenantProductMidCategoryDTO> GetById(uint id)
        {
            return _restfulClient.Get<ApiResult<TenantProductMidCategoryDTO>>("TenantProductMidCategory/GetById", new { id });
        }

        public ApiResult<IEnumerable<TenantProductMidCategoryDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<TenantProductMidCategoryDTO>>>("TenantProductMidCategory/GetAll");
        } 
    }
}
