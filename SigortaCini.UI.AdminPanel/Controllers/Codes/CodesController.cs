using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SigortaCini.UI.AdminPanel.Controllers.Codes
{
    public class CodesController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}