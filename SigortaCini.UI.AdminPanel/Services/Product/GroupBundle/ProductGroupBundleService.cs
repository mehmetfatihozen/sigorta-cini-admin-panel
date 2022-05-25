using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Product;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Services.Product.GroupBundle
{

    public interface IProductGroupBundleService
    {
        ApiResult<IEnumerable<ProductGroupBundleDTO>> GetAllProductGroupBundleList();
        ApiResult<IEnumerable<ProductGroupBundleDTO>> GetAllProductGroupBundleListGroupId(uint groupId);
        ApiResult<bool> InsertOrDeleteProductGroupBundle(ProductGroupBundleIORequest input);
        ApiResult<IEnumerable<ProductAdminMidCategoryDTO>> GetAllMidCategoriesByGroupId(uint groupId);
    }

    public class ProductGroupBundleService : IProductGroupBundleService, IScopedService
    {

        readonly RestfulClient _restfulClient;

        public ProductGroupBundleService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}"); ;

        }

        public ApiResult<IEnumerable<ProductAdminMidCategoryDTO>> GetAllMidCategoriesByGroupId(uint groupId)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<ProductAdminMidCategoryDTO>>>($"Product/GroupBundle/getallmidcategoriesbygroupid?groupId={groupId.ToString()}");
        }

        public ApiResult<IEnumerable<ProductGroupBundleDTO>> GetAllProductGroupBundleList()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<ProductGroupBundleDTO>>>("Product/GroupBundle/getallproductgroupbundlelist");
        }

        public ApiResult<IEnumerable<ProductGroupBundleDTO>> GetAllProductGroupBundleListGroupId(uint groupId)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<ProductGroupBundleDTO>>>($"Product/GroupBundle/getallproductgroupbundlelistgroupid?groupId={groupId.ToString()}");
        }

        public ApiResult<bool> InsertOrDeleteProductGroupBundle(ProductGroupBundleIORequest input)
        {
            return _restfulClient.Post<ApiResult<bool>>($"Product/GroupBundle/insertordeleteproductgroupbundle", input);
        }
    }
}
