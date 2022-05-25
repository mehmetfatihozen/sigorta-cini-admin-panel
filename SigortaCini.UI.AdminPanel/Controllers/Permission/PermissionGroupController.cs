using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Permission;
using SigortaCini.UI.AdminPanel.Services.Permission;

namespace SigortaCini.UI.AdminPanel.Controllers.Permission
{
    public class PermissionGroupController : BaseController
    {

        IPermissionGroupService PermissionGroupService;

        public PermissionGroupController(IPermissionGroupService permissionGroupService)
        {
            PermissionGroupService = permissionGroupService;
        }


        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllPermissionGroups()
        {
            return Json(PermissionGroupService.GetAllPermissionGroups());
        }

        public JsonResult GetPermissionGroupById(uint id)
        {
            return Json(PermissionGroupService.GetPermissionGroupById(id));
        }

        public JsonResult InsertOrUpdatePermissionGroup(PermissionGroupDTO input)
        {
            return Json(PermissionGroupService.InsertOrUpdatePermissionGroup(input));
        }

        public JsonResult GetAllPermissionGroupsByTypeId(uint id)
        {
            return Json(PermissionGroupService.GetAllPermissionGroupsByTypeId(id));
        }

    }
}