using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Banned;
using SigortaCini.UI.AdminPanel.Services.BannedPhoneNumber;

namespace SigortaCini.UI.AdminPanel.Controllers.BannedPhoneNumber
{
    public class BannedPhoneNumberController : BaseController
    {
        private readonly IBannedPhoneNumberService _bannedPhoneNumberService;

        public BannedPhoneNumberController(IBannedPhoneNumberService bannedPhoneNumberService)
        {
            _bannedPhoneNumberService = bannedPhoneNumberService;
        }

        public JsonResult GetAll()
        {
            return Json(_bannedPhoneNumberService.GetAll());
        }

        public JsonResult GetById(uint id)
        {
            return Json(_bannedPhoneNumberService.GetById(id));
        }

        public JsonResult Update(BannedPhoneNumberDTO model)
        {
            return Json(_bannedPhoneNumberService.Update(model));
        }

        public JsonResult Create(BannedPhoneNumberDTO model)
        {
            return Json(_bannedPhoneNumberService.Create(model));
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
