using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.TaskAssign.TaskType;
using SigortaCini.UI.AdminPanel.Services.TaskAssign.TaskType;

namespace SigortaCini.UI.AdminPanel.Controllers.Task.AssignTaskType
{
    public class TaskAssignTaskTypeController : BaseController
    {
        ITaskAssignTaskTypeService _taskAssignTaskTypeService;

        public TaskAssignTaskTypeController(ITaskAssignTaskTypeService taskAssignTaskTypeService)
        {
            _taskAssignTaskTypeService = taskAssignTaskTypeService;
        }


        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ApiResult<TaskAssignTaskTypeResponseDTO> Create(TaskAssignTaskTypeRequestDTO model)
        {
            return _taskAssignTaskTypeService.Create(model);
        }

        [HttpGet]
        public JsonResult GetAll()
        {
            var data = _taskAssignTaskTypeService.GetAll();
            if (data == null || data.Data == null || data.HasError)
            {
                return Json(data);
            }
            return Json(new
            {
                Data = data.Data.Select(x => new
                {
                    TaskAssignTaskTypeState = x.TaskAssignTaskTypeState.HasValue && x.TaskAssignTaskTypeState.Value ? "Aktif" : "Aktif Değil",
                    x.TaskAssignTaskTypeId,
                    x.TaskAssignTaskTypeName
                }),
                data.HasError,
                data.Message
            });
        }

        [HttpGet]
        public ApiResult<TaskAssignTaskTypeResponseDTO> GetById(uint taskAssignTaskTypeId)
        {
            return _taskAssignTaskTypeService.GetById(taskAssignTaskTypeId);
        }

        [HttpPut]
        public ApiResult<TaskAssignTaskTypeResponseDTO> Update(TaskAssignTaskTypeRequestDTO model)
        {
            return _taskAssignTaskTypeService.Update(model);
        }

    }
}