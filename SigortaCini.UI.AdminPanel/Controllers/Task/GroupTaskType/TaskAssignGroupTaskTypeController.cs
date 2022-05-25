using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.TaskAssign.Group;
using SigortaCini.Framework.Data.DTO.Admin.TaskAssign.GroupTaskType;
using SigortaCini.Framework.Data.DTO.Admin.TaskAssign.TaskType;
using SigortaCini.UI.AdminPanel.Services.TaskAssign.GroupTaskType;

namespace SigortaCini.UI.AdminPanel.Controllers.Task.GroupTaskType
{
    public class TaskAssignGroupTaskTypeController : BaseController
    {
        ITaskAssignGroupTaskTypeService _taskAssignGroupTaskTypeService;

        public TaskAssignGroupTaskTypeController(ITaskAssignGroupTaskTypeService taskAssignGroupTaskTypeService)
        {
            _taskAssignGroupTaskTypeService = taskAssignGroupTaskTypeService;
        }

        [HttpPost]
        public ApiResult<TaskAssignGroupTaskTypeResponseDTO> Create(TaskAssignGroupTaskTypeRequestDTO model)
        {
            return _taskAssignGroupTaskTypeService.Create(model);
        }

        [HttpPost]
        public ApiResult<SetGroupsByTaskTypeResponseDTO> SetGroupsByTaskTypeId(SetGroupsByTaskTypeRequestDTO model)
        {
            return _taskAssignGroupTaskTypeService.SetGroupsByTaskTypeId(model);
        }

        [HttpGet]
        public ApiResult<IEnumerable<TaskAssignGroupTaskTypeResponseDTO>> GetAll()
        {
            return _taskAssignGroupTaskTypeService.GetAll();
        }

        [HttpGet]
        public ApiResult<IEnumerable<TaskAssignTaskTypeResponseDTO>> GetAllTaskTypes()
        {
            return _taskAssignGroupTaskTypeService.GetAllTaskTypes();
        }


        [HttpGet]
        public ApiResult<IEnumerable<TaskAssignGroupDTO>> GetGroupsByTaskTypeId(uint taskTypeId)
        {
            return _taskAssignGroupTaskTypeService.GetGroupsByTaskTypeId(taskTypeId);
        }

        [HttpPut]
        public ApiResult<TaskAssignGroupTaskTypeResponseDTO> Update(TaskAssignGroupTaskTypeRequestDTO model)
        {
            return _taskAssignGroupTaskTypeService.Update(model);
        }
    }
}