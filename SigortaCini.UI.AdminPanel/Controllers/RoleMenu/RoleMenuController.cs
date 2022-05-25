using Microsoft.AspNetCore.Mvc;

namespace SigortaCini.UI.AdminPanel.Controllers.RoleMenu
{
    public class RoleMenuController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}