using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Company.ProductMidCategory;
using SigortaCini.Framework.Data.DTO.Admin.PaymentProvider;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Company.ProductMidCategory
{
    public interface ICompanyProductMidCategoryService
    {
        ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> GetAll();
        ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> GetAllByIdentity();
        ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> GetAllByEgmTramer();
        ApiResult<CompanyProductMidCategoryDTO> Get(uint id);
        ApiResult<CompanyProductMidCategoryCreateResponseDTO> Create(CompanyProductMidCategoryCreateRequestDTO model);
        ApiResult<CompanyProductMidCategoryUpdateResponseDTO> Update(uint id, CompanyProductMidCategoryUpdateRequestDTO model);
        void Delete(uint id);
        ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> GetByCompanyId(uint id);
        ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> GetWithoutVariantByCompanyId(uint id);
        ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> GetVariantProductMidCategoryByCompanyId(uint companyId);
        ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> SaveCompanyProductMidCategoriesByIsB2BActive(IEnumerable<CompanyProductMidCategoryDTO> input);
        ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> SaveCompanyProductMidCategoriesByIsB2CActive(IEnumerable<CompanyProductMidCategoryDTO> input);
        ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> SaveCompanyProductMidCategoriesByIsB2BPolicy(IEnumerable<CompanyProductMidCategoryDTO> input);
        ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> SaveCompanyProductMidCategoriesByIsB2CPolicy(IEnumerable<CompanyProductMidCategoryDTO> input);
        ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> SaveCompanyProductMidCategoriesByIsB2B3D(IEnumerable<CompanyProductMidCategoryDTO> input);
        ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> SaveCompanyProductMidCategoriesByIsB2C3D(IEnumerable<CompanyProductMidCategoryDTO> input);
        ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> UpdateCompanyProductMidCategoriesByIdentity(IEnumerable<CompanyProductMidCategoryDTO> input);
        ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> UpdateCompanyProductMidCategoriesByEgmTramer(IEnumerable<CompanyProductMidCategoryDTO> input);
        ApiResult<PaymentProviderDTO> GetShowCreditCardInfoByCompanyId(uint companyId);
        ApiResult<bool> SaveShowCreditCardInfo(PaymentProviderDTO input);
    }
    public class CompanyProductMidCategoryService : ICompanyProductMidCategoryService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public CompanyProductMidCategoryService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}"); ;
        }

        public ApiResult<CompanyProductMidCategoryCreateResponseDTO> Create(CompanyProductMidCategoryCreateRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<CompanyProductMidCategoryCreateResponseDTO>>("company/productMidCategory/", input);
        }

        public void Delete(uint id)
        {
            _restfulClient.Delete<ApiResult<CompanyProductMidCategoryDTO>>("company/productMidCategory/" + id.ToString(), id);
        }

        public ApiResult<CompanyProductMidCategoryDTO> Get(uint id)
        {
            return _restfulClient.Get<ApiResult<CompanyProductMidCategoryDTO>>("company/productMidCategory/" + id.ToString(), null);
        }

        public ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<CompanyProductMidCategoryDTO>>>("company/productMidCategory/getAll");
        }

        public ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> GetAllByIdentity()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<CompanyProductMidCategoryDTO>>>("company/productMidCategory/GetAllIdentity");
        }

        public ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> GetAllByEgmTramer()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<CompanyProductMidCategoryDTO>>>("company/productMidCategory/GetAllEgmTramer");
        }

        public ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> GetByCompanyId(uint id)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<CompanyProductMidCategoryDTO>>>("company/productMidCategory/GetByCompanyId/", new { id });
        }

        public ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> SaveCompanyProductMidCategoriesByIsB2BActive(IEnumerable<CompanyProductMidCategoryDTO> input)
        {
            return _restfulClient.Post<ApiResult<IEnumerable<CompanyProductMidCategoryDTO>>>("company/productMidCategory/SaveCompanyProductMidCategoriesByIsB2BActive", input);
        }

        public ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> SaveCompanyProductMidCategoriesByIsB2CActive(IEnumerable<CompanyProductMidCategoryDTO> input)
        {
            return _restfulClient.Post<ApiResult<IEnumerable<CompanyProductMidCategoryDTO>>>("company/productMidCategory/SaveCompanyProductMidCategoriesByIsB2CActive", input);
        }

        public ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> SaveCompanyProductMidCategoriesByIsB2BPolicy(IEnumerable<CompanyProductMidCategoryDTO> input)
        {
            return _restfulClient.Post<ApiResult<IEnumerable<CompanyProductMidCategoryDTO>>>("company/productMidCategory/SaveCompanyProductMidCategoriesByIsB2BPolicy", input);
        }

        public ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> SaveCompanyProductMidCategoriesByIsB2CPolicy(IEnumerable<CompanyProductMidCategoryDTO> input)
        {
            return _restfulClient.Post<ApiResult<IEnumerable<CompanyProductMidCategoryDTO>>>("company/productMidCategory/SaveCompanyProductMidCategoriesByIsB2CPolicy", input);
        }

        public ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> SaveCompanyProductMidCategoriesByIsB2B3D(IEnumerable<CompanyProductMidCategoryDTO> input)
        {
            return _restfulClient.Post<ApiResult<IEnumerable<CompanyProductMidCategoryDTO>>>("company/productMidCategory/SaveCompanyProductMidCategoriesByIsB2B3D", input);
        }

        public ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> SaveCompanyProductMidCategoriesByIsB2C3D(IEnumerable<CompanyProductMidCategoryDTO> input)
        {
            return _restfulClient.Post<ApiResult<IEnumerable<CompanyProductMidCategoryDTO>>>("company/productMidCategory/SaveCompanyProductMidCategoriesByIsB2C3D", input);
        }

        public ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> UpdateCompanyProductMidCategoriesByIdentity(IEnumerable<CompanyProductMidCategoryDTO> input)
        {
            return _restfulClient.Post<ApiResult<IEnumerable<CompanyProductMidCategoryDTO>>>("company/productMidCategory/UpdateCompanyProductMidCategoriesByIdentity", input);
        }

        public ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> UpdateCompanyProductMidCategoriesByEgmTramer(IEnumerable<CompanyProductMidCategoryDTO> input)
        {
            return _restfulClient.Post<ApiResult<IEnumerable<CompanyProductMidCategoryDTO>>>("company/productMidCategory/UpdateCompanyProductMidCategoriesByEgmTramer", input);
        }

        public ApiResult<CompanyProductMidCategoryUpdateResponseDTO> Update(uint id, CompanyProductMidCategoryUpdateRequestDTO input)
        {
            return _restfulClient.Put<ApiResult<CompanyProductMidCategoryUpdateResponseDTO>>("company/productMidCategory/" + id.ToString(), input);
        }

        public ApiResult<PaymentProviderDTO> GetShowCreditCardInfoByCompanyId(uint companyId)
        {
            return _restfulClient.Get<ApiResult<PaymentProviderDTO>>("company/productMidCategory/GetShowCreditCardInfoByCompanyId/", new { companyId });
        }

        public ApiResult<bool> SaveShowCreditCardInfo(PaymentProviderDTO input)
        {
            return _restfulClient.Post<ApiResult<bool>>("company/productMidCategory/SaveShowCreditCardInfo", input);
        }

        public ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> GetVariantProductMidCategoryByCompanyId(uint companyId)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<CompanyProductMidCategoryDTO>>>("company/productMidCategory/GetVariantProductMidCategoryByCompanyId", new { companyId });
        }

        public ApiResult<IEnumerable<CompanyProductMidCategoryDTO>> GetWithoutVariantByCompanyId(uint id)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<CompanyProductMidCategoryDTO>>>("company/productMidCategory/GetWithoutVariantByCompanyId/", new { id });
        }
    }
}
