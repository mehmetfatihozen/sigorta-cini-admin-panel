using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.DataManagement;
using SigortaCini.UI.AdminPanel.Services.Customer;
using System.Linq;

namespace SigortaCini.UI.AdminPanel.Controllers.Profession
{
    public class ProfessionController : BaseController
    {
        ICustomerProfessionService _customerProfessionService;

        public ProfessionController(ICustomerProfessionService customerProfessionService)
        {
            _customerProfessionService = customerProfessionService;
        }

        public IActionResult Index()
        {
            return View();
        }
        public JsonResult Create(CustomerProfessionDTO input)
        {
            try
            {
                var result = _customerProfessionService.Create(input);
                return Json(result);
            }
            catch (System.Exception ex)
            {

                throw ex;
            }
          
        }

        public JsonResult Update(CustomerProfessionDTO input)
        {
            var result = _customerProfessionService.Update(input);
            return Json(result);
        }

        public JsonResult Delete(uint id)
        {
            _customerProfessionService.Delete(id);
            return Json("succedded");
        }
        public JsonResult Get(uint id)
        {
            var result = _customerProfessionService.Get(id);
            return Json(result);
        }

        public JsonResult GetAll(int productId)
        {
            var allProfession = _customerProfessionService.GetAll(productId);
            if (allProfession == null || allProfession.Data == null || allProfession.HasError)
            {
                return Json(allProfession);
            }
            return Json(new
            {
                Data = allProfession.Data.Select(x => new
                {
                    State = x.State.HasValue && x.State.Value ? "Aktif" : "Aktif Değil",
                    x.CustomerProfessionId,
                    x.CustomerProfessionName,
                    x.ProductName
                }),
                allProfession.HasError,
                allProfession.Message
            });
        }
    }
}