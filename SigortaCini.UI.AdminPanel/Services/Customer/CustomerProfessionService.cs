using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.DataManagement;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Services.Customer
{
    public interface ICustomerProfessionService
    {
        ApiResult<CustomerProfessionDTO> Create(CustomerProfessionDTO input);
        ApiResult<CustomerProfessionDTO> Update(CustomerProfessionDTO input);
        void Delete(uint id);
        ApiResult<IEnumerable<CustomerProfessionDTO>> GetAll(int productId);
        ApiResult<CustomerProfessionDTO> Get(uint id);
    }
    public class CustomerProfessionService : ICustomerProfessionService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public CustomerProfessionService()
        {
            _restfulClient =  new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}"); ;
        }

        public ApiResult<CustomerProfessionDTO> Create(CustomerProfessionDTO input)
        {
            return _restfulClient.Post<ApiResult<CustomerProfessionDTO>>("customer/profession/", input);
        }

        public void Delete(uint id)
        {
            _restfulClient.Delete<ApiResult<CustomerProfessionDTO>>("customer/profession/" + id.ToString(), id);
        }

        public ApiResult<CustomerProfessionDTO> Get(uint id)
        {
            return _restfulClient.Get<ApiResult<CustomerProfessionDTO>>("customer/profession/" + id.ToString(), null);
        }

        public ApiResult<IEnumerable<CustomerProfessionDTO>> GetAll(int productId)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<CustomerProfessionDTO>>>("customer/profession/getAll", new { productId });
        }

        public ApiResult<CustomerProfessionDTO> Update(CustomerProfessionDTO input)
        {
            return _restfulClient.Put<ApiResult<CustomerProfessionDTO>>("customer/profession/" + input.CustomerProfessionId.ToString(), input);
        }
    }
}
