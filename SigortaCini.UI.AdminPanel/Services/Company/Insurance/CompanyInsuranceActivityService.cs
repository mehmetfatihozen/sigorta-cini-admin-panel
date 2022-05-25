using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Company.Insurance;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Insurance
{
    public interface ICompanyInsuranceActivityService
    {
        ApiResult<CompanyInsuranceActivityDTO> Create(CompanyInsuranceActivityDTO input);
        ApiResult<CompanyInsuranceActivityDTO> Update(CompanyInsuranceActivityDTO input);
        void Delete(uint id);
        ApiResult<IEnumerable<CompanyInsuranceActivityDTO>> GetAll();
        ApiResult<CompanyInsuranceActivityDTO> Get(uint id);
        ApiResult<IEnumerable<CompanyInsuranceActivityDTO>> GetByCompanyId(uint companyId);
        ApiResult<IEnumerable<CompanyInsuranceActivityDTO>> SaveCompanyInsuranceActivities(IEnumerable<CompanyInsuranceActivityDTO> input);
    }
    public class CompanyInsuranceActivityService : ICompanyInsuranceActivityService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public CompanyInsuranceActivityService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}"); ;
        }

        public ApiResult<CompanyInsuranceActivityDTO> Create(CompanyInsuranceActivityDTO input)
        {
            return _restfulClient.Post<ApiResult<CompanyInsuranceActivityDTO>>("company/InsuranceActivity/", input);
        }

        public void Delete(uint id)
        {
            _restfulClient.Delete<ApiResult<CompanyInsuranceActivityDTO>>("company/InsuranceActivity/" + id.ToString(), id);
        }

        public ApiResult<CompanyInsuranceActivityDTO> Get(uint id)
        {
            return _restfulClient.Get<ApiResult<CompanyInsuranceActivityDTO>>("company/InsuranceActivity/" + id.ToString(), null);
        }

        public ApiResult<IEnumerable<CompanyInsuranceActivityDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<CompanyInsuranceActivityDTO>>>("company/InsuranceActivity/getAll");
        }

        public ApiResult<IEnumerable<CompanyInsuranceActivityDTO>> GetByCompanyId(uint id)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<CompanyInsuranceActivityDTO>>>("company/InsuranceActivity/GetByCompanyId/", new { id });
        }

        public ApiResult<IEnumerable<CompanyInsuranceActivityDTO>> SaveCompanyInsuranceActivities(IEnumerable<CompanyInsuranceActivityDTO> input)
        {
            return _restfulClient.Post<ApiResult<IEnumerable<CompanyInsuranceActivityDTO>>>("company/InsuranceActivity/SaveCompanyInsuranceActivities", input);
        }

        public ApiResult<CompanyInsuranceActivityDTO> Update(CompanyInsuranceActivityDTO input)
        {
            return _restfulClient.Put<ApiResult<CompanyInsuranceActivityDTO>>("company/InsuranceActivity/" + input.CompanyInsuranceActivityId.ToString(), input);
        }
    }
}
