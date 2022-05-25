using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Search;
using SigortaCini.Framework.Data.DTO.Admin.User;
using SigortaCini.UI.AdminPanel.Models.ViewModel.User;
using SigortaCini.UI.AdminPanel.Services.User;

namespace SigortaCini.UI.AdminPanel.Controllers.User
{
    public class UserController : BaseController
    {
        IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Update()
        {
            return View();
        }
        public JsonResult CreateUser(AdminUserUpdateRequestModel input)
        {
            CultureInfo provider = CultureInfo.InvariantCulture;
            input.JobStartDate = DateTime.ParseExact(input.JobStartStr, "dd-MM-yyyy", provider);
            if (!string.IsNullOrEmpty(input.JobEndStr))
            {
                input.JobEndDate = DateTime.ParseExact(input.JobEndStr, "dd-MM-yyyy", provider);
            }

            var newUser = _userService.CreateUser(input);
            if (newUser == null || newUser.Data == null || newUser.HasError)
            {
                return Json(newUser);
            }
            return Json(new
            {
                newUser.Data.User.Person.PersonId,
                newUser.Data.User.UserName,
                newUser.Data.User.AzureidEnabled,
                newUser.Data.User.IsOtpDisabled,
                newUser.Data.User.Person.PersonFirstName,
                newUser.Data.User.Person.PersonLastName,
                newUser.Data.User.Person.PersonGsmNumber,
                newUser.Data.User.Person.State,
                newUser.Data.User.TaskAssignGroup,
                // newUser.Data.User.Person.PersonType.PersonTypeId,
                newUser.Data.User.RoleType.RoleTypeId,
                newUser.Data.User.UserType.UserTypeId,
                enddate = newUser.Data.User.Person.JobEndDate.HasValue ? newUser.Data.User.Person.JobEndDate.Value.ToString("dd-MM-yyyy") : "",
                startdate = newUser.Data.User.Person.JobStartDate.ToString("dd-MM-yyyy"),
                newUser.Data.User.PoolList,
                newUser.Data.User.LeadAssignGroupList,
                newUser.Data.User.RoleTypeList,
                newUser.Data.User.UserSysCampaignId,
                newUser.Data.User.IsPoolDisabled,
                newUser.Data.User.IsAdminPanelEnabled,
                newUser.Data.User.UserFinsoftCode,
                newUser.Data.User.LeadAssignGroupId,
                newUser.Data.User.LeadIsPoolDisabled,
                newUser.Data.User.UserCode,
                newUser.Data.User.TaskAssignGroup.TaskAssignGroupId,
                newUser.Data.User.UserBranchManager,
                newUser.Data.User.UserManagerBwos,
                newUser.Data.User.UserTeamLeadArea,
                newUser.Data.User.UserTeamLead
            });

        }

        public JsonResult UpdateUser(AdminUserUpdateRequestModel input)
        {
            CultureInfo provider = CultureInfo.InvariantCulture;
            input.JobStartDate = DateTime.ParseExact(input.JobStartStr, "dd-MM-yyyy", provider);
            if (!string.IsNullOrEmpty(input.JobEndStr))
            {
                input.JobEndDate = DateTime.ParseExact(input.JobEndStr, "dd-MM-yyyy", provider);
            }
            var user = new AdminUserUpdateRequestDTO()
            {
                AzureidEnabled = input.AzureidEnabled,
                IsOtpDisabled = input.IsOtpDisabled,
                IsAdminPanelEnabled = input.IsAdminPanelEnabled,
                PersonFirstName = input.PersonFirstName,
                PersonGsmNumber = input.PersonGsmNumber,
                PersonLastName = input.PersonLastName,
                PersonState = input.Status,
                Status = input.Status,
                // PersonTypeId = input.PersonTypeId,
                RoleTypeId = input.RoleTypeId,
                UserName = input.UserName,
                UserTypeId = input.UserTypeId,
                JobEndDate = input.JobEndDate,
                JobStartDate = input.JobStartDate,
                PoolList = input.PoolList,
                TenantId = input.TenantId,
                IsPoolDisabled = input.IsPoolDisabled,
                UserFinsoftCode = input.UserFinsoftCode,
                LeadAssignGroupIdList = input.LeadAssignGroupIdList,
                RoleTypeList = input.RoleTypeList,
                UserSysCampaignId = input.UserSysCampaignId,
                DefaultLeadAssignGroupId = input.DefaultLeadAssignGroupId,
                LeadIsPoolDisabled = input.LeadIsPoolDisabled,
                UserCode = input.UserCode,
                TaskAssignGroupId = input.TaskAssignGroupId,
                UserManagerBwos = input.UserManagerBwos,
                UserBranchManager = input.UserBranchManager,
                UserArea = input.UserArea,
                UserTeamLead = input.UserTeamLead,
                UserPassword = input.UserPassword
            };
            var updatedUser = _userService.UpdateUser(input.UserId, user);
            if (updatedUser == null || updatedUser.Data == null || updatedUser.HasError)
            {
                return Json(updatedUser);
            }

            return Json(new
            {
                updatedUser.Data.User.Person.PersonId,
                updatedUser.Data.User.UserName,
                updatedUser.Data.User.AzureidEnabled,
                updatedUser.Data.User.IsOtpDisabled,
                updatedUser.Data.User.IsAdminPanelEnabled,
                updatedUser.Data.User.Person.PersonFirstName,
                updatedUser.Data.User.Person.PersonLastName,
                updatedUser.Data.User.Person.PersonGsmNumber,
                updatedUser.Data.User.Person.State,
                //updatedUser.Data.User.Person.PersonType.PersonTypeId,
                updatedUser.Data.User.RoleType.RoleTypeId,
                updatedUser.Data.User.UserType.UserTypeId,
                enddate = updatedUser.Data.User.Person.JobEndDate.HasValue ? updatedUser.Data.User.Person.JobEndDate.Value.ToString("dd-MM-yyyy") : "",
                startdate = updatedUser.Data.User.Person.JobStartDate.ToString("dd-MM-yyyy"),
                updatedUser.Data.User.PoolList,
                updatedUser.Data.User.LeadAssignGroupList,
                updatedUser.Data.User.RoleTypeList,
                updatedUser.Data.User.UserSysCampaignId,
                updatedUser.Data.User.Pools,
                updatedUser.Data.User.IsPoolDisabled,
                updatedUser.Data.User.UserFinsoftCode,
                updatedUser.Data.User.LeadAssignGroupId,
                updatedUser.Data.User.LeadIsPoolDisabled,
                updatedUser.Data.User.UserCode,
                updatedUser.Data.User.TaskAssignGroup.TaskAssignGroupId,
                updatedUser.Data.User.UserBranchManager,
                updatedUser.Data.User.UserManagerBwos,
                updatedUser.Data.User.UserTeamLeadArea,
                updatedUser.Data.User.UserTeamLead
            });

        }

