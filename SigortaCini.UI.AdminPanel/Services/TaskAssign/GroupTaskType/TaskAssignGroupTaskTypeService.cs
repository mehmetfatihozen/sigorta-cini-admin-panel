using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.TaskAssign.Group;
using SigortaCini.Framework.Data.DTO.Admin.TaskAssign.GroupTaskType;
using SigortaCini.Framework.Data.DTO.Admin.TaskAssign.TaskType;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Services.TaskAssign.GroupTaskType
{
    public interface ITaskAssignGroupTaskTypeService
    {
        ApiResult<TaskAssignGroupTaskTypeResponseDTO> Create(TaskAssignGroupTaskTypeRequestDTO model);
        ApiResult<IEnumerable<TaskAssignGroupTaskTypeResponseDTO>> GetAll();
        ApiResult<TaskAssignGroupTaskTypeResponseDTO> Update(TaskAssignGroupTaskTypeRequestDTO model);
        ApiResult<SetGroupsByTaskTypeResponseDTO> SetGroupsByTaskTypeId(SetGroupsByTaskTypeRequestDTO input);
        ApiResult<IEnumerable<TaskAssignGroupDTO>> GetGroupsByTaskTypeId(uint taskTypeId);
        ApiResult<IEnumerable<TaskAssignTaskTypeResponseDTO>> GetAllTaskTypes();
    }
    public class TaskAssignGroupTaskTypeService: ITaskAssignGroupTaskTypeService,IScopedService
    {
        RestfulClient _restfulClient;
        public TaskAssignGroupTaskTypeService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<TaskAssignGroupTaskTypeResponseDTO> Create(TaskAssignGroupTaskTypeRequestDTO model)
        {
            return _restfulClient.Post<ApiResult<TaskAssignGroupTaskTypeResponseDTO>>("taskassign/taskassigngrouptasktype/Create",model);
        }

        public ApiResult<IEnumerable<TaskAssignGroupTaskTypeResponseDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<TaskAssignGroupTaskTypeResponseDTO>>>("taskassign/taskassigngrouptasktype/GetAll");
        }

        public ApiResult<IEnumerable<TaskAssignTaskTypeResponseDTO>> GetAllTaskTypes()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<TaskAssignTaskTypeResponseDTO>>>("taskassign/taskassigngrouptasktype/getalltasktypes");
        }

        public ApiResult<TaskAssignGroupTaskTypeResponseDTO> Update(TaskAssignGroupTaskTypeRequestDTO model)
        {
            return _restfulClient.Put<ApiResult<TaskAssignGroupTaskTypeResponseDTO>>("taskassign/taskassigngrouptasktype/Update", model);
        }

        public ApiResult<SetGroupsByTaskTypeResponseDTO> SetGroupsByTaskTypeId(SetGroupsByTaskTypeRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<SetGroupsByTaskTypeResponseDTO>>("taskassign/taskassigngrouptasktype/setgroupsbytasktypeid", input);
        }

        public ApiResult<IEnumerable<TaskAssignGroupDTO>> GetGroupsByTaskTypeId(uint taskTypeId)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<TaskAssignGroupDTO>>>("taskassign/taskassigngrouptasktype/getbytasktypeid?taskTypeId=" + taskTypeId.ToString());
        }
    }
}
