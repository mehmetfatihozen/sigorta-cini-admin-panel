using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.CompanyProduct;
using SigortaCini.Framework.Data.DTO.Admin.Tenant;
using SigortaCini.UI.AdminPanel.Services.Tenant;

namespace SigortaCini.UI.AdminPanel.Controllers.Tenant
{
    public class TenantCompanyMidCategoryController : BaseController
    {
        ITenantCompanyMidCategoryService _tenantCompanyMidCategoryService;
        public TenantCompanyMidCategoryController(ITenantCompanyMidCategoryService tenantCompanyMidCategoryService)
        {
            _tenantCompanyMidCategoryService = tenantCompanyMidCategoryService;
        }

        [HttpPost]
        public ApiResult<TenantCompanyMidCategoryResponseDTO> Create(TenantCompanyMidCategoryRequestDTO model)
        {
            return _tenantCompanyMidCategoryService.Create(model);
        }

        [HttpPost]
        public ApiResult<IEnumerable<TenantCompanyProductMidCatDTO>> GetAllByTenantId(TenantCompanyProductMidCatRequestDTO model)
        {
            return _tenantCompanyMidCategoryService.GetAllByTenantId(model);
        }
    }
}