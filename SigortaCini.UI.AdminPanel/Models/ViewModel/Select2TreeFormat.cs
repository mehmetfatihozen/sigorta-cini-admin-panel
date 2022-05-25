using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Models.ViewModel
{
    public class Select2TreeFormat
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public List<Select2TreeFormat> Children { get; set; }
    }
}
