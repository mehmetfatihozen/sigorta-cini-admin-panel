using Microsoft.AspNetCore.Mvc;
using SigortaCini.UI.AdminPanel.Services.Location;

namespace SigortaCini.UI.AdminPanel.Controllers.Location
{
    public class LocationController : BaseController
    {
        ILocationService _locationService;

        public LocationController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetDistrictByCityId(int id)
        {
            return Json(_locationService.GetDistrictByCityId(id));
        }

        public JsonResult GetCitiesByCountryId(int id)
        {
            return Json(_locationService.GetCitiesByCountryId(id));
        }

        public JsonResult GetAllCountries()
        {
            return Json(_locationService.GetAllCountries());
        }

        public JsonResult GetAllCities()
        {
            return Json(_locationService.GetAllCities());
        }
    }
}