        //public JsonResult SearchUser(SearchRequestDTO input)
        //{
        //    var usersResult = _userService.SearchUser(input);
        //    if (usersResult == null || usersResult.Data == null || usersResult.HasError)
        //    {
        //        return Json(usersResult);
        //    }
        //    return Json(usersResult);

        //}

        //public JsonResult GetPersonTypes()
        //{
        //    var allPersonTypes = _userService.GetAllPersonTypes();
        //    if (allPersonTypes == null || allPersonTypes.Data == null || allPersonTypes.HasError)
        //    {
        //        return Json(allPersonTypes);
        //    }
        //    return Json(allPersonTypes);

        //}

        public JsonResult GetUser(uint id)
        {
            var userGet = _userService.GetUser(id);

            return Json(new
            {
                userGet.Data.UserId,
                userGet.Data.Person.PersonId,
                userGet.Data.UserName,
                userGet.Data.AzureidEnabled,
                userGet.Data.IsOtpDisabled,
                userGet.Data.IsAdminPanelEnabled,
                userGet.Data.Tenant.TenantName,
                userGet.Data.Tenant.TenantId,
                userGet.Data.Person.PersonFirstName,
                userGet.Data.Person.PersonLastName,
                userGet.Data.Person.PersonGsmNumber,
                userGet.Data.Person.State,
                //userGet.Data.Person.PersonType.PersonTypeId,
                userGet.Data.RoleType.RoleTypeId,
                userGet.Data.UserType.UserTypeId,
                enddate = userGet.Data.Person.JobEndDate.HasValue ? userGet.Data.Person.JobEndDate.Value.ToString("dd-MM-yyyy") : "",
                startdate = userGet.Data.Person.JobStartDate.ToString("dd-MM-yyyy"),
                userGet.Data.Pools,
                userGet.Data.PoolList,
                userGet.Data.LeadAssignGroupList,
                userGet.Data.RoleTypeList,
                userGet.Data.UserSysCampaignId,
                userGet.Data.LeadAssignGroups,
                userGet.Data.IsPoolDisabled,
                userGet.Data.UserCode,
                userGet.Data.UserFinsoftCode,
                userGet.Data.LeadAssignGroupId,
                userGet.Data.LeadIsPoolDisabled,
                userGet.Data.TaskAssignGroup.TaskAssignGroupId,
                userGet.Data.UserBranchManager,
                userGet.Data.UserManagerBwos,
                userGet.Data.UserTeamLeadArea,
                userGet.Data.UserTeamLead
            });
        }

        public JsonResult GetAllUser()
        {
            var allUsers = _userService.GetAll();
            if (allUsers == null || allUsers.Data == null || allUsers.HasError)
            {
                return Json(allUsers);
            }
            return Json(allUsers);

        }

        public JsonResult GetAllUserByUserTypeId(uint id)
        {
            var allUsers = _userService.GetAllUserByUserTypeId(id);
            if (allUsers == null || allUsers.Data == null || allUsers.HasError)
            {
                return Json(allUsers);
            }
            return Json(allUsers);

        }

        public JsonResult GetUserCode()
        {
            var userCode = _userService.GetUserCode();

            return Json(userCode);

        }

        public JsonResult GetUserTypes()
        {
            var allUserTypes = _userService.GetAllUserTypes();
            if (allUserTypes == null || allUserTypes.Data == null || allUserTypes.HasError)
            {
                return Json(allUserTypes);
            }
            return Json(allUserTypes);

        }

        public JsonResult GetRoleTypes()
        {
            var allRoleTypes = _userService.GetAllRoleTypes();
            if (allRoleTypes == null || allRoleTypes.Data == null || allRoleTypes.HasError)
            {
                return Json(allRoleTypes);
            }
            return Json(allRoleTypes);

        }

        public JsonResult GetRoleUsers(uint roleId)
        {
            return Json(_userService.GetRoleUsers(roleId));
        }

        public JsonResult SetUsersRole(AdminUserRoleRequest input)
        {
            return Json(_userService.SetUsersRole(input));
        }

        public JsonResult GetUsersRoleHistory(uint userId)
        {
            return Json(_userService.GetUsersRoleHistory(userId));
        }

        public JsonResult GetRolesWithUsers()
        {
            return Json(_userService.GetRolesWithUsers());
        }

    }
}