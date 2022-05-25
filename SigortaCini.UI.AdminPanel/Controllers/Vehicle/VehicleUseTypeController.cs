using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Vehicle.UseType;
using SigortaCini.UI.AdminPanel.Services.Vehicle;

namespace SigortaCini.UI.AdminPanel.Controllers.Vehicle
{
    public class VehicleUseTypeController : BaseController
    {
        IVehicleUseTypeService _vehicleUseTypeService;

        public VehicleUseTypeController(IVehicleUseTypeService vehicleUseTypeService)
        {
            _vehicleUseTypeService = vehicleUseTypeService;
        }

        public IActionResult Index()
        {
            return View();
        }
        public JsonResult Create(VehicleUseTypeDTO input)
        {
            try
            {
                var result = _vehicleUseTypeService.Create(new VehicleUseTypeCreateRequestDTO()
                {
                    VehicleUseTypeCode = input.VehicleUseTypeCode,
                    VehicleUseTypeName = input.VehicleUseTypeName,
                    VehicleUseTypeDesc = input.VehicleUseTypeDesc,
                    VehicleUseTypeState = input.VehicleUseTypeState
                });
                return Json(result);
            }
            catch (System.Exception ex)
            {

                throw ex;
            }

        }

        public JsonResult Update(VehicleUseTypeDTO input)
        {
            var result = _vehicleUseTypeService.Update(input.VehicleUseTypeId, new VehicleUseTypeUpdateRequestDTO()
            {
                VehicleUseTypeCode=input.VehicleUseTypeCode,
                VehicleUseTypeDesc = input.VehicleUseTypeDesc,
                VehicleUseTypeName = input.VehicleUseTypeName,
                VehicleUseTypeState = input.VehicleUseTypeState,
            });
            return Json(result);
        }

        public JsonResult Delete(uint id)
        {
            _vehicleUseTypeService.Delete(id);
            return Json("succedded");
        }
        public JsonResult Get(uint id)
        {
            var result = _vehicleUseTypeService.Get(id);
            return Json(result);
        }

        public JsonResult GetAll()
        {
            var allVehicleUseTypes = _vehicleUseTypeService.GetAll();
            if (allVehicleUseTypes == null || allVehicleUseTypes.Data == null || allVehicleUseTypes.HasError)
            {
                return Json(allVehicleUseTypes);
            }
            return Json(new
            {
                Data = allVehicleUseTypes.Data.Select(x => new
                {
                    State = x.VehicleUseTypeState.HasValue && x.VehicleUseTypeState.Value ? "Aktif" : "Aktif Değil",
                    x.VehicleUseTypeCode,
                    x.VehicleUseTypeDesc,
                    x.VehicleUseTypeId,
                    x.VehicleUseTypeName
                }),
                allVehicleUseTypes.HasError,
                allVehicleUseTypes.Message
            });
        }
    }
}