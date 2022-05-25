using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Banned;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.BannedPhoneNumber
{
    public interface IBannedPhoneNumberService
    {
        ApiResult<IEnumerable<BannedPhoneNumberDTO>> GetAll();
        ApiResult<BannedPhoneNumberDTO> GetById(uint id);
        ApiResult<BannedPhoneNumberDTO> Update(BannedPhoneNumberDTO model);
        ApiResult<BannedPhoneNumberDTO> Create(BannedPhoneNumberDTO model);
    }

    public class BannedPhoneNumberService : IBannedPhoneNumberService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public BannedPhoneNumberService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<IEnumerable<BannedPhoneNumberDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<BannedPhoneNumberDTO>>>("BannedPhoneNumber/GetAll");
        }

        public ApiResult<BannedPhoneNumberDTO> GetById(uint id)
        {
            return _restfulClient.Get<ApiResult<BannedPhoneNumberDTO>>("BannedPhoneNumber/GetById", new { id });
        }

        public ApiResult<BannedPhoneNumberDTO> Update(BannedPhoneNumberDTO model)
        {
            return _restfulClient.Put<ApiResult<BannedPhoneNumberDTO>>("BannedPhoneNumber/Update", model);
        }

        public ApiResult<BannedPhoneNumberDTO> Create(BannedPhoneNumberDTO model)
        {
            return _restfulClient.Post<ApiResult<BannedPhoneNumberDTO>>("BannedPhoneNumber/Create", model);
        }
    }
}