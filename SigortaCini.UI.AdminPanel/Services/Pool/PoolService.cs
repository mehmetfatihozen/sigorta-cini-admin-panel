using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.TaskAssign.Group;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Services.Pool
{
    public interface IPoolService
    {
        ApiResult<TaskAssignGroupResponseDTO> Create(TaskAssignGroupRequestDTO input);
        ApiResult<TaskAssignGroupResponseDTO> Update(TaskAssignGroupRequestDTO input);
        void Delete(uint id);
        ApiResult<IEnumerable<TaskAssignGroupDTO>> GetAll();
        ApiResult<IEnumerable<TaskAssignGroupDTO>> GetAllAsTree();
        ApiResult<TaskAssignGroupDTO> Get(uint id);
        ApiResult<IEnumerable<TaskAssignGroupDTO>> GetByTenant(uint id);
    }
    public class PoolService : IPoolService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public PoolService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }


        public ApiResult<TaskAssignGroupResponseDTO> Create(TaskAssignGroupRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<TaskAssignGroupResponseDTO>>("taskassign/group/inserttaskassigngroup", input);
        }

        public void Delete(uint id)
        {
            _restfulClient.Delete<ApiResult<TaskAssignGroupDTO>>("taskassign/group/" + id.ToString(), id);
        }

        public ApiResult<TaskAssignGroupDTO> Get(uint id)
        {
            return _restfulClient.Get<ApiResult<TaskAssignGroupDTO>>("taskassign/group/gettaskassigngroup?id=" + id.ToString(), null);
        }

        public ApiResult<IEnumerable<TaskAssignGroupDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<TaskAssignGroupDTO>>>("taskassign/group/getalltaskassigngroup");
        }

        public ApiResult<IEnumerable<TaskAssignGroupDTO>> GetAllAsTree()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<TaskAssignGroupDTO>>>("taskassign/group/getalltaskassigngroupastree");
        }

        public ApiResult<TaskAssignGroupResponseDTO> Update(TaskAssignGroupRequestDTO input)
        {
            return _restfulClient.Put<ApiResult<TaskAssignGroupResponseDTO>>("taskassign/group/updatetaskassigngroup", input);
        }

        public ApiResult<IEnumerable<TaskAssignGroupDTO>> GetByTenant(uint id)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<TaskAssignGroupDTO>>>("taskassign/group/GetByTenant?id=" + id.ToString(), null);
        }
    }
}
