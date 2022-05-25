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

namespace SigortaCini.UI.AdminPanel.Services.Organization
{
    public interface IOrganizationPersonService
    {
        ApiResult<IEnumerable<OrganizationPersonCreateResponseDTO>> CreateOrganizationPerson(IEnumerable<OrganizationPersonCreateRequestDTO> organizationPerson);
        ApiResult<IEnumerable<OrganizationPersonResponseDTO>> GetOrganizationPerson(uint organizationId);
        ApiResult<List<CampaignCodeResponseDTO>> GetCampaignCodeByPersonId(uint personId);
        ApiResult<IEnumerable<PersonDTO>> GetAllPersonWithOrganizationId(uint OrganizationId);


    }
    public class OrganizationPersonService: IOrganizationPersonService,IScopedService
    {
        RestfulClient _restfulClient;
        public OrganizationPersonService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<IEnumerable<OrganizationPersonCreateResponseDTO>> CreateOrganizationPerson(IEnumerable<OrganizationPersonCreateRequestDTO> organizationPerson)
        {
            return _restfulClient.Post<ApiResult<IEnumerable<OrganizationPersonCreateResponseDTO>>>("Organization/OrganizationPerson/CreateOrganizationPerson",organizationPerson);
        }

        public ApiResult<IEnumerable<OrganizationPersonResponseDTO>> GetOrganizationPerson(uint organizationId)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<OrganizationPersonResponseDTO>>>("Organization/OrganizationPerson/GetOrganizationPerson", new { organizationId }); 
        }

        public ApiResult<List<CampaignCodeResponseDTO>> GetCampaignCodeByPersonId(uint personId)
        {
            return _restfulClient.Get<ApiResult<List<CampaignCodeResponseDTO>>>("Organization/OrganizationPerson/GetCampaignCodeByPersonId", new { personId});
        }

        public ApiResult<IEnumerable<PersonDTO>> GetAllPersonWithOrganizationId(uint OrganizationId)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<PersonDTO>>>("Organization/OrganizationPerson/GetAllPersonWithOrganizationId", new { OrganizationId });
        }
    }
}
