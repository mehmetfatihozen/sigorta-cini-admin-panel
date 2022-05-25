using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Role;
using SigortaCini.Framework.Data.DTO.Admin.RoleMenu;
using SigortaCini.UI.AdminPanel.Services.Role;

namespace SigortaCini.UI.AdminPanel.Controllers.Role
{
    public class RoleController : BaseController
    {
        IRoleService _roleService;
        IRoleMenuService _roleMenuService;

        public RoleController(IRoleService roleService,IRoleMenuService roleMenuService)
        {
            _roleService = roleService;
            _roleMenuService = roleMenuService;
        }

        public IActionResult Index()
        {
            return View();
        }
        public JsonResult Create(RoleDTO input)
        {
            try
            {
                var result = _roleService.Create(new RoleCreateRequestDTO()
                {
                    RoleDesc = input.RoleDesc,
                    State = input.State,
                    RoleName = input.RoleName,
                });
                return Json(result);
            }
            catch (System.Exception ex)
            {

                throw ex;
            }

        }

        public JsonResult Update(RoleDTO input)
        {
            var result = _roleService.Update(input.RoleTypeId, new RoleUpdateRequestDTO()
            {
                RoleDesc = input.RoleDesc,
                State = input.State,
                RoleName = input.RoleName,
            });
            return Json(result);
        }

        public JsonResult Delete(uint id)
        {
            _roleService.Delete(id);
            { }
            return Json("succedded");
        }
        public JsonResult Get(uint id)
        {
            var result = _roleService.Get(id);
            return Json(result);
        }

        public JsonResult GetAll()
        {
            var allRoles = _roleService.GetAll();
            if (allRoles == null || allRoles.Data == null || allRoles.HasError)
            {
                return Json(allRoles);
            }
            return Json(new
            {
                Data = allRoles.Data.Select(entity => new
                {
                    RoleDesc = entity.RoleDesc,
                    CreateDate = entity.CreateDate,
                    State = entity.State,
                    StateDesc = (entity.State.HasValue && entity.State.Value) ? "Aktif" : "Aktif Değil",
                    RoleName = entity.RoleName,
                    RoleTypeId = entity.RoleTypeId,
                    UpdateDate = entity.UpdateDate
                }),
                allRoles.HasError,
                allRoles.Message
            });
        }

        public JsonResult GetRoleMenusById(uint roleId)
        {
            return Json(_roleMenuService.GetRoleMenusById(roleId));
        }

        public JsonResult GetRoleMenusByUserId(uint userId)
        {
            return Json(_roleMenuService.GetRoleMenusByUserId(userId));
        }

        public JsonResult UpdateRoleMenu(UpdateRoleMenuRequestDTO input)
        {
            return Json(_roleMenuService.UpdateRoleMenu(input));
        }

    }
}