using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Models.ViewModel
{
    public class TaskAssignUserGroupCreateViewModel
    {
        public uint UserId { get; set; }
        public List<uint> TaskAssignGroupIds { get; set; }
    }
}
