using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Product;
using SigortaCini.Framework.Data.DTO.DataManagement;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Product.MidCategory
{
    public interface IProductMidCategoryService
    {
        ApiResult<IEnumerable<ProductMidCategoryDTO>> GetAll();
        ApiResult<ProductMidCategoryResponseDTO> InsertOrUpdateMidCategory(ProductMidCategoryRequestDTO input);
        ApiResult<ProductMidCategoryDTO> GetProductMidCategoryById(uint productMidCatId);
        ApiResult<IEnumerable<ProductMidCategoryDTO>> GetAllByGroup();
    }
    public class ProductMidCategoryService : IProductMidCategoryService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public ProductMidCategoryService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}"); ;
        }

        public ApiResult<IEnumerable<ProductMidCategoryDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<ProductMidCategoryDTO>>>("product/MidCategory/getAll");
        }

        public ApiResult<ProductMidCategoryDTO> GetProductMidCategoryById(uint productMidCatId)
        {
            return _restfulClient.Get<ApiResult<ProductMidCategoryDTO>>($"product/MidCategory/getproductmidcategorybyid?productMidCatId={ productMidCatId.ToString() }");
        }

        public ApiResult<ProductMidCategoryResponseDTO> InsertOrUpdateMidCategory(ProductMidCategoryRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<ProductMidCategoryResponseDTO>>("product/MidCategory/insertorupdatemidcategory",input);
        }

        public ApiResult<IEnumerable<ProductMidCategoryDTO>> GetAllByGroup()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<ProductMidCategoryDTO>>>("product/MidCategory/getallbygroup", null);
        }
    }
}
