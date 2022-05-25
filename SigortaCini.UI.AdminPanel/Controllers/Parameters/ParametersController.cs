using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Parameter;
using SigortaCini.Framework.Data.DTO.Admin.Parameter.Upload;
using SigortaCini.Framework.Extensions.Storage;
using SigortaCini.UI.AdminPanel.Services.Parameter;

namespace SigortaCini.UI.AdminPanel.Controllers.Parameters
{
    public class ParametersController : BaseController
    {

        IParameterService _parameterService;
        IStorageService _storageService;

        public ParametersController(IParameterService parameterService,IStorageService storageService)
        {
            _parameterService = parameterService;
            _storageService = storageService;
        }

        public IActionResult Index()
        {
            return View();
        }

        #region Commons

        public JsonResult GetParametersByTypeIds(uint typeId)
        {
            return Json(_parameterService.GetParametersByTypeIds(typeId));
        }
        public JsonResult GetAllTheParameters()
        {
            return Json(_parameterService.GetAllTheParameters());
        }
        public JsonResult InsertOrUpdateParameter(ParameterRequestDTO input)
        {
            return Json(_parameterService.InsertOrUpdateParameter(input));
        }
        public JsonResult GetParameterTypes()
        {
            return Json(_parameterService.GetParameterTypes());
        }

        #endregion

        #region Getters

        public JsonResult GetBankParameters()
        {
            return Json(_parameterService.GetBankParameters());
        }
        public JsonResult GetBuildingParameters()
        {
            return Json(_parameterService.GetBuildingParameters());
        }
        public JsonResult GetBuildingYearParameters()
        {
            return Json(_parameterService.GetBuildingYearParameters());
        }
        public JsonResult GetDepartmentParameters()
        {
            return Json(_parameterService.GetDepartmentParameters());
        }
        public JsonResult GetDepartmentParametersByBankId(int bankId)
        {
            return Json(_parameterService.GetDepartmentParametersByBankId(bankId));
        }
        public JsonResult GetInstitutionParameters()
        {
            return Json(_parameterService.GetInstitutionParameters());
        }
        public JsonResult GetInstitutionTypeParameters()
        {
            return Json(_parameterService.GetInstitutionTypeParameters());
        }
        public JsonResult GetInsurerParameters()
        {
            return Json(_parameterService.GetInsurerParameters());
        }
        public JsonResult GetTotalFloorParameters()
        {
            return Json(_parameterService.GetTotalFloorParameters());
        }
        public JsonResult GetUsingStyleParameters()
        {
            return Json(_parameterService.GetUsingStyleParameters());
        }

        #endregion

        #region Setters

        public JsonResult InsertUpdateBankParameter(BankParameterDTO input)
        {
            return Json(_parameterService.InsertUpdateBankParameter(input));
        }
        public JsonResult InsertUpdateBuildingParameter(BuildingParameterDTO input)
        {
            return Json(_parameterService.InsertUpdateBuildingParameter(input));
        }
        public JsonResult InsertUpdateBuildingYearParameter(BuildingYearParameterDTO input)
        {
            return Json(_parameterService.InsertUpdateBuildingYearParameter(input));
        }
        public JsonResult InsertUpdateDepartmentParameter(DepartmentParameterDTO input)
        {
            return Json(_parameterService.InsertUpdateDepartmentParameter(input));
        }
        public JsonResult InsertUpdateInstitutionParameter(InstitutionParameterDTO input)
        {
            return Json(_parameterService.InsertUpdateInstitutionParameter(input));
        }
        public JsonResult InsertUpdateInstitutionTypeParameter(InstitutionTypeParameterDTO input)
        {
            return Json(_parameterService.InsertUpdateInstitutionTypeParameter(input));
        }
        public JsonResult InsertUpdateInsurerParameter(InsurerParameterDTO input)
        {
            return Json(_parameterService.InsertUpdateInsurerParameter(input));
        }
        public JsonResult InsertUpdateTotalFloorParameter(TotalFloorParameterDTO input)
        {
            return Json(_parameterService.InsertUpdateTotalFloorParameter(input));
        }
        public JsonResult InsertUpdateUsingStyleParameter(UsingStyleParameterDTO input)
        {
            return Json(_parameterService.InsertUpdateUsingStyleParameter(input));
        }

        #endregion

        #region Imports

        [HttpPost]
        public JsonResult ExcelImportForBankParameters(IFormFile file)
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
            string baseUrl = $"https://scattachmentstore.blob.core.windows.net/{StaticValues.ENVIRONMENT}/{uploadedPath}";

            // Exceli içeri aktar.
            var response = _parameterService.ExcelImportForBankParameters(new BankParameterUploadDTO
            {
                FullPathOfExcel = baseUrl
            });

            // Response dön.
            return Json(response);
        }

        [HttpPost]
        public JsonResult ExcelImportForDepartmentParameters(IFormFile file)
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
            string baseUrl = $"https://scattachmentstore.blob.core.windows.net/{StaticValues.ENVIRONMENT}/{uploadedPath}";

            // Exceli içeri aktar.
            var response = _parameterService.ExcelImportForDepartmentParameters(new DepartmentParameterUploadDTO
            {
                FullPathOfExcel = baseUrl
            });

            // Response dön.
            return Json(response);
        }

        #endregion

    }
}