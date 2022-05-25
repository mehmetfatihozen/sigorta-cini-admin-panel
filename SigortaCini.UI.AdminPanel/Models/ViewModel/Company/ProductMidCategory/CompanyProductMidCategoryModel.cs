using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Models.ViewModel.Company.ProductMidCategory
{
    public class CompanyProductMidCategoryModel
    {
        public uint CompanyId { get; set; }
        public List<uint> CategoryIds { get; set; }
    }
}
