using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Banned;
using SigortaCini.UI.AdminPanel.Services.BannedIpAddress;

namespace SigortaCini.UI.AdminPanel.Controllers.BannedIpAddress
{
    public class BannedIpAddressController : BaseController
    {
        private readonly IBannedIpAddressService _bannedIpAddressService;

        public BannedIpAddressController(IBannedIpAddressService bannedIpAddressService)
        {
            _bannedIpAddressService = bannedIpAddressService;
        }

        public JsonResult GetAll()
        {
            return Json(_bannedIpAddressService.GetAll());
        }

        public JsonResult GetById(uint id)
        {
            return Json(_bannedIpAddressService.GetById(id));
        }

        public JsonResult Update(BannedIpAddressDTO model)
        {
            return Json(_bannedIpAddressService.Update(model));
        }

        public JsonResult Create(BannedIpAddressDTO model)
        {
            return Json(_bannedIpAddressService.Create(model));
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
