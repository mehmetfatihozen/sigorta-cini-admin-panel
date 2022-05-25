using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.CarList;
using SigortaCini.UI.AdminPanel.Services.CarList;

namespace SigortaCini.UI.AdminPanel.Controllers.CarList
{
    public class CarBrandParameterController : BaseController
    {
        ICarBrandParameterService _carBrandParameterService;
        public CarBrandParameterController(ICarBrandParameterService carBrandParameterService)
        {
            _carBrandParameterService = carBrandParameterService;
        }

        [HttpPost]
        public JsonResult Create(CarBrandParameterRequestDTO model)
        {
            try
            {
                var result = _carBrandParameterService.Create(model);
                return Json(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        public JsonResult GetAll()
        {
            var result = _carBrandParameterService.GetAll();
            return Json(result);
        }

        [HttpPut]
        public JsonResult Update(CarBrandParameterRequestDTO model)
        {
            var result = _carBrandParameterService.Update(model);
            return Json(result);
        }
    }
}