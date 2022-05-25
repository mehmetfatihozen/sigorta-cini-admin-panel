using SigortaCini.Framework.Data.DTO.Admin.Permission;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.Models.DTO
{
    public class CurrentUserDTO
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public bool IsAzureIdEnabled { get; set; }
        public DateTime ExpireAt { get; set; }
        public bool IsNeedOTPAuth { get; set; }
        public string Phone { get; set; }
        public int RoleId { get; set; } = 1;
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ImageUrl { get; set; }
        public string CurrentVersion { get; set; }
        public List<PermissionDTO> Permissions { get; set; }

        public CurrentUserDTO()
        {
        }

    }
}
