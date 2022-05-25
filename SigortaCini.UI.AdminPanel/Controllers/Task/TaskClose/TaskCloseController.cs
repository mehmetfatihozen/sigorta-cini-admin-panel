using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SigortaCini.UI.AdminPanel.Controllers.Task.TaskClose
{
    public class TaskCloseController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}