using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.RoleMenu;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Services.Role
{

    public interface IRoleMenuService
    {
        ApiResult<IEnumerable<RoleMenuDTO>> GetRoleMenusById(uint roleId);
        ApiResult<IEnumerable<RoleMenuDTO>> GetRoleMenusByUserId(uint userId);
        ApiResult<UpdateRoleMenuResponseDTO> UpdateRoleMenu(UpdateRoleMenuRequestDTO input);
    }

    public class RoleMenuService : IRoleMenuService, IScopedService
    {
        readonly RestfulClient _restfulClient;
        public RoleMenuService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<IEnumerable<RoleMenuDTO>> GetRoleMenusById(uint roleId)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<RoleMenuDTO>>>("role/rolemenu/getRoleMenus?roleId=" + roleId.ToString(), null);
        }

        public ApiResult<IEnumerable<RoleMenuDTO>> GetRoleMenusByUserId(uint userId)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<RoleMenuDTO>>>("role/rolemenu/getrolemenusbyuserid?userId=" + userId.ToString(), null);
        }

        public ApiResult<UpdateRoleMenuResponseDTO> UpdateRoleMenu(UpdateRoleMenuRequestDTO input)
        {
            return _restfulClient.Put<ApiResult<UpdateRoleMenuResponseDTO>>("role/rolemenu/updaterolemenu", input);
        }
    }
}
