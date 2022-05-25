using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Tenant;
using SigortaCini.Framework.Extensions.Storage;
using SigortaCini.UI.AdminPanel.Services.Tenant;

namespace SigortaCini.UI.AdminPanel.Controllers.TenantBanner
{
    public class TenantBannerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        private readonly ITenantBannerService _tenantBannerService;
        private readonly ITenantBannerTypeService _tenantBannerTypeService;
        private readonly IStorageService _storageService;

        public TenantBannerController(ITenantBannerService tenantBannerService, ITenantBannerTypeService tenantBannerTypeService, IStorageService storageService)
        {
            _tenantBannerService = tenantBannerService;
            _tenantBannerTypeService = tenantBannerTypeService;
            _storageService = storageService;

        }

        [HttpPost]
        public async Task<ApiResult<TenantBannerDTO>> Create(CreateTenantBannerRequestDTO model)
        {

            var file = Request.Form.Files.FirstOrDefault();
            if (file != null)
            {
                string extensions = Path.GetExtension(file.FileName);
                if (!string.IsNullOrEmpty(extensions))
                {
                    var fileName = file.FileName;
                    extensions = extensions.Replace('.', ' ').ToLower().Trim();
                    var name = Guid.NewGuid() + "-" + fileName;
                    var filePath = await _storageService.General.UploadFromStreamAsync(file.OpenReadStream(), name);

                    model.TenantBannerUrl = $"{StaticValues.STORAGE_GENERAL_BASE_URL}{StaticValues.STORAGE_GENERAL_CONTAINER}/{filePath}";

                }
            }

            var data = _tenantBannerService.Create(model);
            return data;
        }

        [HttpGet]
        public async Task<IActionResult> GetBannerById(uint bannerid)
        {

            var tenantbanner = _tenantBannerService.GetById(bannerid);
            var fileName = tenantbanner.Data.TenantBannerUrl.Replace($"{StaticValues.STORAGE_GENERAL_BASE_URL}{StaticValues.STORAGE_GENERAL_CONTAINER}/", "");
            var file = await _storageService.General.DownloadToStreamAsync(fileName);
            var fileExtension = fileName.Split(".")[(fileName.Split(".").Length - 1)];
            switch (fileExtension)
            {
                case "jpg":
                case "jpeg":
                    return File(file, "image/jpeg");
                case "png":
                    return File(file, "image/png");
                case "gif":
                    return File(file, "image/gif");
                default:
                    return File(file, "image/jpeg");
            }

        }

        [HttpPost]
        public async Task<ApiResult<TenantBannerDTO>> Update(TenantBannerDTO model)
        {
            var file = Request.Form.Files.FirstOrDefault();
            if (file != null)
            {
                string extensions = Path.GetExtension(file.FileName);
                var fileName = file.FileName;
                extensions = extensions.Replace('.', ' ').ToLower().Trim();
                var name = Guid.NewGuid() + "-" + fileName;
                var filePath = await _storageService.General.UploadFromStreamAsync(file.OpenReadStream(), name);

                model.TenantBannerUrl = $"{StaticValues.STORAGE_GENERAL_BASE_URL}{StaticValues.STORAGE_GENERAL_CONTAINER}/{filePath}";
            }
            else
            {
                model.TenantBannerUrl = "";
            }
            var data = _tenantBannerService.Update(model.TenantBannerId,
                new CreateTenantBannerRequestDTO()
                {
                    IsActive = model.IsActive,
                    ProductMidCatId = model.ProductMidCatId,
                    TenantBannerDesc = model.TenantBannerDesc,
                    TenantBannerTypeId = model.TenantBannerTypeId,
                    TenantBannerUrl = model.TenantBannerUrl,
                    TenantId = model.TenantId
                });
            return data;

        }

        [HttpGet]
        public ApiResult<IEnumerable<TenantBannerDTO>> GetAll()
        {

            var data = _tenantBannerService.GetAll();
            return data;
        }


        [HttpGet]
        public ApiResult<TenantBannerDTO> Get(uint id)
        {

            var data = _tenantBannerService.GetById(id);
            return data;
        }

        [HttpGet]
        public ApiResult<IEnumerable<TenantBannerTypeDTO>> GetAllDescTypes()
        {

            var data = _tenantBannerTypeService.GetAll();
            return data;
        }
    }
}