using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.RoleHistory;
using SigortaCini.Framework.Data.DTO.Admin.Search;
using SigortaCini.Framework.Data.DTO.Admin.User;
using SigortaCini.Framework.Data.DTO.DataManagement;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.User
{
    public interface IUserService
    {
        ApiResult<IEnumerable<UserDTO>> GetAll();
        ApiResult<IEnumerable<UserDTO>> GetAllUserByUserTypeId(uint id);
        ApiResult<IEnumerable<AdminUserTypes>> GetAllUserTypes();
        ApiResult<IEnumerable<AdminPersonTypeDTO>> GetAllPersonTypes();
        ApiResult<IEnumerable<AdminUserRoleType>> GetAllRoleTypes();
        ApiResult<AdminUserCreateResponseDTO> CreateUser(AdminUserCreateRequestDTO input);
        ApiResult<AdminUserUpdateResponseDTO> UpdateUser(uint id, AdminUserUpdateRequestDTO input);
        ApiResult<AdminUserDTO> GetUser(uint id);
        ApiResult<IEnumerable<UserDTO>> SearchUser(SearchRequestDTO input);
        ApiResult<AdminUserRoleResponse> SetUsersRole(AdminUserRoleRequest input);
        ApiResult<IEnumerable<UserDTO>> GetRoleUsers(uint roleId);
        ApiResult<IEnumerable<UserRoleHistoryDTO>> GetUsersRoleHistory(uint userId);
        ApiResult<IEnumerable<AdminUserDTO>> GetRolesWithUsers();
        ApiResult<IEnumerable<UserDTO>> GetAllApiUser();
        ApiResult<AdminUserUpdateResponseDTO> UpdateApiUser(AdminUserDTO input);
        ApiResult<string> GetUserCode();
    }
    public class UserService : IUserService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public UserService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<AdminUserCreateResponseDTO> CreateUser(AdminUserCreateRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<AdminUserCreateResponseDTO>>("user/", input);
        }

        public ApiResult<IEnumerable<UserDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<UserDTO>>>("user/getAll");
        }

        public ApiResult<IEnumerable<AdminPersonTypeDTO>> GetAllPersonTypes()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<AdminPersonTypeDTO>>>("user/GetAllPersonTypes");
        }

        public ApiResult<IEnumerable<AdminUserRoleType>> GetAllRoleTypes()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<AdminUserRoleType>>>("user/GetAllRoleTypes");
        }

        public ApiResult<IEnumerable<AdminUserTypes>> GetAllUserTypes()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<AdminUserTypes>>>("user/GetAllUserTypes");
        }

        public ApiResult<AdminUserDTO> GetUser(uint id)
        {
            return _restfulClient.Get<ApiResult<AdminUserDTO>>("user/GetById?id=" + id.ToString(), null);
        }

        public ApiResult<IEnumerable<UserDTO>> SearchUser(SearchRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<IEnumerable<UserDTO>>>("user/SearchUser", input);
        }

        public ApiResult<AdminUserUpdateResponseDTO> UpdateUser(uint id, AdminUserUpdateRequestDTO input)
        {
            return _restfulClient.Put<ApiResult<AdminUserUpdateResponseDTO>>("user/" + id.ToString(), input);
        }

        public ApiResult<AdminUserRoleResponse> SetUsersRole(AdminUserRoleRequest input)
        {
            return _restfulClient.Put<ApiResult<AdminUserRoleResponse>>("user/setUsersRole", input);
        }

        public ApiResult<IEnumerable<UserDTO>> GetRoleUsers(uint roleId)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<UserDTO>>>("user/getroleusers" + roleId.ToString(), null);
        }

        public ApiResult<IEnumerable<UserRoleHistoryDTO>> GetUsersRoleHistory(uint userId)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<UserRoleHistoryDTO>>>("user/getusersRoleHistory" + userId.ToString(), null);
        }

        public ApiResult<IEnumerable<AdminUserDTO>> GetRolesWithUsers()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<AdminUserDTO>>>("user/getroleswithusers", null);
        }

        public ApiResult<IEnumerable<UserDTO>> GetAllApiUser()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<UserDTO>>>("user/getAllApiUser", null);
        }

        public ApiResult<AdminUserUpdateResponseDTO> UpdateApiUser(AdminUserDTO input)
        {
            return _restfulClient.Post<ApiResult<AdminUserUpdateResponseDTO>>("user/UpdateApiUser", input);
        }

        public ApiResult<string> GetUserCode()
        {
            return _restfulClient.Get<ApiResult<string>>("user/GetUserCode", null);
        }

        public ApiResult<IEnumerable<UserDTO>> GetAllUserByUserTypeId(uint id)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<UserDTO>>>("user/GetAllByUserTypeId?id=" + id.ToString(), null);
        }
    }
}
