using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Logs;
using SigortaCini.Framework.NoSQL.DTO;
using SigortaCini.UI.AdminPanel.Services.Log;

namespace SigortaCini.UI.AdminPanel.Controllers
{
    public class LogController : BaseController
    {
        ILogService logService;

        public LogController(ILogService _logService)
        {
            this.logService = _logService;
        }

        public IActionResult Index()
        {
            return View();
        }


        public JsonResult SearchB2BLog(LogSearchRequestDTO input)
        {
            return Json(logService.SearchB2BLog(input));
        }

        public JsonResult SearchB2CLog(LogSearchRequestDTO input)
        {
            return Json(logService.SearchB2CLog(input));
        }

        public JsonResult SearchMQLog(LogSearchRequestDTO input)
        {
            return Json(logService.SearchMQLog(input));
        }

        public JsonResult B2BLogGetById(uint id)
        {
            return Json(logService.B2BLogGetById(id));
        }

        public JsonResult B2CLogGetById(string id)
        {
            return Json(logService.B2CLogGetById(id));
        }

        public JsonResult MQLogGetById(uint id)
        {
            return Json(logService.MQLogGetById(id));
        }

        public JsonResult GetLastB2BLog()
        {
            return Json(logService.GetLastB2BLog());
        }

        public JsonResult GetLastMQLog()
        {
            return Json(logService.GetLastMQLog());
        }

        public JsonResult GetLastB2CLog()
        {
            return Json(logService.GetLastB2CLog());
        }
    }
}