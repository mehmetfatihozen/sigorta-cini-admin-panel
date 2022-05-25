using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Organization;
using SigortaCini.Framework.Data.DTO.DataManagement;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Services.Organization
{
    public interface IOrganizationService
    {
        ApiResult<IEnumerable<SelectListItemDTO>> GetOrganizationSelectList();
        ApiResult<OrganizationResponseDTO> Create(OrganizationRequestDTO model);
        ApiResult<OrganizationResponseDTO> GetById(uint organizationId);
        ApiResult<OrganizationResponseDTO> Update(uint id, OrganizationRequestDTO model);
        ApiResult<IEnumerable<OrganizationResponseDTO>> GetAll();
    }
    
    public class OrganizationService: IOrganizationService,IScopedService
    {
        RestfulClient _restfulClient;
        public OrganizationService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<IEnumerable<SelectListItemDTO>> GetOrganizationSelectList()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<SelectListItemDTO>>>("Organization/GetOrganizationSelectList");
        }

        public ApiResult<OrganizationResponseDTO> Create(OrganizationRequestDTO model)
        {
            return _restfulClient.Post<ApiResult<OrganizationResponseDTO>>("Organization/Create", model);
        }

        public ApiResult<OrganizationResponseDTO> GetById(uint organizationId)
        {
            return _restfulClient.Get<ApiResult<OrganizationResponseDTO>>("Organization/GetById", new { organizationId });
        }
        
        public ApiResult<OrganizationResponseDTO> Update(uint id,OrganizationRequestDTO model)
        {
            return _restfulClient.Put<ApiResult<OrganizationResponseDTO>>("Organization/Update?id="+ id.ToString(), model);
        }

        public ApiResult<IEnumerable<OrganizationResponseDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<OrganizationResponseDTO>>>("Organization/GetAll");
        }
    }
}
