using SigortaCini.Framework.Data.DTO.Admin.Marketing;
using System;

namespace SigortaCini.UI.AdminPanel.Models.DTO
{
    public class MarketingReportFilterDTO : MarketingReportRequestDTO
    {
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
    }
}
