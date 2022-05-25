using SigortaCini.Framework.Data.DTO.Admin.User;

namespace SigortaCini.UI.AdminPanel.Models.ViewModel.User
{
    public class AdminUserUpdateRequestModel : AdminUserUpdateRequestDTO
    {
        public uint UserId { get; set; }
        public string JobStartStr { get; set; }
        public string JobEndStr { get; set; }
    }
}
