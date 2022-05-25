using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Setting;
using SigortaCini.UI.AdminPanel.Services.Setting;

namespace SigortaCini.UI.AdminPanel.Controllers.Setting
{
    public class SettingController : BaseController
    {

        ISettingService _settingService;

        public IActionResult Index()
        {
            return View();
        }

        public SettingController(ISettingService settingService)
        {
            _settingService = settingService;
        }

        [HttpGet]
        public JsonResult GetSetting()
        {
            return Json(_settingService.GetSetting());
        }

        [HttpPut]
        public JsonResult UpdateSetting(SettingUpdateRequest input)
        {
            return Json(_settingService.UpdateSetting(input));
        }

    }
}