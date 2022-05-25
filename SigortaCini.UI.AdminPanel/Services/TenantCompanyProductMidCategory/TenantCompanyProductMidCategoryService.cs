using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Company.ProductMidCategory;
using SigortaCini.Framework.Data.DTO.Admin.TenantCompanyProductMidCategory;
using SigortaCini.Framework.Data.DTO.DataManagement;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.TenantCompanyProductMidCategory
{
    public interface ITenantCompanyProductMidCategoryService
    {
        ApiResult<TenantCompanyProductMidCategoryDTO> Create(TenantCompanyProductMidCategoryRequestDTO model);
        ApiResult<TenantCompanyProductMidCategoryDTO> Update(TenantCompanyProductMidCategoryRequestDTO model);
        ApiResult<TenantCompanyProductMidCategoryDTO> GetById(uint id);
        ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> GetCompanyProductMidCategoriesByProductId(uint productId);
        ApiResult<IEnumerable<ProductMidCategoryDTO>> GetCompanyProductMidCategoryProducts();
        ApiResult<IEnumerable<TenantCompanyProductMidCategoryDTO>> GetAll();
    }

    public class TenantCompanyProductMidCategoryService : ITenantCompanyProductMidCategoryService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public TenantCompanyProductMidCategoryService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<TenantCompanyProductMidCategoryDTO> Create(TenantCompanyProductMidCategoryRequestDTO model)
        {
            return _restfulClient.Post<ApiResult<TenantCompanyProductMidCategoryDTO>>("TenantCompanyProductMidCategory/Create", model);
        }

        public ApiResult<TenantCompanyProductMidCategoryDTO> Update(TenantCompanyProductMidCategoryRequestDTO model)
        {
            return _restfulClient.Put<ApiResult<TenantCompanyProductMidCategoryDTO>>("TenantCompanyProductMidCategory/Update", model);
        }

        public ApiResult<TenantCompanyProductMidCategoryDTO> GetById(uint id)
        {
            return _restfulClient.Get<ApiResult<TenantCompanyProductMidCategoryDTO>>("TenantCompanyProductMidCategory/GetById", new { id });
        }

        public ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> GetCompanyProductMidCategoriesByProductId(uint productId)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<CompanyProductMidCategoryDTO>>>("TenantCompanyProductMidCategory/GetCompanyProductMidCategoriesByProductId", new { productId });
        }

        public ApiResult<IEnumerable<ProductMidCategoryDTO>> GetCompanyProductMidCategoryProducts()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<ProductMidCategoryDTO>>>("TenantCompanyProductMidCategory/GetCompanyProductMidCategoryProducts");
        }

        public ApiResult<IEnumerable<TenantCompanyProductMidCategoryDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<TenantCompanyProductMidCategoryDTO>>>("TenantCompanyProductMidCategory/GetAll");
        } 
    }
}
