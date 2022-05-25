using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.DataManagement;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Services.Company
{
    public interface ICompanyService
    {
        ApiResult<IEnumerable<CompanyDTO>> GetAllByProductId(uint id);
        ApiResult<IEnumerable<CompanyDTO>> GetAll();
    }
    public class CompanyService : ICompanyService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public CompanyService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}"); ;
        }
        public ApiResult<IEnumerable<CompanyDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<CompanyDTO>>>("company/company/getAll");
        }

        public ApiResult<IEnumerable<CompanyDTO>> GetAllByProductId(uint id)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<CompanyDTO>>>("company/company/GetAllByProductId?productId=" + id.ToString(), null);
        }
    }
}
