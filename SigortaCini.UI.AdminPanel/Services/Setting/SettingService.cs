using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Setting;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Services.Setting
{

    public interface ISettingService
    {
        ApiResult<SettingDTO> GetSetting();
        ApiResult<SettingUpdateResponse> UpdateSetting(SettingUpdateRequest input);
    }

    public class SettingService : ISettingService, IScopedService
    {
        readonly RestfulClient _restfulClient;
        public SettingService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<SettingDTO> GetSetting()
        {
            return _restfulClient.Get<ApiResult<SettingDTO>>("setting/getSetting");
        }

        public ApiResult<SettingUpdateResponse> UpdateSetting(SettingUpdateRequest input)
        {
            return _restfulClient.Put<ApiResult<SettingUpdateResponse>>("setting/updatesetting", input);
        }
    }
}
