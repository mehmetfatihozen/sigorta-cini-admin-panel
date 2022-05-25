using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.TaskAssign.Group;
using SigortaCini.Framework.Data.DTO.Admin.TaskAssign.GroupUser;
using SigortaCini.UI.AdminPanel.Models.ViewModel;
using SigortaCini.UI.AdminPanel.Services.Pool;
using SigortaCini.UI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Controllers.Pool
{
    public class PoolController : BaseController
    {
        IPoolService _poolService;
        IPoolUserService _poolUserService;
        IUserService _userService;

        public PoolController(IPoolService poolService, IPoolUserService poolUserService, IUserService userService)
        {
            _poolService = poolService;
            _poolUserService = poolUserService;
            _userService = userService;
        }

        public IActionResult Index()
        {
            return View();
        }
        public JsonResult Update(TaskAssignGroupRequestDTO input)
        {
            var result = _poolService.Update(input);
            return Json(result);
        }

        public JsonResult Delete(uint id)
        {
            _poolService.Delete(id);
            return Json("succedded");
        }
        public JsonResult Get(uint id)
        {
            var result = _poolService.Get(id);
            return Json(result);
        }

        public JsonResult Create(TaskAssignGroupRequestDTO input)
        {
            var data = _poolService.Create(input);
            return Json(data);
        }

        public JsonResult GetAllUser()
        {
            return Json(_userService.GetAllUser());
        }

        [HttpGet]
        public ApiResult<IEnumerable<object>> GetAll()
        {
            var data = _poolService.GetAll();

            if (data == null)
                return null;

            var ndata = data.Data.Select(x => new
            {
                x.TaskAssignGroupId,
                x.TaskAssignGroupName,
                x.TaskAssignGroupDesc,
                State = x.State == true ? "Aktif" : "Pasif",
                x.ParentTaskAssignGroup,
                x.ParentaskAssignGroupId,
                x.Children
            }).ToList();

            return new ApiResult<IEnumerable<object>>
            {
                Data = ndata,
                HasError = ndata == null
            };
        }
        [HttpGet]
        public ApiResult<List<Select2TreeFormat>> GetAllAsSelect2()
        {
            var data = _poolService.GetAll();

            if (data == null)
                return null;
            var result = new List<Select2TreeFormat>();
            foreach (var taskAssign in data.Data.Where(x => x.ParentaskAssignGroupId == 0))
            {
                result.Add(new Select2TreeFormat()
                {
                    Id = (int)taskAssign.TaskAssignGroupId,
                    Text = taskAssign.TaskAssignGroupName,
                    Children = CreateChildren(taskAssign.TaskAssignGroupId, data.Data)
                });
            }
            return new ApiResult<List<Select2TreeFormat>>()
            {
                Data = result,
                HasError = false
            };

        }

        private List<Select2TreeFormat> CreateChildren(uint taskAssignGroupId, IEnumerable<TaskAssignGroupDTO> data)
        {
            var childPools = data.Where(x => x.ParentaskAssignGroupId == taskAssignGroupId);
            if (childPools == null || childPools.Count() == 0)
            {
                return new List<Select2TreeFormat>();
            }
            var response = new List<Select2TreeFormat>();
            foreach (var taskAssign in childPools)
            {
                response.Add(new Select2TreeFormat()
                {
                    Id = (int)taskAssign.TaskAssignGroupId,
                    Text = taskAssign.TaskAssignGroupName,
                    Children = CreateChildren(taskAssign.TaskAssignGroupId, data)
                });
            }
            return response;
        }

        [HttpGet]
        public ApiResult<IEnumerable<object>> GetAllAsTree()
        {
            var data = _poolService.GetAllAsTree();

            if (data == null)
                return null;

            var ndata = data.Data.Select(x => new
            {
                x.TaskAssignGroupId,
                x.TaskAssignGroupName,
                x.TaskAssignGroupDesc,
                State = x.State == true ? "Aktif" : "Pasif",
                x.ParentTaskAssignGroup,
                x.ParentaskAssignGroupId,
                x.Children
            }).ToList();

            return new ApiResult<IEnumerable<object>>
            {
                Data = ndata,
                HasError = ndata == null
            };
        }

        [HttpPost]
        public JsonResult AddUsersToPool(TaskAssignGroupUserCreateViewModel userGroupList)
        {
            var input = new List<TaskAssignGroupUserCreateRequestDTO>();
            foreach (var userGroup in userGroupList.UserIds)
            {
                input.Add(new TaskAssignGroupUserCreateRequestDTO()
                {
                    State = userGroupList.State,
                    TaskAssignGroup = userGroupList.TaskAssignGroup,
                    UserId = userGroup
                });
            }
            var response = _poolUserService.AddUsersToPool(input);
            return Json(response);
        }

        [HttpGet]
        public JsonResult GetAllByTaskAssignGroupId(uint id)
        {
            var result = _poolUserService.GetAllByTaskAssignGroupId(id);
            return Json(result);
        }

        [HttpPost]
        public JsonResult AddPoolsToUser(TaskAssignUserGroupCreateViewModel userGroupList)
        {

            var input = new List<TaskAssignGroupUserCreateRequestDTO>();
            foreach (var groupId in userGroupList.TaskAssignGroupIds)
            {
                input.Add(new TaskAssignGroupUserCreateRequestDTO()
                {
                    TaskAssignGroup = groupId,
                    UserId = userGroupList.UserId
                });
            }
            var result = _poolUserService.AddPoolsToUser(input);
            return Json(result);
        }

        [HttpGet]
        public JsonResult GetAllByUserId(uint userId)
        {
            var result = _poolUserService.GetAllByUserId(userId);
            return Json(result);
        }

        [HttpGet]
        public JsonResult GetByTenant(uint id)
        {
            var data = _poolService.GetByTenant(id);
            return Json(data);
        }
    }
}
