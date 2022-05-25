using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Organization;
using SigortaCini.Framework.Data.DTO.DataManagement;
using SigortaCini.UI.AdminPanel.Services.Organization;

namespace SigortaCini.UI.AdminPanel.Controllers.Organization
{
    public class OrganizationController : BaseController
    {
        IOrganizationService _organizationService;

        public OrganizationController(IOrganizationService organizationService)
        {
            _organizationService = organizationService;
        }

        [HttpGet]
        public ApiResult<IEnumerable<SelectListItemDTO>> GetOrganizationSelectList()
        {
            return _organizationService.GetOrganizationSelectList();
        }

        [HttpPost]
        public ApiResult<OrganizationResponseDTO> Create(OrganizationRequestDTO model)
        {
            return _organizationService.Create(model);
        }

        [HttpGet]
        public ApiResult<OrganizationResponseDTO> GetById(uint organizationId)
        {
            return _organizationService.GetById(organizationId);
        }

        [HttpPut]
        public ApiResult<OrganizationResponseDTO> Update(OrganizationDTO input)
        {
            return _organizationService.Update(input.OrganizationId, new OrganizationRequestDTO
            {
                OrganizationCode = input.OrganizationCode,
                OrganizationName = input.OrganizationName,
                OrganizationPhone = input.OrganizationPhone,
                OrganizationEmail = input.OrganizationEmail
            });
        }

        [HttpGet]
        public ApiResult<IEnumerable<OrganizationResponseDTO>> GetAll()
        {
            return _organizationService.GetAll();
        }
    }
}