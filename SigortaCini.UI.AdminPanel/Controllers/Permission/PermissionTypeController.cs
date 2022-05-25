using Microsoft.AspNetCore.Mvc;
using SigortaCini.UI.AdminPanel.Services.Permission;

namespace SigortaCini.UI.AdminPanel.Controllers.Permission
{
    public class PermissionTypeController : BaseController
    {

        IPermissionTypeService _permissionTypeService;

        public PermissionTypeController(IPermissionTypeService permissionTypeService)
        {
            _permissionTypeService = permissionTypeService;
        }


        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllPermissionTypes()
        {
            return Json(_permissionTypeService.GetAllPermissionTypes());
        }
    }
}
