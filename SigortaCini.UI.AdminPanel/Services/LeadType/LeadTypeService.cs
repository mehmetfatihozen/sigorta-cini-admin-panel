using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.LeadType;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.LeadType
{
    public interface ILeadTypeService
    {
        ApiResult<IEnumerable<LeadTypeDTO>> GetAll();
    }

    public class LeadTypeService : ILeadTypeService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public LeadTypeService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<IEnumerable<LeadTypeDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<LeadTypeDTO>>>("LeadType/GetAll");
        }
    }
}
