using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.TaskCloseStatus;
using SigortaCini.UI.AdminPanel.Services.Task.CloseStatus;

namespace SigortaCini.UI.AdminPanel.Controllers.Task.TaskCloseStatus
{
    public class TaskCloseStatusController : BaseController
    {
        ITaskCloseStatusService _taskCloseStatusService;

        public TaskCloseStatusController(ITaskCloseStatusService taskCloseStatusService)
        {
            _taskCloseStatusService = taskCloseStatusService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ApiResult<CreateTaskCloseStatusResponseDTO> Create(CreateTaskCloseStatusRequestDTO model)
        {
            var data = _taskCloseStatusService.Create(model);
            return data;
        }

        [HttpGet]
        public JsonResult GetAll()
        {
            var data = _taskCloseStatusService.GetAll();
            if (data == null || data.Data == null || data.HasError)
            {
                return Json(data);
            }
            return Json(new
            {
                Data = data.Data.Select(x => new
                {
                    TaskAssignTaskTypeState = x.IsActive ? "Aktif" : "Aktif Değil",
                    x.ProductMidCategory,
                    x.TaskCloseStatusId,
                    x.TaskCloseStatusName
                }),
                data.HasError,
                data.Message
            });
        }

        [HttpGet]
        public ApiResult<TaskCloseStatusDTO> GetById(uint id)
        {
            var data = _taskCloseStatusService.Get(id);
            return data;
        }

        [HttpGet]
        public ApiResult<IEnumerable<TaskCloseStatusDTO>> GetByProductMitCatId(uint id)
        {
            var data = _taskCloseStatusService.GetByProductMitCatId(id);
            return data;
        }

        [HttpPut]
        public ApiResult<UpdateTaskCloseStatusResponseDTO> Update(uint id, UpdateTaskCloseStatusRequestDTO model)
        {
            var data = _taskCloseStatusService.Update(id, model);
            return data;
        }
    }
}