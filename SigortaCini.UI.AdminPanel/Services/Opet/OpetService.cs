using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Opet;
using SigortaCini.Framework.Data.DTO.MultiQuotation.All.Opet;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Opet
{
    public interface IOpetService
    {
        ApiResult<OpetParaPuanLogDTO> GetById(uint id);
        ApiResult<IEnumerable<OpetParaPuanLogDTO>> GetAll();
        ApiResult<OpetCampaignResponseDTO> ResendParapuan(uint id);
    }
    public class OpetService : IOpetService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public OpetService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}"); ;
        }

        public ApiResult<OpetParaPuanLogDTO> GetById(uint id)
        {
            return _restfulClient.Get<ApiResult<OpetParaPuanLogDTO>>("Opet/GetById?id=" + id.ToString(), null);
        }

        public ApiResult<IEnumerable<OpetParaPuanLogDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<OpetParaPuanLogDTO>>>("Opet/GetAll");
        }

        public ApiResult<OpetCampaignResponseDTO> ResendParapuan(uint id)
        {
            return _restfulClient.Get<ApiResult<OpetCampaignResponseDTO>>("Opet/ResendParapuan?parapuanId=" + id.ToString(), null);
        }
    }
}
