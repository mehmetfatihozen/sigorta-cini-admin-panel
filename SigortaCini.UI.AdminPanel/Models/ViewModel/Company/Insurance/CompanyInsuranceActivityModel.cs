using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Models.ViewModel.Company.Insurance
{
    public class CompanyInsuranceActivityModel
    {
        public uint CompanyId { get; set; }
        public List<uint> ProductIds { get; set; }
    }
}
