using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Customer;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Customer
{
    public interface ICustomerService
    {
        ApiResult<AdminCustomerDTO> GetById(uint id);
        ApiResult<IEnumerable<AdminCustomerDTO>> GetAll();
        ApiResult<AdminCustomerDTO> GetLeadById(uint id);
        ApiResult<IEnumerable<AdminCustomerDTO>> GetAllLead();
    }
    public class CustomerService : ICustomerService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public CustomerService()
        {
            _restfulClient =  new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}"); ;
        }

        public ApiResult<AdminCustomerDTO> GetById(uint id)
        {
            return _restfulClient.Get<ApiResult<AdminCustomerDTO>>("customer/GetById?id=" + id.ToString(), null);
        }

        public ApiResult<IEnumerable<AdminCustomerDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<AdminCustomerDTO>>>("customer/GetAll");
        }

        public ApiResult<AdminCustomerDTO> GetLeadById(uint id)
        {
            return _restfulClient.Get<ApiResult<AdminCustomerDTO>>("customer/GetLeadById?id=" + id.ToString(), null);
        }

        public ApiResult<IEnumerable<AdminCustomerDTO>> GetAllLead()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<AdminCustomerDTO>>>("customer/GetAllLead");
        }
    }
}
