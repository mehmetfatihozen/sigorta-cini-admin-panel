using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Campaign;
using SigortaCini.UI.AdminPanel.Services.CampaignCode;

namespace SigortaCini.UI.AdminPanel.Controllers.CampaignCode
{
    public class UserCampaignCodeController : BaseController
    {
        IUserCampaignCodeService _userCampaignCodeService;

        public UserCampaignCodeController(IUserCampaignCodeService userCampaignCodeService)
        {
            _userCampaignCodeService = userCampaignCodeService;
        }

        [HttpPost]
        public ApiResult<UserCampaignCodeResponseDTO> Create(UserCampaignCodeRequestDTO model)
        {
            return _userCampaignCodeService.Create(model);
        }
    }
}