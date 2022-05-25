using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Tenant;
using SigortaCini.UI.AdminPanel.Services.Tenant;

namespace SigortaCini.UI.AdminPanel.Controllers.TenantContentDescription
{
    public class TenantContentDescriptionController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        private readonly ITenantContentDescService _tenantContentDescService;
        private readonly ITenantContentDescTypeService _tenantContentDescTypeService;

        public TenantContentDescriptionController(ITenantContentDescService tenantContentDescService, ITenantContentDescTypeService tenantContentDescTypeService)
        {
            _tenantContentDescService = tenantContentDescService;
            _tenantContentDescTypeService = tenantContentDescTypeService;
        }

        [HttpPost]
        public ApiResult<TenantContentDescDTO> Create(CreateTenantContentDescRequestDTO model)
        {

            var data = _tenantContentDescService.Create(model);
            return data;
        }

        [HttpPost]
        public ApiResult<TenantContentDescDTO> Update(TenantContentDescDTO model)
        {

            var data = _tenantContentDescService.Update(
                model.TenantContentDescId,
                new CreateTenantContentDescRequestDTO()
                {
                    IsActive = model.IsActive,
                    TenantContentDescText = model.TenantContentDescText,
                    TenantContentDescTypeId = model.TenantContentDescTypeId,
                    TenantId = model.TenantId
                });
            return data;
        }

        [HttpGet]
        public ApiResult<IEnumerable<TenantContentDescDTO>> GetAll()
        {

            var data = _tenantContentDescService.GetAll();
            return data;
        }


        [HttpGet]
        public ApiResult<TenantContentDescDTO> Get(uint id)
        {

            var data = _tenantContentDescService.GetById(id);
            return data;
        }

        [HttpGet]
        public ApiResult<IEnumerable<TenantContentDescTypeDTO>> GetAllDescTypes()
        {

            var data = _tenantContentDescTypeService.GetAll();
            return data;
        }

    }
}