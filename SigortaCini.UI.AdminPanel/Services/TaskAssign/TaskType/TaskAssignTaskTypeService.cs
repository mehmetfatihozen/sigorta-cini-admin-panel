using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.TaskAssign.TaskType;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Services.TaskAssign.TaskType
{
    public interface ITaskAssignTaskTypeService
    {
        ApiResult<TaskAssignTaskTypeResponseDTO> Create(TaskAssignTaskTypeRequestDTO model);
        ApiResult<IEnumerable<TaskAssignTaskTypeResponseDTO>> GetAll();
        ApiResult<TaskAssignTaskTypeResponseDTO> GetById(uint taskAssignTaskTypeId);
        ApiResult<TaskAssignTaskTypeResponseDTO> Update(TaskAssignTaskTypeRequestDTO model);
    }
    public class TaskAssignTaskTypeService: ITaskAssignTaskTypeService, IScopedService
    {
        RestfulClient _restfulClient;
        public TaskAssignTaskTypeService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<TaskAssignTaskTypeResponseDTO> Create(TaskAssignTaskTypeRequestDTO model)
        {
            return _restfulClient.Post<ApiResult<TaskAssignTaskTypeResponseDTO>>("taskassign/tasktype/Create", model);
        }

        public ApiResult<IEnumerable<TaskAssignTaskTypeResponseDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<TaskAssignTaskTypeResponseDTO>>>("taskassign/tasktype/GetAll");
        }

        public ApiResult<TaskAssignTaskTypeResponseDTO> GetById(uint taskAssignTaskTypeId)
        {
            return _restfulClient.Get<ApiResult<TaskAssignTaskTypeResponseDTO>>("taskAssign/tasktype/GetById", new { taskAssignTaskTypeId });
        }

        public ApiResult<TaskAssignTaskTypeResponseDTO> Update(TaskAssignTaskTypeRequestDTO model)
        {
            return _restfulClient.Put<ApiResult<TaskAssignTaskTypeResponseDTO>>("taskAssign/tasktype/Update", model);
        }
    }
}
