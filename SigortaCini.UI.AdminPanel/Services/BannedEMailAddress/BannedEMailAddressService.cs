using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Banned;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.BannedEMailAddress
{
    public interface IBannedEMailAddressService
    {
        ApiResult<IEnumerable<BannedEMailAddressDTO>> GetAll();
        ApiResult<BannedEMailAddressDTO> GetById(uint id);
        ApiResult<BannedEMailAddressDTO> Update(BannedEMailAddressDTO model);
        ApiResult<BannedEMailAddressDTO> Create(BannedEMailAddressDTO model);
    }

    public class BannedEMailAddressService : IBannedEMailAddressService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public BannedEMailAddressService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<IEnumerable<BannedEMailAddressDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<BannedEMailAddressDTO>>>("BannedEMailAddress/GetAll");
        }

        public ApiResult<BannedEMailAddressDTO> GetById(uint id)
        {
            return _restfulClient.Get<ApiResult<BannedEMailAddressDTO>>("BannedEMailAddress/GetById", new { id });
        }

        public ApiResult<BannedEMailAddressDTO> Update(BannedEMailAddressDTO model)
        {
            return _restfulClient.Put<ApiResult<BannedEMailAddressDTO>>("BannedEMailAddress/Update", model);
        }

        public ApiResult<BannedEMailAddressDTO> Create(BannedEMailAddressDTO model)
        {
            return _restfulClient.Post<ApiResult<BannedEMailAddressDTO>>("BannedEMailAddress/Create", model);
        }
    }
}