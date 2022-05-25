using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Models.ViewModel
{
    public class TaskAssignGroupUserCreateViewModel
    {
        public uint TaskAssignGroup { get; set; }
        public List<uint> UserIds { get; set; }
        public bool? State { get; set; }
    }
}
