using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Campaign;
using SigortaCini.Framework.Data.DTO.Admin.Organization;
using SigortaCini.Framework.Data.DTO.Admin.Person;
using SigortaCini.UI.AdminPanel.Services.Organization;

namespace SigortaCini.UI.AdminPanel.Controllers.Organization
{
    public class OrganizationPersonController : BaseController
    {
        IOrganizationPersonService _organizationPersonService;
        public OrganizationPersonController(IOrganizationPersonService organizationPersonService)
        {
            _organizationPersonService = organizationPersonService;
        }

        [HttpPost]
        public ApiResult<IEnumerable<OrganizationPersonCreateResponseDTO>> CreateOrganizationPerson(IEnumerable<OrganizationPersonCreateRequestDTO> organizationPerson)
        {
            return _organizationPersonService.CreateOrganizationPerson(organizationPerson);
        }

        [HttpGet]
        public ApiResult<IEnumerable<OrganizationPersonResponseDTO>> GetOrganizationPerson(uint organizationId)
        {
            return _organizationPersonService.GetOrganizationPerson(organizationId);
        }

        [HttpGet]
        public ApiResult<List<CampaignCodeResponseDTO>> GetCampaignCodeByPersonId(uint personId)
        {
            return _organizationPersonService.GetCampaignCodeByPersonId(personId);
        }

        [HttpGet]
        public ApiResult<IEnumerable<PersonDTO>> GetAllPersonWithOrganizationId(uint OrganizationId)
        {
            return _organizationPersonService.GetAllPersonWithOrganizationId(OrganizationId);
        }
    }
}