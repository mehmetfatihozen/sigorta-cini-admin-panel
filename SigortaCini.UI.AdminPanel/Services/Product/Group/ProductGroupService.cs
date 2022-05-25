using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Product;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Services.Product.Group
{
    public interface IProductGroupService
    {
        ApiResult<IEnumerable<ProductGroupDTO>> GetAllProductGroups();
        ApiResult<ProductGroupDTO> GetProductGroupById(uint id);
        ApiResult<ProductGroupDTO> InsertOrUpdateProductGroup(ProductGroupDTO input);
    }
    public class ProductGroupService : IProductGroupService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public ProductGroupService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<IEnumerable<ProductGroupDTO>> GetAllProductGroups()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<ProductGroupDTO>>>("Product/Group/getallproductgroups");
        }

        public ApiResult<ProductGroupDTO> GetProductGroupById(uint id)
        {
            return _restfulClient.Get<ApiResult<ProductGroupDTO>>($"Product/Group/getproductgroupbyid?id={ id.ToString() }");
        }

        public ApiResult<ProductGroupDTO> InsertOrUpdateProductGroup(ProductGroupDTO input)
        {
            return _restfulClient.Post<ApiResult<ProductGroupDTO>>("Product/Group/insertorupdateproductgroup", input);
        }
    }
}
