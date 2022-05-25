using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.LeadSourceType;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.LeadSourceType
{
    public interface ILeadSourceTypeService
    {
        ApiResult<IEnumerable<LeadSourceTypeDTO>> GetAll();
    }

    public class LeadSourceTypeService : ILeadSourceTypeService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public LeadSourceTypeService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<IEnumerable<LeadSourceTypeDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<LeadSourceTypeDTO>>>("LeadSourceType/GetAll");
        }
    }
}
