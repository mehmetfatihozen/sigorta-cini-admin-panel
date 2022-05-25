using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.CarList;
using SigortaCini.Framework.Extensions.Storage;
using SigortaCini.UI.AdminPanel.Services.CarList;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Controllers.CarList
{
    public class CarListController : BaseController
    {
        ICarListService _carListService;
        IStorageService _storageService;

        public CarListController(ICarListService carListService, IStorageService storageService)
        {
            _carListService = carListService;
            _storageService = storageService;
        }

        [HttpGet]
        public JsonResult GetAll(uint? brandId, string typeCode)
        {
            var result = _carListService.GetAll(brandId, typeCode);
            return Json(result);//
        }

        [HttpPost]
        public JsonResult ImportCarsFromExcel(IFormFile file)
        {
            // Eğer dosya yok iste hata fırlat.
            if (file == null)
            {
                return Json(new ApiResult<object>
                {
                    HasError = true,
                    Message = "Lütfen Bir Dosya Seçiniz"
                });
            }

            // Dosyayı clouda yükle
            var uploadedPath = _storageService.General.UploadFromStreamAsync(file.OpenReadStream(), file.FileName).Result;

            // Dosya urli birleştir.
            string baseUrl = $"{StaticValues.STORAGE_GENERAL_BASE_URL}{StaticValues.STORAGE_GENERAL_CONTAINER}/{uploadedPath}";

            // Exceli içeri aktar.
            var response = _carListService.ImportCarsFromExcel(new CarListImportDTO
            {
                FullPathOfExcel = baseUrl
            });

            // Response dön.
            return Json(response);
        }

        [HttpPost]
        public JsonResult Search(CarListSearchRequestDTO model)
        {
            var result = _carListService.Search(model);
            return Json(result);
        }

        [HttpPut]
        public JsonResult Put(CarListViewRequestDTO model)
        {
            var result = _carListService.Update(model);
            return Json(result);
        }
    }
}
