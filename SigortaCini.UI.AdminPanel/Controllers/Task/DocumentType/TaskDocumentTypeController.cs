using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.TaskDocument.Type;
using SigortaCini.UI.AdminPanel.Services.Task.DocumentType;

namespace SigortaCini.UI.AdminPanel.Controllers.Task.DocumentType
{
    public class TaskDocumentTypeController : BaseController
    {
        ITaskDocumentTypeService _taskDocumentTypeService;

        public TaskDocumentTypeController(ITaskDocumentTypeService taskDocumentTypeService)
        {
            _taskDocumentTypeService = taskDocumentTypeService;
        }

        public IActionResult Index()
        {
            return View();
        }
        public JsonResult Create(TaskDocumentTypeDTO input)
        {
            try
            {
                var result = _taskDocumentTypeService.Create(new TaskDocumentTypeCreateRequestDTO()
                {
                    TaskDocumentTypeDesc = input.TaskDocumentTypeDesc,
                    TaskDocumentTypeImage = input.TaskDocumentTypeImage,
                    TaskDocumentTypeName = input.TaskDocumentTypeName
                });
                return Json(result);
            }
            catch (System.Exception ex)
            {

                throw ex;
            }

        }

        public JsonResult Update(TaskDocumentTypeDTO input)
        {
            var result = _taskDocumentTypeService.Update(input.TaskDocumentTypeId, new TaskDocumentTypeUpdateRequest()
            {
                TaskDocumentTypeDesc = input.TaskDocumentTypeDesc,
                TaskDocumentTypeImage = input.TaskDocumentTypeImage,
                TaskDocumentTypeName = input.TaskDocumentTypeName
            });
            return Json(result);
        }

        public JsonResult Delete(uint id)
        {
            _taskDocumentTypeService.Delete(id);
            return Json("succedded");
        }
        public JsonResult Get(uint id)
        {
            var result = _taskDocumentTypeService.Get(id);
            return Json(result);
        }

        public JsonResult GetAll()
        {
            var allTaskDocumentTypes = _taskDocumentTypeService.GetAll();
            if (allTaskDocumentTypes == null || allTaskDocumentTypes.Data == null || allTaskDocumentTypes.HasError)
            {
                return Json(allTaskDocumentTypes);
            }
            return Json(new
            {
                Data = allTaskDocumentTypes.Data.Select(x => new
                {
                    x.TaskDocumentTypeImage,
                    x.TaskDocumentTypeDesc,
                    x.TaskDocumentTypeId,
                    x.TaskDocumentTypeName
                }),
                allTaskDocumentTypes.HasError,
                allTaskDocumentTypes.Message
            });
        }
    }
}