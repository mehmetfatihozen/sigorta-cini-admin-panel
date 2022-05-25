using SigortaCini.Framework.Data.DTO.Admin.PolicyReport;
using System;

namespace SigortaCini.UI.AdminPanel.Models.DTO
{
    public class PolicyReportFilterDTO : PolicyReportRequestDTO
    {
        public DateTime PolicyDateFrom { get; set; }
        public DateTime PolicyDateTo { get; set; }
    }
}
