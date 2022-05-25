using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Permission;
using SigortaCini.Framework.Data.DTO.Admin.User;
using SigortaCini.UI.AdminPanel.Services.Permission;

namespace SigortaCini.UI.AdminPanel.Controllers.Permission
{
    public class PermissionController : BaseController
    {

        IPermissionService _permissionService;

        public PermissionController(IPermissionService permissionService)
        {
            _permissionService = permissionService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetRoleUsers(uint roleId)
        {
            return Json(_permissionService.GetRoleUsers(roleId));
        }

        public JsonResult SetUsersRole(AdminUserRoleRequest input)
        {
            return Json(_permissionService.SetUsersRole(input));
        }

        public JsonResult CreatePermission(PermissionInsertRequestDTO input)
        {
            return Json(_permissionService.CreatePermission(input));
        }

        public JsonResult UpdatePermission(PermissionInsertRequestDTO input)
        {
            return Json(_permissionService.UpdatePermission(input));
        }

        public JsonResult GetUsersRoleHistory(uint userId)
        {
            return Json(_permissionService.GetUsersRoleHistory(userId));
        }

        public JsonResult GetRolesWithUsers()
        {
            return Json(_permissionService.GetRolesWithUsers());
        }

        public JsonResult GetRolesWithUsersForRole(uint roleId)
        {
            return Json(_permissionService.GetRolesWithUsersForRole(roleId));
        }

        public JsonResult GetAllPermissions()
        {
            return Json(_permissionService.GetAllPermissions());
        }

        public JsonResult GetPermissionsByRoleId(uint roleId)
        {
            return Json(_permissionService.GetPermissionsByRoleId(roleId));
        }

        public JsonResult GetAllRoles()
        {
            return Json(_permissionService.GetAllRoles());
        }

        public JsonResult GetAllPermissionByGroupRole(SearchPermissionByGroupRole input)
        {
            return Json(_permissionService.GetAllPermissionByGroupRole(input));
        }

        public JsonResult AddPermissionRole(AddPermissionsRoleRequestDTO input)
        {
            return Json(_permissionService.AddPermissionRole(input));
        }

    }
}