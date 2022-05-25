using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Permission;
using SigortaCini.Framework.Data.DTO.Admin.Role;
using SigortaCini.Framework.Data.DTO.Admin.RoleHistory;
using SigortaCini.Framework.Data.DTO.Admin.User;
using SigortaCini.Framework.Data.DTO.DataManagement;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Permission
{
    public interface IPermissionService
    {
        ApiResult<AdminUserRoleResponse> SetUsersRole(AdminUserRoleRequest input);
        ApiResult<IEnumerable<UserDTO>> GetRoleUsers(uint roleId);
        ApiResult<IEnumerable<UserRoleHistoryDTO>> GetUsersRoleHistory(uint userId);
        ApiResult<IEnumerable<RoleUserDTO>> GetRolesWithUsers();
        ApiResult<IEnumerable<RoleUserDTO>> GetRolesWithUsersForRole(uint roleId);
        ApiResult<IEnumerable<PermissionDTO>> GetAllPermissions();
        ApiResult<IEnumerable<PermissionDTO>> GetPermissionsByRoleId(uint roleId);
        ApiResult<IEnumerable<RoleDTO>> GetAllRoles();
        ApiResult<PermissionDTO> CreatePermission(PermissionInsertRequestDTO model);
        ApiResult<PermissionDTO> UpdatePermission(PermissionInsertRequestDTO model);
        ApiResult<IEnumerable<PermissionGroupDTO>> GetAllPermissionByGroupRole(SearchPermissionByGroupRole input);
        ApiResult<IEnumerable<PermissionDTO>> AddPermissionRole(AddPermissionsRoleRequestDTO input);
    }
    public class PermissionService : IPermissionService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public PermissionService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}"); ;
        }

        public ApiResult<AdminUserRoleResponse> SetUsersRole(AdminUserRoleRequest input)
        {
            return _restfulClient.Post<ApiResult<AdminUserRoleResponse>>("permission/setusersrole", input);
        }

        public ApiResult<IEnumerable<UserDTO>> GetRoleUsers(uint roleId)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<UserDTO>>>("permission/getroleusers?roleId=" + roleId.ToString(), null);
        }

        public ApiResult<IEnumerable<UserRoleHistoryDTO>> GetUsersRoleHistory(uint userId)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<UserRoleHistoryDTO>>>("permission/getusersRoleHistory?userId=" + userId.ToString(), null);
        }

        public ApiResult<IEnumerable<RoleUserDTO>> GetRolesWithUsers()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<RoleUserDTO>>>("permission/getroleswithusers", null);
        }

        public ApiResult<IEnumerable<RoleUserDTO>> GetRolesWithUsersForRole(uint roleId)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<RoleUserDTO>>>("permission/getroleswithusersforrole?roleId=" + roleId.ToString(), null);
        }

        public ApiResult<IEnumerable<PermissionDTO>> GetAllPermissions()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<PermissionDTO>>>("permission/getallpermissions", null);
        }

        public ApiResult<IEnumerable<PermissionDTO>> GetPermissionsByRoleId(uint roleId)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<PermissionDTO>>>("permission/getpermissionsbyroleid?roleId=" + roleId.ToString(), null);
        }

        public ApiResult<IEnumerable<RoleDTO>> GetAllRoles()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<RoleDTO>>>("permission/getallroles", null);
        }

        public ApiResult<PermissionDTO> CreatePermission(PermissionInsertRequestDTO model)
        {
            return _restfulClient.Post<ApiResult<PermissionDTO>>("permission/CreatePermission", model);
        }

        public ApiResult<PermissionDTO> UpdatePermission(PermissionInsertRequestDTO model)
        {
            return _restfulClient.Put<ApiResult<PermissionDTO>>("permission/UpdatePermission", model);
        }

        public ApiResult<IEnumerable<PermissionGroupDTO>> GetAllPermissionByGroupRole(SearchPermissionByGroupRole input)
        {
            return _restfulClient.Post<ApiResult<IEnumerable<PermissionGroupDTO>>>("permission/getallpermissionbygrouprole", input);
        }

        public ApiResult<IEnumerable<PermissionDTO>> AddPermissionRole(AddPermissionsRoleRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<IEnumerable<PermissionDTO>>>("permission/addpermissionrole", input);
        }
    }
}
