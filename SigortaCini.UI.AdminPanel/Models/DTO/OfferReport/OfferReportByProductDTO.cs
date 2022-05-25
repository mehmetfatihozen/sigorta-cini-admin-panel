using SigortaCini.Framework.Data.DTO.Admin.OfferReport;
using System;

namespace SigortaCini.UI.AdminPanel.Models.DTO
{
    public class OfferReportByProductDTO : OfferReportByProductFilterDTO
    {
        public DateTime CreatedDateFrom { get; set; }
        public DateTime CreatedDateTo { get; set; }
    }
}
