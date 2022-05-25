using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.CompanyProduct;
using SigortaCini.Framework.Data.DTO.Admin.Tenant;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Services.Tenant
{
    public interface ITenantCompanyMidCategoryService
    {
        ApiResult<TenantCompanyMidCategoryResponseDTO> Create(TenantCompanyMidCategoryRequestDTO model);
        ApiResult<IEnumerable<TenantCompanyProductMidCatDTO>> GetAllByTenantId(TenantCompanyProductMidCatRequestDTO model);
    }
    public class TenantCompanyMidCategoryService:ITenantCompanyMidCategoryService,IScopedService
    {
        readonly RestfulClient _restfulClient;
        public TenantCompanyMidCategoryService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<TenantCompanyMidCategoryResponseDTO> Create(TenantCompanyMidCategoryRequestDTO model)
        {
            return _restfulClient.Post<ApiResult<TenantCompanyMidCategoryResponseDTO>>("tenantCompanyMidCategory/Create", model);
        }

        public ApiResult<IEnumerable<TenantCompanyProductMidCatDTO>> GetAllByTenantId(TenantCompanyProductMidCatRequestDTO model)
        {
            return _restfulClient.Post<ApiResult<IEnumerable<TenantCompanyProductMidCatDTO>>>("tenantCompanyMidCategory/GetAllByTenantId", model);
        }
    }
}
