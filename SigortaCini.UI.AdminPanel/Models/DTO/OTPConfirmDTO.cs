using SigortaCini.UI.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.Models.DTO
{
    public class OTPConfirmDTO
    {
        public string Token { get; set; }
        public OTPConfirmResultType Result { get; set; }
    }
}
