using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Product;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Product.Category
{
    public interface IProductCategoryService
    {
        ApiResult<IEnumerable<ProductCategoryDTO>> GetAllProductCategories();
        ApiResult<ProductCategoryDTO> GetProductCategoryById(uint id);
        ApiResult<ProductCategoryDTO> InsertOrUpdateProductCategory(ProductCategoryDTO input);
    }
    public class ProductCategoryService : IProductCategoryService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public ProductCategoryService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<IEnumerable<ProductCategoryDTO>> GetAllProductCategories()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<ProductCategoryDTO>>>("Product/ProductCategory/getallproductcategories");
        }

        public ApiResult<ProductCategoryDTO> GetProductCategoryById(uint id)
        {
            return _restfulClient.Get<ApiResult<ProductCategoryDTO>>($"Product/ProductCategory/getproductcategorybyid?id={id.ToString()}");
        }

        public ApiResult<ProductCategoryDTO> InsertOrUpdateProductCategory(ProductCategoryDTO input)
        {
            return _restfulClient.Post<ApiResult<ProductCategoryDTO>>("Product/ProductCategory/insertorupdateproductcategory", input);
        }
    }
}
