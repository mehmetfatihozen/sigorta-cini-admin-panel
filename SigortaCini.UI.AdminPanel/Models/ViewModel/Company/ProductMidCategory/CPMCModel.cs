using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Models.ViewModel.Company.ProductMidCategory
{
    public class CPMCModel
    {
        public uint CompanyId { get; set; }
        public List<CPMCVariantModel> CategoryIds { get; set; }
    }
}
