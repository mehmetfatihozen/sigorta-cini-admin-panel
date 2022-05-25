using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Vehicle.Type;
using SigortaCini.UI.AdminPanel.Services.Vehicle;

namespace SigortaCini.UI.AdminPanel.Controllers.Vehicle
{
    public class VehicleTypeController : BaseController
    {
        IVehicleTypeService _vehicleTypeService;

        public VehicleTypeController(IVehicleTypeService vehicleTypeService)
        {
            _vehicleTypeService = vehicleTypeService;
        }

        public IActionResult Index()
        {
            return View();
        }
        public JsonResult Create(VehicleTypeDTO input)
        {
            try
            {
                var result = _vehicleTypeService.Create(input);
                return Json(result);
            }
            catch (System.Exception ex)
            {

                throw ex;
            }

        }

        public JsonResult Update(VehicleTypeDTO input)
        {
            var result = _vehicleTypeService.Update(input);
            return Json(result);
        }

        public JsonResult Delete(uint id)
        {
            _vehicleTypeService.Delete(id);
            return Json("succedded");
        }
        public JsonResult Get(uint id)
        {
            var result = _vehicleTypeService.Get(id);
            return Json(result);
        }

        public JsonResult GetAll()
        {
            var allVehicleTypes = _vehicleTypeService.GetAll();
            if (allVehicleTypes == null || allVehicleTypes.Data == null || allVehicleTypes.HasError)
            {
                return Json(allVehicleTypes);
            }
            return Json(new
            {
                Data = allVehicleTypes.Data.Select(x => new
                {
                    State = x.VehicleTypeState.HasValue && x.VehicleTypeState.Value ? "Aktif" : "Aktif Değil",
                    x.VehicleTypeCode,
                    x.VehicleTypeDesc,
                    x.VehicleTypeId,
                    x.VehicleTypeName
                }),
                allVehicleTypes.HasError,
                allVehicleTypes.Message
            });
        }
    }
}