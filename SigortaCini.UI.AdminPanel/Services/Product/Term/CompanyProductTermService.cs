using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Company;
using SigortaCini.Framework.Data.DTO.Admin.CompanyProduct;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Product.Term
{
    public interface ICompanyProductTermService
    {
        ApiResult<IEnumerable<CompanyProductTermDTO>> GetAll();
        ApiResult<CompanyProductTermDTO> Get(uint id);
        ApiResult<CreateCompanyProductTermResponseDTO> Create(CreateCompanyProductTermRequestDTO model);
        ApiResult<CreateCompanyProductTermResponseDTO> Update(uint id, CreateCompanyProductTermRequestDTO model);
        ApiResult<IEnumerable<VariantDTO>> GetVariantsByCompanyAndProduct(GetVariantRequestDTO model);
    }
    public class CompanyProductTermService : ICompanyProductTermService, IScopedService
    {
        private readonly RestfulClient _restfulClient;

        public CompanyProductTermService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<CreateCompanyProductTermResponseDTO> Create(CreateCompanyProductTermRequestDTO model)
        {
            return _restfulClient.Post<ApiResult<CreateCompanyProductTermResponseDTO>>("company/productterm", model);
        }

        public ApiResult<CompanyProductTermDTO> Get(uint id)
        {
            return _restfulClient.Get<ApiResult<CompanyProductTermDTO>>("company/productterm/" + id, null);
        }

        public ApiResult<IEnumerable<CompanyProductTermDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<CompanyProductTermDTO>>>("company/productterm/getAll");
        }

        public ApiResult<IEnumerable<VariantDTO>> GetVariantsByCompanyAndProduct(GetVariantRequestDTO model)
        {
            return _restfulClient.Post<ApiResult<IEnumerable<VariantDTO>>>("company/productterm/GetVariantsByCompanyAndProduct", model);
        }

        public ApiResult<CreateCompanyProductTermResponseDTO> Update(uint id, CreateCompanyProductTermRequestDTO model)
        {
            return _restfulClient.Put<ApiResult<CreateCompanyProductTermResponseDTO>>("company/productterm/" + id, model);
        }
    }
}
