using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.CarList;
using SigortaCini.UI.AdminPanel.Services.CarList;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Controllers.CarList
{
    public class CarYearParameterController:BaseController
    {
        ICarYearParameterService _carYearParameterService;

        public CarYearParameterController(ICarYearParameterService carYearParameterService)
        {
            _carYearParameterService = carYearParameterService;
        }

        [HttpPost]
        public JsonResult Create(CarYearParameterRequestDTO model)
        {
            try
            {
                var result = _carYearParameterService.Create(model);
                return Json(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
