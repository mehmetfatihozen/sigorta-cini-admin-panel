using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Campaign;
using SigortaCini.Framework.Data.DTO.Admin.Organization;
using SigortaCini.Framework.Data.DTO.Admin.Person;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Services.CampaignCode
{
    public interface ICampaignCodeService
    {
        ApiResult<CampaignCodeCreateResponseDTO> CreateCampaignCode(CampaignCodeCreateRequestDTO model);
        ApiResult<CampaignCodeUpdateResponseDTO> UpdateCampaignCode(CampaignCodeUpdateRequestDTO model);
        ApiResult<IEnumerable<CampaignCodeResponseDTO>> GetAll();
        ApiResult<IEnumerable<CampaignCodeResponseDTO>> GetCampaignCodeByOrganizationId(uint organizationId);
        ApiResult<IEnumerable<OrganizationPersonCreateResponseDTO>> GetPersonByCampaignCodeId(uint campaignCodeId);
        ApiResult<CampaignCodeResponseDTO> GetById(uint id);
        ApiResult<bool> UpdateOrganizationPersonCampaignCode(OrganizationPersonCampaignCodeCreateDTO campaignCode);
        ApiResult<IEnumerable<CampaignCodeSearchResponseDTO>> SearchCampaignCode(CampaignCodeSearchRequestDTO model);
        ApiResult<IEnumerable<CampaignCodeDetailListResponseDTO>> GetAllDetail(CampaignCodeDetailListRequestDTO model);
    }
    public class CampaignCodeService:ICampaignCodeService,IScopedService
    {
        RestfulClient _restfulClient;
        public CampaignCodeService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<CampaignCodeCreateResponseDTO> CreateCampaignCode(CampaignCodeCreateRequestDTO model)
        {
            return _restfulClient.Post<ApiResult<CampaignCodeCreateResponseDTO>>("CampaignCode/CreateCampaignCode", model);
        }

        public ApiResult<CampaignCodeUpdateResponseDTO> UpdateCampaignCode(CampaignCodeUpdateRequestDTO model)
        {
            return _restfulClient.Put<ApiResult<CampaignCodeUpdateResponseDTO>>("CampaignCode/UpdateCampaignCode", model);
        }

        public ApiResult<IEnumerable<CampaignCodeResponseDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<CampaignCodeResponseDTO>>>("CampaignCode/GetAll"); 
        }

        public ApiResult<CampaignCodeResponseDTO> GetById(uint id)
        {
            return _restfulClient.Get<ApiResult<CampaignCodeResponseDTO>>("CampaignCode/GetById",new { id});
        }

        public ApiResult<IEnumerable<CampaignCodeResponseDTO>> GetCampaignCodeByOrganizationId(uint organizationId)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<CampaignCodeResponseDTO>>>("CampaignCode/GetCampaignCodeByOrganizationId", new { organizationId });
        }

        public ApiResult<IEnumerable<OrganizationPersonCreateResponseDTO>> GetPersonByCampaignCodeId(uint campaignCodeId)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<OrganizationPersonCreateResponseDTO>>>("CampaignCode/GetPersonByCampaignCodeId", new { campaignCodeId });
        }

        public ApiResult<bool> UpdateOrganizationPersonCampaignCode(OrganizationPersonCampaignCodeCreateDTO campaignCode)
        {
            return _restfulClient.Put<ApiResult<bool>>("CampaignCode/UpdateOrganizationPersonCampaignCode", campaignCode);
        }

        public ApiResult<IEnumerable<CampaignCodeSearchResponseDTO>> SearchCampaignCode(CampaignCodeSearchRequestDTO model)
        {
            return _restfulClient.Post<ApiResult<IEnumerable<CampaignCodeSearchResponseDTO>>>("CampaignCode/SearchCampaignCode", model);
        }

        public ApiResult<IEnumerable<CampaignCodeDetailListResponseDTO>> GetAllDetail(CampaignCodeDetailListRequestDTO model)
        {
            return _restfulClient.Post<ApiResult<IEnumerable<CampaignCodeDetailListResponseDTO>>>("CampaignCode/GetAllDetail", model);
        }
    }
}
