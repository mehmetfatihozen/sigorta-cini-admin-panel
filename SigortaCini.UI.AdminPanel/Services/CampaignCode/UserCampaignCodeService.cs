using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Campaign;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Services.CampaignCode
{
    public interface IUserCampaignCodeService
    {
        ApiResult<UserCampaignCodeResponseDTO> Create(UserCampaignCodeRequestDTO model);
    }
    public class UserCampaignCodeService:IUserCampaignCodeService,IScopedService
    {
        readonly RestfulClient _restfulClient;
        public UserCampaignCodeService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<UserCampaignCodeResponseDTO> Create(UserCampaignCodeRequestDTO model)
        {
            return _restfulClient.Post<ApiResult<UserCampaignCodeResponseDTO>>("campaigncode/usercampaigncode/Create");
        }
    }
}
