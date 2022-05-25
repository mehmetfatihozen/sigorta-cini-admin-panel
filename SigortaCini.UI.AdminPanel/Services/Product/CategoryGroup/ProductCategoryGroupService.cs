using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Product;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Product.CategoryGroup
{
    public interface IProductCategoryGroupService
    {
        ApiResult<IEnumerable<ProductCategoryGroupDTO>> GetAllProductCategoryGroups();
        ApiResult<ProductCategoryGroupDTO> GetProductCategoryGroupById(uint id);
        ApiResult<ProductCategoryGroupDTO> InsertOrUpdateProductCategoryGroup(ProductCategoryGroupDTO input);
        ApiResult<IEnumerable<ProductCategoryGroupListDTO>> GetAllProductCategoryGroupListByCatGroupId(uint catGroupId);
        ApiResult<IEnumerable<ProductAdminMidCategoryDTO>> GetAllMidCategoriesByCategoryGroupId(uint catGroupId);
        ApiResult<IEnumerable<ProductCategoryGroupListDTO>> GetAllProductCategoryGroupList();
        ApiResult<bool> InsertOrDeleteProductCategoryGroupList(ProductCategoryGroupListRequestDTO input);
    }

    public class ProductCategoryGroupService : IProductCategoryGroupService, IScopedService
    {

        readonly RestfulClient _restfulClient;

        public ProductCategoryGroupService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}"); ;
        }

        public ApiResult<IEnumerable<ProductAdminMidCategoryDTO>> GetAllMidCategoriesByCategoryGroupId(uint catGroupId)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<ProductAdminMidCategoryDTO>>>($"Product/CategoryGroup/getallmidcategoriesbycategorygroupid?catGroupId={catGroupId.ToString()}");
        }

        public ApiResult<IEnumerable<ProductCategoryGroupListDTO>> GetAllProductCategoryGroupList()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<ProductCategoryGroupListDTO>>>($"Product/CategoryGroup/getallproductcategorygrouplist");
        }

        public ApiResult<IEnumerable<ProductCategoryGroupListDTO>> GetAllProductCategoryGroupListByCatGroupId(uint catGroupId)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<ProductCategoryGroupListDTO>>>($"Product/CategoryGroup/getallproductcategorygrouplistbycatgroupid?catGroupId={catGroupId.ToString()}");
        }

        public ApiResult<IEnumerable<ProductCategoryGroupDTO>> GetAllProductCategoryGroups()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<ProductCategoryGroupDTO>>>($"Product/CategoryGroup/getallproductcategorygroups");
        }

        public ApiResult<ProductCategoryGroupDTO> GetProductCategoryGroupById(uint id)
        {
            return _restfulClient.Get<ApiResult<ProductCategoryGroupDTO>>($"Product/CategoryGroup/GetProductCategoryGroupById?id={id.ToString()}");
        }

        public ApiResult<bool> InsertOrDeleteProductCategoryGroupList(ProductCategoryGroupListRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<bool>>("Product/CategoryGroup/insertordeleteproductcategorygrouplist", input);
        }

        public ApiResult<ProductCategoryGroupDTO> InsertOrUpdateProductCategoryGroup(ProductCategoryGroupDTO input)
        {
            return _restfulClient.Post<ApiResult<ProductCategoryGroupDTO>>("Product/CategoryGroup/insertorupdateproductcategorygroup", input);
        }
    }
}
