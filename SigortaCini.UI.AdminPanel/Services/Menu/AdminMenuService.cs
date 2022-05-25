using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Menu;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Menu
{
    public interface IAdminMenuService
    {
        ApiResult<IEnumerable<AdminMenuDTO>> GetAll(AdminMenuRequestDTO input);
    }

    public class AdminMenuService : IAdminMenuService, IScopedService
    {
        readonly RestfulClient _restfulClient;
        public AdminMenuService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<IEnumerable<AdminMenuDTO>> GetAll(AdminMenuRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<IEnumerable<AdminMenuDTO>>>("menu/adminmenu/getall", input);
        }
    }
}
