using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Tenant;
using SigortaCini.Framework.Extensions.Storage;
using SigortaCini.UI.AdminPanel.Services.Tenant;

namespace SigortaCini.UI.AdminPanel.Controllers.Tenant
{
    public class TenantController : BaseController
    {
        private ITenantService _tenantService;
        private readonly IStorageService _storageService;

        public TenantController(ITenantService tenantService, IStorageService storageService)
        {
            _tenantService = tenantService;
            _storageService = storageService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<ApiResult<TenantCreateResponseDTO>> Create(TenantCreateRequestDTO model)
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

                    model.LogoUrl = $"{StaticValues.STORAGE_GENERAL_BASE_URL}{StaticValues.STORAGE_GENERAL_CONTAINER}/{filePath}";

                }
            }

            var data = _tenantService.Create(model);
            return data;
        }

        [HttpPost]
        public ApiResult<TenantDTO> GetTenantProductLink(TenantDTO model)
        {
            var data = _tenantService.GetTenantProductLink(model);
            return data;
        }

        [HttpGet]
        public async Task<IActionResult> GetLogoByTenantId(uint tenantId)
        {

            var tenant = _tenantService.GetById(tenantId);
            var fileName = tenant.Data.LogoUrl.Replace($"{StaticValues.STORAGE_GENERAL_BASE_URL}{StaticValues.STORAGE_GENERAL_CONTAINER}/", "");
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

        [HttpPut]
        public async Task<ApiResult<TenantCreateResponseDTO>> Update(TenantCreateRequestDTO model)
        {
            Guid updatedGuid = Guid.Empty;
            if (!Guid.TryParse(model.Token, out updatedGuid))
            {
                return new ApiResult<TenantCreateResponseDTO>()
                {
                    Data = null,
                    HasError = true,
                    Message = "TenantToken bilgisi geçerli bir guid değildir."
                };
            }

            var file = Request.Form.Files.FirstOrDefault();
            if (file != null)
            {
                string extensions = Path.GetExtension(file.FileName);
                var fileName = file.FileName;
                extensions = extensions.Replace('.', ' ').ToLower().Trim();
                var name = Guid.NewGuid() + "-" + fileName;
                var filePath = await _storageService.General.UploadFromStreamAsync(file.OpenReadStream(), name);

                model.LogoUrl = $"{StaticValues.STORAGE_GENERAL_BASE_URL}{StaticValues.STORAGE_GENERAL_CONTAINER}/{filePath}";
            }
            else
            {
                model.LogoUrl = "";
            }
            var data = _tenantService.Update(model);
            return data;
        }


        [HttpPost]
        public ApiResult<TenantCompanyMidCatMultipleResponseDTO> CreateMany(TenantCompanyMidCatMultipleRequestDTO input)
        {
            var data = _tenantService.CreateMany(input);
            return data;
        }

        [HttpGet]
        public JsonResult GetAll()
        {
            var data = _tenantService.GetAll();

            if (data == null||data.Data==null)
            {
                return Json(data);
            }
            return Json(new
            {
                Data = data.Data.Select(x => new
                {
                    State = x.State.HasValue && x.State.Value ? "Aktif" : "Aktif Değil",
                    x.TenantName,
                    x.TenantDesc,
                    x.Email,
                    x.Phone,
                    x.Token,
                    x.TenantId,
                    x.TaskAssignGroupId,
                    x.TaskAssignGroup,
                    x.LeadAssignGroupId,
                    x.LeadAssignGroup,
                    x.ParentTenantId,
                    x.ParentTenant,
                    x.LogoUrl,
                    x.IsLogoDisable,
                    x.IsPhoneDisable,
                    x.TenantTypeId,
                    x.IsAllowedAllMail,
                    x.IsLetusCallYouDisabled,
                    x.IsCampaignCodeDisabled,
                    x.IsLead
                }),
                HasError = data == null,
            });
        }

        public JsonResult GetAllExceptForApiTenant()
        {
            var data = _tenantService.GetAll();

            if (data == null || data.Data == null)
            {
                return Json(data);
            }
            return Json(new
            {
                Data = data.Data.Where(x => !x.IsAPITenant).Select(x => new
                {
                    State = x.State.HasValue && x.State.Value ? "Aktif" : "Aktif Değil",
                    x.TenantName,
                    x.TenantDesc,
                    x.Email,
                    x.Phone,
                    x.Token,
                    x.TenantId,
                    x.TaskAssignGroupId,
                    x.TaskAssignGroup,
                    x.ParentTenantId,
                    x.ParentTenant,
                    x.LogoUrl,
                    x.IsLogoDisable,
                    x.IsPhoneDisable,
                    x.TenantTypeId,
                    x.IsAllowedAllMail,
                    x.IsLetusCallYouDisabled,
                    x.IsCampaignCodeDisabled,
                    x.IsLead
                }),
                HasError = data == null,
            });
        }

        [HttpGet]
        public JsonResult GetAllApiTenants()
        {
            var data = _tenantService.GetAll();

            if (data == null || data.Data == null)
            {
                return Json(data);
            }
            return Json(new
            {
                Data = data.Data.Where(x => x.IsAPITenant)?.Select(x => new
                {
                    State = x.State.HasValue && x.State.Value ? "Aktif" : "Aktif Değil",
                    x.TenantName,
                    x.TenantDesc,
                    x.Email,
                    x.Phone,
                    x.Token,
                    x.TenantId,
                    x.TaskAssignGroupId,
                    x.TaskAssignGroup,
                    x.ParentTenantId,
                    x.ParentTenant,
                    x.LogoUrl,
                    x.IsLogoDisable,
                    x.IsPhoneDisable,
                    x.TenantTypeId,
                    x.IsLead
                }),
                HasError = data == null,
            });
        }

        [HttpGet]
        public ApiResult<TenantDTO> GetById(uint id)
        {
            var data = _tenantService.GetById(id);
            return data;
        }
    }
}