using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.CompanyProduct;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Company.ProductInstallment
{
    public interface ICompanyProductInstallmentService
    {
        ApiResult<IEnumerable<CompanyProductInstallmentDTO>> GetAll();
        ApiResult<CompanyProductInstallmentDTO> Get(uint id);
        ApiResult<CreateCompanyProductInstallmentResponseDTO> Create(CreateCompanyProductInstallmentRequestDTO input);
        ApiResult<CreateCompanyProductInstallmentResponseDTO> Update(uint id, CreateCompanyProductInstallmentRequestDTO input);
    }
    public class CompanyProductInstallmentService : ICompanyProductInstallmentService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public CompanyProductInstallmentService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}"); ;
        }

        public ApiResult<IEnumerable<CompanyProductInstallmentDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<CompanyProductInstallmentDTO>>>("company/productinstallment/getAll");
        }

        public ApiResult<CreateCompanyProductInstallmentResponseDTO> Create(CreateCompanyProductInstallmentRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<CreateCompanyProductInstallmentResponseDTO>>("company/productinstallment/", input);
        }
        public ApiResult<CreateCompanyProductInstallmentResponseDTO> Update(uint id, CreateCompanyProductInstallmentRequestDTO input)
        {
            return _restfulClient.Put<ApiResult<CreateCompanyProductInstallmentResponseDTO>>("company/productinstallment/" + id.ToString(), input);
        }

        public ApiResult<CompanyProductInstallmentDTO> Get(uint id)
        {
            return _restfulClient.Get<ApiResult<CompanyProductInstallmentDTO>>("company/productinstallment/getById?id=" + id.ToString(), null);
        }
    }
}
