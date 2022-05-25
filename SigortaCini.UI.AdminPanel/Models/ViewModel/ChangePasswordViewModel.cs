using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.Models.ViewModel
{
    public class ChangePasswordViewModel
    {
        public int UserId { get; set; }
        public string Code { get; set; }
        public string Password { get; set; }
        public string Ip { get; set; }
    }
}
