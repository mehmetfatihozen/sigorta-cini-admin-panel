using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Session
{
    public class SessionUserInfo
    {
        public string Token { get; set; }
        public int UserId { get; set; }
        public bool IsOTPDisabled { get; set; }
        public string Phone { get; set; }
        public bool IsAzureLogin { get; set; }
        public bool TooManyAttempts { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ImageUrl { get; set; }
        public string UserName { get; set; }
        public string CurrentVersion { get; set; }
        public bool IsLogged { get; set; }
    }
}
