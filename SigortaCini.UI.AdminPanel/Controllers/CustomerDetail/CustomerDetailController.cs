using Microsoft.AspNetCore.Mvc;
using SigortaCini.UI.AdminPanel.Services.Customer;

namespace SigortaCini.UI.AdminPanel.Controllers.CustomerDetail
{
    public class CustomerDetailController : Controller
    {
        readonly ICustomerService _customerService;

        public CustomerDetailController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetById(uint id)
        {
            return Json(_customerService.GetById(id));
        }

        public JsonResult GetAll()
        {
            return Json(_customerService.GetAll());
        }

        public JsonResult GetLeadById(uint id)
        {
            return Json(_customerService.GetLeadById(id));
        }

        public JsonResult GetAllLead()
        {
            return Json(_customerService.GetAllLead());
        }
    }
}