using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.TaskAssign.Group;
using SigortaCini.Framework.Data.DTO.Admin.TaskAssign.GroupUser;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Pool
{
    public interface IPoolUserService
    {
        ApiResult<IEnumerable<TaskAssignGroupUserCreateResponseDTO>> AddUsersToPool(List<TaskAssignGroupUserCreateRequestDTO> userGroupList);
        ApiResult<IEnumerable<TaskAssignGroupUserDTO>> GetAllByTaskAssignGroupId(uint TaskAssignGroupId);
        ApiResult<IEnumerable<TaskAssignGroupUserCreateResponseDTO>> AddPoolsToUser(List<TaskAssignGroupUserCreateRequestDTO> userGroupList);
        ApiResult<IEnumerable<TaskAssignGroupDTO>> GetAllByUserId(uint userId);
    }
    public class PoolUserService : IPoolUserService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public PoolUserService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}"); ;
        }

        public ApiResult<IEnumerable<TaskAssignGroupUserCreateResponseDTO>> AddUsersToPool(List<TaskAssignGroupUserCreateRequestDTO> input)
        {
            return _restfulClient.Post<ApiResult<IEnumerable<TaskAssignGroupUserCreateResponseDTO>>>("taskassign/groupuser/AddUsersToPool", input);
        }

        public ApiResult<IEnumerable<TaskAssignGroupUserDTO>> GetAllByTaskAssignGroupId(uint id)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<TaskAssignGroupUserDTO>>>("taskassign/groupuser/GetAllByTaskAssignGroupId", new { TaskAssignGroupId = id });
        }

        public ApiResult<IEnumerable<TaskAssignGroupUserCreateResponseDTO>> AddPoolsToUser(List<TaskAssignGroupUserCreateRequestDTO> userGroupList)
        {
            return _restfulClient.Post<ApiResult<IEnumerable<TaskAssignGroupUserCreateResponseDTO>>>("taskassign/groupuser/AddPoolsToUser", userGroupList);
        }

        public ApiResult<IEnumerable<TaskAssignGroupDTO>> GetAllByUserId(uint userId)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<TaskAssignGroupDTO>>>("taskassign/groupuser/GetAllByUserId", new { userId });
        }
    }
}
