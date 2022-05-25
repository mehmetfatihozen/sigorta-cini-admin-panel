using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.Extensions
{
    public class CustomOptions
    {
        public string Version { get; set; }
    }

    public class ProductMidCategories
    {
        public List<IdNamePairDto> ProductMidCategory { get; set; }

    }

   public class IdNamePairDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<string> FieldsPath { get; set; }
    }
}
