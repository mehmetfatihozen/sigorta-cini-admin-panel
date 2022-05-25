using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Product;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Product.MidType
{

    public interface IProductMidTypeService
    {
        ApiResult<IEnumerable<ProductMidTypeDTO>> GetAllProductMidTypes();
        ApiResult<ProductMidTypeDTO> InsertOrUpdateProductMidType(ProductMidTypeDTO input);
        ApiResult<ProductMidTypeDTO> GetProductMidTypeById(uint id);
    }
    public class ProductMidTypeService : IProductMidTypeService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public ProductMidTypeService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}"); ;
        }

        public ApiResult<IEnumerable<ProductMidTypeDTO>> GetAllProductMidTypes()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<ProductMidTypeDTO>>>("Product/MidType/getallproductmidtypes");
        }

        public ApiResult<ProductMidTypeDTO> GetProductMidTypeById(uint id)
        {
            return _restfulClient.Get<ApiResult<ProductMidTypeDTO>>($"Product/MidType/getproductmidtypebyid?id={id.ToString()}");
        }

        public ApiResult<ProductMidTypeDTO> InsertOrUpdateProductMidType(ProductMidTypeDTO input)
        {
            return _restfulClient.Post<ApiResult<ProductMidTypeDTO>>("Product/MidType/insertorupdateproductmidtype", input);
        }
    }
}
