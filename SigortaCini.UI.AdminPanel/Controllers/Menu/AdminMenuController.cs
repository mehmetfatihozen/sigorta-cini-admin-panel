using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Menu;
using SigortaCini.UI.AdminPanel.Services.Menu;
using System;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Controllers.Menu
{
    public class AdminMenuController : BaseController
    {
        IAdminMenuService _adminMenuService;
        private IMemoryCache _cache;

        public AdminMenuController(IAdminMenuService adminMenuService, IMemoryCache cache)
        {
            _adminMenuService = adminMenuService;
            _cache = cache;
        }

        [HttpPost]
        public JsonResult GetMenus(AdminMenuRequestDTO input)
        {
            ApiResult<IEnumerable<AdminMenuDTO>> cacheAdminMenu;
            if (!_cache.TryGetValue("adminmenus", out cacheAdminMenu))
            {
                var cacheEntryOptions = new MemoryCacheEntryOptions();

                // Save data in cache.
                var result = _adminMenuService.GetAll(input);
                _cache.Set("adminmenus", result, cacheEntryOptions);
                return Json(result);
            }
            //var result = _adminMenuService.GetAll(input);
            return Json(cacheAdminMenu);
        }
    }
}