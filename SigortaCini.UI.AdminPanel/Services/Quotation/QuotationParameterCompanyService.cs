using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Parameter;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Quotation
{
    public interface IQuotationParameterCompanyService
    {
        ApiResult<IEnumerable<QuotationParameterCompanyDTO>> GetAll();
        ApiResult<QuotationParameterCompanyDTO> Update(QuotationParameterCompanyDTO model);
        ApiResult<QuotationParameterCompanyDTO> GetById(uint id);
    }
    public class QuotationParameterCompanyService : IQuotationParameterCompanyService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public QuotationParameterCompanyService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<IEnumerable<QuotationParameterCompanyDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<QuotationParameterCompanyDTO>>>("quotationparametercompany/GetAll");
        }

        public ApiResult<QuotationParameterCompanyDTO> GetById(uint id)
        {
            return _restfulClient.Get<ApiResult<QuotationParameterCompanyDTO>>("quotationparametercompany/GetById", new { id });
        }

        public ApiResult<QuotationParameterCompanyDTO> Update(QuotationParameterCompanyDTO model)
        {
            return _restfulClient.Put<ApiResult<QuotationParameterCompanyDTO>>("quotationparametercompany", model);
        }
    }
}
