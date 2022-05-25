using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.CarList;
using SigortaCini.UI.AdminPanel.Services.CarList;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Controllers.CarList
{
    public class CarYearHistoryController : BaseController
    {
        ICarYearHistoryService _carYearHistoryService;

        public CarYearHistoryController(ICarYearHistoryService carYearHistoryService)
        {
            _carYearHistoryService = carYearHistoryService;
        }

        public JsonResult GetAll(CarYearHistoryRequestDTO model)
        {
            var result = _carYearHistoryService.GetAll(model);
            return new JsonResult(result);
        }
    }
}
