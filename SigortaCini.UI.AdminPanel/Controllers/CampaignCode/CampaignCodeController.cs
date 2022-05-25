using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Campaign;
using SigortaCini.Framework.Data.DTO.Admin.Organization;
using SigortaCini.UI.AdminPanel.Services.CampaignCode;

namespace SigortaCini.UI.AdminPanel.Controllers.CampaignCode
{
    public class CampaignCodeController : BaseController
    {
        ICampaignCodeService _campaignCodeService;

        public CampaignCodeController(ICampaignCodeService campaignCodeService)
        {
            _campaignCodeService = campaignCodeService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ApiResult<CampaignCodeCreateResponseDTO> CreateCampaignCode(CampaignCodeCreateRequestDTO model)
        {
            return _campaignCodeService.CreateCampaignCode(model);
        }

        [HttpPut]
        public ApiResult<CampaignCodeUpdateResponseDTO> UpdateCampaignCode(CampaignCodeUpdateRequestDTO model)
        {
            return _campaignCodeService.UpdateCampaignCode(model);
        }

        [HttpGet]
        public ApiResult<IEnumerable<CampaignCodeResponseDTO>> GetAll()
        {
            return _campaignCodeService.GetAll();
        }

        [HttpGet]
        public ApiResult<CampaignCodeResponseDTO> GetById(uint id)
        {
            return _campaignCodeService.GetById(id);
        }

        public JsonResult GetCampaignCodeByOrganizationId(uint organizationId)
        {
            var data = _campaignCodeService.GetCampaignCodeByOrganizationId(organizationId);
            return Json(new
            {
                Data = data.Data.Select(entity => new
                {
                    entity.CampaingCodeValue,
                    entity.CampaignCodeId,
                    State = entity.State == true ? "Aktif" : "Pasif"
                })
            });
        }

        [HttpGet]
        public ApiResult<IEnumerable<OrganizationPersonCreateResponseDTO>> GetPersonByCampaignCodeId(uint campaignCodeId)
        {
            return _campaignCodeService.GetPersonByCampaignCodeId(campaignCodeId);
        }

        [HttpPut]
        public ApiResult<bool> UpdateOrganizationPersonCampaignCode(OrganizationPersonCampaignCodeCreateDTO campaignCode)
        {
            return _campaignCodeService.UpdateOrganizationPersonCampaignCode(campaignCode);
        }

        [HttpPost]
        public JsonResult SearchCampaignCode(CampaignCodeSearchRequestDTO model)
        {
            var data = _campaignCodeService.SearchCampaignCode(model);
            return Json(new
            {
                Data = data.Data.Select(entity => new
                {
                    entity.CampaignCodeValue,
                    entity.CampaignCodeId,
                    entity.OrganizationName,
                    entity.PolicyCode,
                    entity.TaskCode,
                    PolicyStatus = entity.PolicyStatus == true ? "Aktif" : "Pasif",
                    TaskStatus = entity.TaskStatus == true ? "Aktif" : "Pasif",
                    entity.UserFullName,
                    entity.TaskId
                })
            });
        }

        [HttpPost]
        public ApiResult<IEnumerable<CampaignCodeDetailListResponseDTO>> GetAllDetail(CampaignCodeDetailListRequestDTO model)
        {
            return _campaignCodeService.GetAllDetail(model);
        }
    }
}