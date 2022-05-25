using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Company.WsConfig;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Company.WsConfig
{
    public interface ICompanyWsConfigService
    {
        ApiResult<IEnumerable<CompanyWsConfigDTO>> GetAll();
        ApiResult<CompanyWsConfigDTO> Get(uint id);
        ApiResult<CompanyWsConfigDTO> Create(CompanyWsConfigDTO input);
        ApiResult<CompanyWsConfigDTO> Update(uint id, CompanyWsConfigDTO input);
        void Delete(uint id);
        ApiResult<IEnumerable<CompanyWsConfigDTO>> GetByCompanyId(uint id);
    }
    public class CompanyWsConfigService : ICompanyWsConfigService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public CompanyWsConfigService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}"); ;
        }

        public ApiResult<CompanyWsConfigDTO> Create(CompanyWsConfigDTO input)
        {
            return _restfulClient.Post<ApiResult<CompanyWsConfigDTO>>("company/wsconfig/", input);
        }

        public void Delete(uint id)
        {
            _restfulClient.Delete<ApiResult<CompanyWsConfigDTO>>("company/wsconfig/" + id.ToString(), id);
        }

        public ApiResult<CompanyWsConfigDTO> Get(uint id)
        {
            return _restfulClient.Get<ApiResult<CompanyWsConfigDTO>>("company/wsconfig/" + id.ToString(), null);
        }

        public ApiResult<IEnumerable<CompanyWsConfigDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<CompanyWsConfigDTO>>>("company/wsconfig/getAll");
        }

        public ApiResult<IEnumerable<CompanyWsConfigDTO>> GetByCompanyId(uint id)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<CompanyWsConfigDTO>>>("company/wsconfig/GetByCompanyId/", new { id });
        }

        public ApiResult<CompanyWsConfigDTO> Update(uint id, CompanyWsConfigDTO input)
        {
            return _restfulClient.Put<ApiResult<CompanyWsConfigDTO>>("company/wsconfig/" + id.ToString(), input);
        }
    }
}
