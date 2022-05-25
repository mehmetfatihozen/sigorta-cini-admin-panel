using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Banned;
using SigortaCini.UI.AdminPanel.Services.BannedEMailAddress;

namespace SigortaCini.UI.AdminPanel.Controllers.BannedEMailAddress
{
    public class BannedEMailAddressController : BaseController
    {
        private readonly IBannedEMailAddressService _bannedEMailAddressService;

        public BannedEMailAddressController(IBannedEMailAddressService bannedEMailAddressService)
        {
            _bannedEMailAddressService = bannedEMailAddressService;
        }

        public JsonResult GetAll()
        {
            return Json(_bannedEMailAddressService.GetAll());
        }

        public JsonResult GetById(uint id)
        {
            return Json(_bannedEMailAddressService.GetById(id));
        }

        public JsonResult Update(BannedEMailAddressDTO model)
        {
            return Json(_bannedEMailAddressService.Update(model));
        }

        public JsonResult Create(BannedEMailAddressDTO model)
        {
            return Json(_bannedEMailAddressService.Create(model));
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
