using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Permission;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Permission
{
    public interface IPermissionTypeService
    {
        ApiResult<IEnumerable<PermissionTypeDTO>> GetAllPermissionTypes();
    }
    public class PermissionTypeService : IPermissionTypeService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public PermissionTypeService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}"); ;
        }
        public ApiResult<IEnumerable<PermissionTypeDTO>> GetAllPermissionTypes()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<PermissionTypeDTO>>>("permissiontype/getallpermissiontypes", null);
        }
    }
}
