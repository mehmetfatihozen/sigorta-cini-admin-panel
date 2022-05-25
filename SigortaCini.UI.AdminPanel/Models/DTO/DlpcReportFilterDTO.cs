using SigortaCini.Framework.Data.DTO.Admin.DlpcReport;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Models.DTO
{
    public class DlpcReportFilterDTO : DlpcReportRequestDTO
    {
        public DateTime CreatedDateFrom { get; set; }
        public DateTime CreatedDateTo { get; set; }
        public DateTime UpdatedDateFrom { get; set; }
        public DateTime UpdatedDateTo { get; set; }
    }
}
