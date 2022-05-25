using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Permission;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Permission
{
    public interface IPermissionGroupService
    {
        ApiResult<IEnumerable<PermissionGroupDTO>> GetAllPermissionGroups();
        ApiResult<PermissionGroupDTO> InsertOrUpdatePermissionGroup(PermissionGroupDTO input);
        ApiResult<PermissionGroupDTO> GetPermissionGroupById(uint id);
        ApiResult<IEnumerable<PermissionGroupDTO>> GetAllPermissionGroupsByTypeId(uint id);
    }
    public class PermissionGroupService: IPermissionGroupService,IScopedService
    {
        readonly RestfulClient _restfulClient;

        public PermissionGroupService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}"); ;
        }

        public ApiResult<IEnumerable<PermissionGroupDTO>> GetAllPermissionGroups()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<PermissionGroupDTO>>>("Permission/PermissionGroup/getallpermissiongroups");
        }

        public ApiResult<PermissionGroupDTO> InsertOrUpdatePermissionGroup(PermissionGroupDTO input)
        {
            return _restfulClient.Post<ApiResult<PermissionGroupDTO>>("Permission/PermissionGroup/insertorupdatepermissiongroup", input);
        }

        public ApiResult<PermissionGroupDTO> GetPermissionGroupById(uint id)
        {
            return _restfulClient.Get<ApiResult<PermissionGroupDTO>>($"Permission/PermissionGroup/getpermissiongroupbyid?id={id.ToString()}");
        }

        public ApiResult<IEnumerable<PermissionGroupDTO>> GetAllPermissionGroupsByTypeId(uint id)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<PermissionGroupDTO>>>($"Permission/PermissionGroup/getallpermissiongroupsbytypeid?id={id.ToString()}");
        }
    }
}
