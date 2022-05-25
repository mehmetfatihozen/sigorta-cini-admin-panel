using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.User;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Services.User
{
    public interface IUserParameterService
    {
        ApiResult<UserAreaDTO> GetAreaById(uint id);
        ApiResult<UserBranchDTO> GetBranchById(uint id);
        ApiResult<UserLocationDTO> GetLocationById(uint id);
        ApiResult<UserSellingChannelDTO> GetSellingChannelTypeById(uint id);
        ApiResult<UserSellingChannelDTO> CreateUserSellingChannelType(UserSellingChannelDTO input);
        ApiResult<UserBranchDTO> CreateUserBranch(UserBranchDTO input);
        ApiResult<UserLocationDTO> CreateUserLocation(UserLocationDTO input);
        ApiResult<UserAreaDTO> CreateUserArea(UserAreaDTO input);
        ApiResult<UserSellingChannelDTO> UpdateUserSellingChannelType(UserSellingChannelDTO input);
        ApiResult<UserBranchDTO> UpdateUserBranch(UserBranchDTO input);
        ApiResult<UserLocationDTO> UpdateUserLocation(UserLocationDTO input);
        ApiResult<UserAreaDTO> UpdateUserArea(UserAreaDTO input);
        ApiResult<IEnumerable<UserAreaDTO>> GetAllUserAreas();
        ApiResult<IEnumerable<UserBranchDTO>> GetAllUserBranches();
        ApiResult<IEnumerable<UserLocationDTO>> GetAllUserLocations();
        ApiResult<IEnumerable<UserSellingChannelDTO>> GetAllUserSellingChannelType();
    }
    public class UserParameterService: IUserParameterService,IScopedService
    {
        readonly RestfulClient _restfulClient;
        public UserParameterService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<UserAreaDTO> GetAreaById(uint id)
        {
            return _restfulClient.Get<ApiResult<UserAreaDTO>>("user/userparameter/getareabyid?id=" + id.ToString(), null);
        }

        public ApiResult<UserBranchDTO> GetBranchById(uint id)
        {
            return _restfulClient.Get<ApiResult<UserBranchDTO>>("user/userparameter/getbranchbyid?id=" + id.ToString(), null);
        }

        public ApiResult<UserLocationDTO> GetLocationById(uint id)
        {
            return _restfulClient.Get<ApiResult<UserLocationDTO>>("user/userparameter/getlocationbyid?id=" + id.ToString(), null);
        }

        public ApiResult<UserSellingChannelDTO> GetSellingChannelTypeById(uint id)
        {
            return _restfulClient.Get<ApiResult<UserSellingChannelDTO>>("user/userparameter/getsellingchanneltypebyid?id=" + id.ToString(), null);
        }

        public ApiResult<UserAreaDTO> CreateUserArea(UserAreaDTO input)
        {
            return _restfulClient.Post<ApiResult<UserAreaDTO>>("user/userparameter/createuserarea", input);
        }

        public ApiResult<UserSellingChannelDTO> CreateUserSellingChannelType(UserSellingChannelDTO input)
        {
            return _restfulClient.Post<ApiResult<UserSellingChannelDTO>>("user/userparameter/createusersellingchanneltype", input);
        }

        public ApiResult<UserBranchDTO> CreateUserBranch(UserBranchDTO input)
        {
            return _restfulClient.Post<ApiResult<UserBranchDTO>>("user/userparameter/createuserbranch", input);
        }

        public ApiResult<UserLocationDTO> CreateUserLocation(UserLocationDTO input)
        {
            return _restfulClient.Post<ApiResult<UserLocationDTO>>("user/userparameter/createuserlocation", input);
        }

        public ApiResult<UserAreaDTO> UpdateUserArea(UserAreaDTO input)
        {
            return _restfulClient.Post<ApiResult<UserAreaDTO>>("user/userparameter/updateuserarea", input);
        }

        public ApiResult<UserSellingChannelDTO> UpdateUserSellingChannelType(UserSellingChannelDTO input)
        {
            return _restfulClient.Post<ApiResult<UserSellingChannelDTO>>("user/userparameter/updateusersellingchanneltype", input);
        }

        public ApiResult<UserBranchDTO> UpdateUserBranch(UserBranchDTO input)
        {
            return _restfulClient.Post<ApiResult<UserBranchDTO>>("user/userparameter/updateuserbranch", input);
        }

        public ApiResult<UserLocationDTO> UpdateUserLocation(UserLocationDTO input)
        {
            return _restfulClient.Post<ApiResult<UserLocationDTO>>("user/userparameter/updateuserlocation", input);
        }

        public ApiResult<IEnumerable<UserAreaDTO>> GetAllUserAreas()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<UserAreaDTO>>>("user/userparameter/GetAllUserArea");
        }

        public ApiResult<IEnumerable<UserBranchDTO>> GetAllUserBranches()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<UserBranchDTO>>>("user/userparameter/GetAllUserBranch");
        }

        public ApiResult<IEnumerable<UserLocationDTO>> GetAllUserLocations()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<UserLocationDTO>>>("user/userparameter/GetAllUserLocation");
        }

        public ApiResult<IEnumerable<UserSellingChannelDTO>> GetAllUserSellingChannelType()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<UserSellingChannelDTO>>>("user/userparameter/GetAllUserSellingChannelType");
        }
    }
}
