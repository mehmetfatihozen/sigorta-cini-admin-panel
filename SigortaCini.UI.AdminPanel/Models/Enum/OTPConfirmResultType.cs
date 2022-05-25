using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.Models.Enum
{
    public enum OTPConfirmResultType
    {
        Invalid = 0,
        Valid = 1,
        TooManyAttempt = 2
    }
}
