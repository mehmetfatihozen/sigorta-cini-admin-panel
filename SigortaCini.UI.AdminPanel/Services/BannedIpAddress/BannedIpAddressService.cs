using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Banned;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.BannedIpAddress
{
    public interface IBannedIpAddressService
    {
        ApiResult<IEnumerable<BannedIpAddressDTO>> GetAll();
        ApiResult<BannedIpAddressDTO> GetById(uint id);
        ApiResult<BannedIpAddressDTO> Update(BannedIpAddressDTO model);
        ApiResult<BannedIpAddressDTO> Create(BannedIpAddressDTO model);
    }

    public class BannedIpAddressService : IBannedIpAddressService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public BannedIpAddressService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<IEnumerable<BannedIpAddressDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<BannedIpAddressDTO>>>("BannedIpAddress/GetAll");
        }

        public ApiResult<BannedIpAddressDTO> GetById(uint id)
        {
            return _restfulClient.Get<ApiResult<BannedIpAddressDTO>>("BannedIpAddress/GetById", new { id });
        }

        public ApiResult<BannedIpAddressDTO> Update(BannedIpAddressDTO model)
        {
            return _restfulClient.Put<ApiResult<BannedIpAddressDTO>>("BannedIpAddress/Update", model);
        }

        public ApiResult<BannedIpAddressDTO> Create(BannedIpAddressDTO model)
        {
            return _restfulClient.Post<ApiResult<BannedIpAddressDTO>>("BannedIpAddress/Create", model);
        }
    }
}