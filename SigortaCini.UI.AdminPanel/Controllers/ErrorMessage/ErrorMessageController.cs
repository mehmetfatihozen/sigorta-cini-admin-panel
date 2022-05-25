using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.ErrorMessage;
using SigortaCini.Framework.Data.Enums.Admin;
using SigortaCini.UI.AdminPanel.Extensions;
using SigortaCini.UI.AdminPanel.Services.ErrorMessage;
using System.Linq;

namespace SigortaCini.UI.AdminPanel.Controllers.ErrorMessage
{
    public class ErrorMessageController : BaseController
    {
        private readonly IErrorMessageService _errorMessageService;

        public ErrorMessageController(IErrorMessageService errorMessageService)
        {
            _errorMessageService = errorMessageService;
        }

        public JsonResult GetAll()
        {
            var result = _errorMessageService.GetAll();

            if (result.HasError)
            {
                return Json(result);
            }

            return Json(result.Data.Select(x => new
            {
                x.ErrorMessageId,
                x.Code,
                x.Name,
                x.Desc,
                Source = SigortaCiniEnumExtensions.GetEnumDescription(x.Source)
            }));
        }

        public JsonResult GetById(uint id)
        {
            return Json(_errorMessageService.GetById(id));
        }

        public JsonResult Create(ErrorMessageDTO model)
        {
            return Json(_errorMessageService.Create(model));
        }

        public JsonResult Update(ErrorMessageDTO model)
        {
            return Json(_errorMessageService.Update(model));
        }

        public JsonResult Delete(uint id)
        {
            return Json(_errorMessageService.Delete(id));
        }

        public JsonResult GetErrorMessageSourceEnums()
        {
            return Json(SigortaCiniEnumExtensions.GetValues<ErrorMessageSourceEnum>());
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
